import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

// From https://github.com/turbobabr/Sketch-Plugins-Cookbook
function readFile(path) {
  return NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, null);
}

export default function() {  
  ExportLocalisedArtboards();
}

export function ExportLocalisedArtboards() {
  // Load the doc with all localised items
  
  const document = sketch.getSelectedDocument();
  var page = document.selectedPage;
  var layers = document.selectedLayers.layers;

  // Get folder
  var documentPath=document.path.substring(0,document.path.lastIndexOf("/")+1);

  // Load CSV with language data. This should be in the format:
  // First column contains keys to search for, first row containand language IDs
  // eg:
  //              |  en-US | de-DE
  // screenshot_1 | Hat    | German Hat
  // screenshot_2 | Dog    | German Dog

  var csvPath=documentPath+"LanguageData.csv";
  var csvContent = readFile(csvPath);
  if (csvContent==null) {
    sketch.UI.alert('Missing Localisation Data', 'Please place a CSV file named LanguageData.csv in the same folder as your sketch file')   
    return;
  }
  console.log("Output Content : \n"+ csvContent);

  // Split lines
  var csvLines=csvContent.split(/\r?\n/);
  var languageColumns=csvLines[0].split(',');

  // Create language data for each supported language
  var localisationData=[];
  for (var column=1;column<languageColumns.length;column++) {
    var languageData= {language:languageColumns[column],keys:{}};
    languageData.keys={};
    localisationData.push(languageData);
    //log("Added language "+languageData.language);    
  }

  // Process each row and add to each relevant language
  for (var row=1;row<csvLines.length;row++) {
    var localisationEntryColumns=csvLines[row].split(',');    
    var entryKey=localisationEntryColumns[0]; // First column is the "key"
    for (var column=1;column<localisationEntryColumns.length;column++) {
      var localisationEntry=localisationEntryColumns[column];
      var languageData=localisationData[column-1];     
      if (languageData) {
        //log("\tAdded Key "+entryKey+" : '"+localisationEntry+"' to language "+languageData.language);
        languageData.keys[entryKey]=localisationEntry;
      }
      
    }
  }
     
  var outputLanguageString="";
  // For each language
  localisationData.forEach(languageData =>{
    outputLanguageString+=languageData.language+" ";
    // Process
    page.layers.forEach(testLayer => {
        //log("TestLayer found type "+testLayer.type+" name "+testLayer.name);
        if (testLayer.type ==  'Artboard') {
          //textLayer.selected = true;         
          ExportArtboard(testLayer,languageData,documentPath)
        }
    });
  });

  sketch.UI.alert('Localised Artboard Export Complete','Languages processed: '+outputLanguageString);
}

function ExportArtboard(artBoard,languageData,exportPath) {
  log("Exporting artboard "+artBoard.name+" for language "+languageData.language);

  // Substitude "language"
  let originalArtboardName=artBoard.name;
  artBoard.name=originalArtboardName.replace("[LANGUAGE]",languageData.language);

  var replacedOverrides=[];
  var replacedTextLayers=[];
  
  // Search for textfields to replace
  var artboardLayers=artBoard.layers;
  artboardLayers.forEach(artboardLayer => {
    let layerName=artboardLayer.name;
    //log("\tLayer on artboard found type "+artboardLayer.type+" name '"+artboardLayer.name+"'");
    if (languageData.keys.hasOwnProperty(layerName)) {
      let replacementValue=languageData.keys[layerName];
      //log("\t\tFound replacement value "+replacementValue+" for layer "+layerName);
      if (artboardLayer.type=='SymbolInstance') {
        var overrides=artboardLayer.overrides;
        overrides.forEach(override => {
          if (override.property=="stringValue") {
            //log ("\t\t\tFound layer override ");
            replacedOverrides.push({override:override,text:override.value});
            override.value=replacementValue;            
          }
        });
      }
      if (artboardLayer.type=='Text') {
        replacedTextLayers.push({text_layer:artboardLayer,text:artboardLayer.text});
        artboardLayer.text=replacementValue;
      }
    }
  });

  log("exportPath is "+exportPath);

  sketch.export(artBoard, {
    formats: 'png',
    output:exportPath
  })

  // Restore override values
  replacedOverrides.forEach(replacedOverrideData => {
    replacedOverrideData.override.value=replacedOverrideData.text;
  });
  
  // Restore text values
  replacedTextLayers.forEach(replacedTextLayerData => {
    replacedTextLayerData.text_layer.text=replacedTextLayerData.text;
  });

  artBoard.name=originalArtboardName;

}
