"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Ease in out function.
 * @param {Number} t - Current time.
 * @param {Number} b - Start value.
 * @param {Number} c - Change in value.
 * @param {Number} d - Duration.
 */
function easeInOut(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

/**
 * TweenController class for managing animations.
 */
var TweenController = /*#__PURE__*/function () {
  /**
   * Constructor for the TweenController class.
   * @param {Object} options - User provided options.
   */
  function TweenController() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, TweenController);
    this.enabled = false;
    this["default"] = function (value) {
      return console.log(value);
    };
    this.events = {};

    // Merge user options with default settings
    this.settings = Object.assign({
      fps: 60
    }, options);

    // Time related properties
    this.time = {
      previous: null,
      current: null,
      elapsed: null,
      interval: 1000 / this.settings.fps
    };

    // Task related properties
    this.task = {};
  }

  /**
   * Method to start a new tween.
   * @param {Object} tween - Object with 'from' and 'to' properties.
   * @param {Function} func - Function to be called on each tween step.
   * @param {Number} duration - Duration of the tween in milliseconds.
   */
  _createClass(TweenController, [{
    key: "tween",
    value: function tween() {
      var _tween = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        from: 0,
        to: 100
      };
      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this["default"];
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
      this.task = {
        tween: _tween,
        func: func,
        duration: duration
      };
      this.start();
    }

    /**
     * Method to animate the tween.
     */
  }, {
    key: "animate",
    value: function animate() {
      var _this = this;
      if (this.task.enabled && this.task.tween.from !== this.task.tween.to && typeof this.task.func === 'function') {
        this.time.elapsed = Date.now() - this.time.start; // Calculate the time since the start of the animation

        // Calculate the current tween value using the easing function
        var currentValue = easeInOut(this.time.elapsed, this.task.tween.from, this.task.tween.to - this.task.tween.from, this.task.duration);

        // Check if the tween is complete
        if (this.time.elapsed >= this.task.duration) {
          currentValue = this.task.tween.to;
          this.task.enabled = false;
        }

        // Call the user-provided function with the current tween value
        this.task.func(currentValue);

        // Request the next animation frame
        if (this.task.enabled) {
          window.requestAnimationFrame(function () {
            return _this.animate();
          });
        }
      } else if (this.task.tween.from === this.task.tween.to) {
        this.end();
      }
    }

    /**
     * Method to start the animation.
     */
  }, {
    key: "start",
    value: function start() {
      if (!this.task.enabled) {
        this.task.enabled = true;
        this.time.start = Date.now(); // Track the start time of the animation
        this.animate();
        this.callback('start');
      }
    }

    /**
     * Method to stop the animation.
     */
  }, {
    key: "stop",
    value: function stop() {
      if (this.task.enabled) {
        this.task.enabled = false;
        this.callback('stop');
      }
    }

    /**
     * Method to end the animation.
     */
  }, {
    key: "end",
    value: function end() {
      if (this.task.enabled) {
        this.task.enabled = false;
        this.callback('end');
      }
    }

    /**
     * Method to call a callback function.
     * @param {String} type - The type of event.
     */
  }, {
    key: "callback",
    value: function callback(type) {
      if (this.events[type]) this.events[type].forEach(function (event) {
        return event();
      });
    }

    /**
     * Method to add an event listener.
     * @param {String} event - The event to listen for.
     * @param {Function} func - The function to call when the event is triggered.
     */
  }, {
    key: "on",
    value: function on(event, func) {
      if (event && event !== 'on' && event !== 'callback' && this[event] && func && typeof func === 'function') {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(func);
      }
    }
  }]);
  return TweenController;
}();