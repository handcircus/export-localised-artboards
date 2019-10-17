var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/export-artboards.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/export-artboards.js":
/*!*********************************!*\
  !*** ./src/export-artboards.js ***!
  \*********************************/
/*! exports provided: default, ExportLocalisedArtboards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportLocalisedArtboards", function() { return ExportLocalisedArtboards; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
 // documentation: https://developer.sketchapp.com/reference/api/
// From https://github.com/turbobabr/Sketch-Plugins-Cookbook

function readFile(path) {
  return NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, null);
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  ExportLocalisedArtboards();
});
function ExportLocalisedArtboards() {
  // Load the doc with all localised items
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var page = document.selectedPage;
  var layers = document.selectedLayers.layers; // Get folder

  var documentPath = document.path.substring(0, document.path.lastIndexOf("/") + 1); // Load CSV with language data. This should be in the format:
  // First column contains keys to search for, first row containand language IDs
  // eg:
  //              |  en-US | de-DE
  // screenshot_1 | Hat    | German Hat
  // screenshot_2 | Dog    | German Dog

  var csvPath = documentPath + "LanguageData.csv";
  var csvContent = readFile(csvPath);

  if (csvContent == null) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert('Missing Localisation Data', 'Please place a CSV file named LanguageData.csv in the same folder as your sketch file');
    return;
  }

  console.log("Output Content : \n" + csvContent); // Split lines

  var csvLines = csvContent.split(/\r?\n/);
  var languageColumns = csvLines[0].split(','); // Create language data for each supported language

  var localisationData = [];

  for (var column = 1; column < languageColumns.length; column++) {
    var languageData = {
      language: languageColumns[column],
      keys: {}
    };
    languageData.keys = {};
    localisationData.push(languageData); //log("Added language "+languageData.language);    
  } // Process each row and add to each relevant language


  for (var row = 1; row < csvLines.length; row++) {
    var localisationEntryColumns = csvLines[row].split(',');
    var entryKey = localisationEntryColumns[0]; // First column is the "key"

    for (var column = 1; column < localisationEntryColumns.length; column++) {
      var localisationEntry = localisationEntryColumns[column];
      var languageData = localisationData[column - 1];

      if (languageData) {
        //log("\tAdded Key "+entryKey+" : '"+localisationEntry+"' to language "+languageData.language);
        languageData.keys[entryKey] = localisationEntry;
      }
    }
  }

  var outputLanguageString = ""; // For each language

  localisationData.forEach(function (languageData) {
    outputLanguageString += languageData.language + " "; // Process

    page.layers.forEach(function (testLayer) {
      //log("TestLayer found type "+testLayer.type+" name "+testLayer.name);
      if (testLayer.type == 'Artboard') {
        //textLayer.selected = true;         
        ExportArtboard(testLayer, languageData, documentPath);
      }
    });
  });
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert('Localised Artboard Export Complete', 'Languages processed: ' + outputLanguageString);
}

function ExportArtboard(artBoard, languageData, exportPath) {
  log("Exporting artboard " + artBoard.name + " for language " + languageData.language); // Substitude "language"

  var originalArtboardName = artBoard.name;
  artBoard.name = originalArtboardName.replace("[LANGUAGE]", languageData.language);
  var replacedOverrides = [];
  var replacedTextLayers = []; // Search for textfields to replace

  var artboardLayers = artBoard.layers;
  artboardLayers.forEach(function (artboardLayer) {
    var layerName = artboardLayer.name; //log("\tLayer on artboard found type "+artboardLayer.type+" name '"+artboardLayer.name+"'");

    if (languageData.keys.hasOwnProperty(layerName)) {
      var replacementValue = languageData.keys[layerName]; //log("\t\tFound replacement value "+replacementValue+" for layer "+layerName);

      if (artboardLayer.type == 'SymbolInstance') {
        var overrides = artboardLayer.overrides;
        overrides.forEach(function (override) {
          if (override.property == "stringValue") {
            //log ("\t\t\tFound layer override ");
            replacedOverrides.push({
              override: override,
              text: override.value
            });
            override.value = replacementValue;
          }
        });
      }

      if (artboardLayer.type == 'Text') {
        replacedTextLayers.push({
          text_layer: artboardLayer,
          text: artboardLayer.text
        });
        artboardLayer.text = replacementValue;
      }
    }
  });
  log("exportPath is " + exportPath);
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(artBoard, {
    formats: 'png',
    output: exportPath
  }); // Restore override values

  replacedOverrides.forEach(function (replacedOverrideData) {
    replacedOverrideData.override.value = replacedOverrideData.text;
  }); // Restore text values

  replacedTextLayers.forEach(function (replacedTextLayerData) {
    replacedTextLayerData.text_layer.text = replacedTextLayerData.text;
  });
  artBoard.name = originalArtboardName;
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__export-artboards.js.map