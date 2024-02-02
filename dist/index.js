/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./scripts/index.js":
/*!**************************!*\
  !*** ./scripts/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TweenController)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : String(i); }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n/**\n * Ease in out function.\n * @param {Number} t - Current time.\n * @param {Number} b - Start value.\n * @param {Number} c - Change in value.\n * @param {Number} d - Duration.\n */\nfunction easeInOut(t, b, c, d) {\n  t /= d / 2;\n  if (t < 1) return c / 2 * t * t + b;\n  t--;\n  return -c / 2 * (t * (t - 2) - 1) + b;\n}\n\n/**\n * TweenController class for managing animations.\n */\nvar TweenController = /*#__PURE__*/function () {\n  /**\n   * Constructor for the TweenController class.\n   * @param {Object} options - User provided options.\n   */\n  function TweenController() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    _classCallCheck(this, TweenController);\n    this.enabled = false;\n    this[\"default\"] = function (value) {\n      return console.log(value);\n    };\n    this.events = {};\n\n    // Merge user options with default settings\n    this.settings = Object.assign({\n      fps: 60\n    }, options);\n\n    // Time related properties\n    this.time = {\n      previous: null,\n      current: null,\n      elapsed: null,\n      interval: 1000 / this.settings.fps\n    };\n\n    // Task related properties\n    this.task = {};\n  }\n\n  /**\n   * Method to start a new tween.\n   * @param {Object} tween - Object with 'from' and 'to' properties.\n   * @param {Function} func - Function to be called on each tween step.\n   * @param {Number} duration - Duration of the tween in milliseconds.\n   */\n  _createClass(TweenController, [{\n    key: \"tween\",\n    value: function tween() {\n      var _tween = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n        from: 0,\n        to: 100\n      };\n      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[\"default\"];\n      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;\n      this.task = {\n        tween: _tween,\n        func: func,\n        duration: duration\n      };\n      this.start();\n    }\n\n    /**\n     * Method to animate the tween.\n     */\n  }, {\n    key: \"animate\",\n    value: function animate() {\n      var _this = this;\n      if (this.task.enabled && this.task.tween.from !== this.task.tween.to && typeof this.task.func === 'function') {\n        this.time.elapsed = Date.now() - this.time.start; // Calculate the time since the start of the animation\n\n        // Calculate the current tween value using the easing function\n        var currentValue = easeInOut(this.time.elapsed, this.task.tween.from, this.task.tween.to - this.task.tween.from, this.task.duration);\n\n        // Check if the tween is complete\n        if (this.time.elapsed >= this.task.duration) {\n          currentValue = this.task.tween.to;\n          this.task.enabled = false;\n        }\n\n        // Call the user-provided function with the current tween value\n        this.task.func(currentValue);\n\n        // Request the next animation frame\n        if (this.task.enabled) {\n          window.requestAnimationFrame(function () {\n            return _this.animate();\n          });\n        }\n      } else if (this.task.tween.from === this.task.tween.to) {\n        this.end();\n      }\n    }\n\n    /**\n     * Method to start the animation.\n     */\n  }, {\n    key: \"start\",\n    value: function start() {\n      if (!this.task.enabled) {\n        this.task.enabled = true;\n        this.time.start = Date.now(); // Track the start time of the animation\n        this.animate();\n        this.callback('start');\n      }\n    }\n\n    /**\n     * Method to stop the animation.\n     */\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (this.task.enabled) {\n        this.task.enabled = false;\n        this.callback('stop');\n      }\n    }\n\n    /**\n     * Method to end the animation.\n     */\n  }, {\n    key: \"end\",\n    value: function end() {\n      if (this.task.enabled) {\n        this.task.enabled = false;\n        this.callback('end');\n      }\n    }\n\n    /**\n     * Method to call a callback function.\n     * @param {String} type - The type of event.\n     */\n  }, {\n    key: \"callback\",\n    value: function callback(type) {\n      if (this.events[type]) this.events[type].forEach(function (event) {\n        return event();\n      });\n    }\n\n    /**\n     * Method to add an event listener.\n     * @param {String} event - The event to listen for.\n     * @param {Function} func - The function to call when the event is triggered.\n     */\n  }, {\n    key: \"on\",\n    value: function on(event, func) {\n      if (event && event !== 'on' && event !== 'callback' && this[event] && func && typeof func === 'function') {\n        if (!this.events[event]) this.events[event] = [];\n        this.events[event].push(func);\n      }\n    }\n  }]);\n  return TweenController;\n}();\n\n\n//# sourceURL=webpack://@meteora-digital/tween/./scripts/index.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__["./scripts/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ var __webpack_exports__default = __webpack_exports__["default"];
/******/ export { __webpack_exports__default as default };
/******/ 
