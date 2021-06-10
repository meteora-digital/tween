"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*-------------------------------------------------------------------
A simple tweening function - pass in a from / to value and a function
-------------------------------------------------------------------*/
var Tween = /*#__PURE__*/function () {
  function Tween() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tween);

    this.enabled = false; // This will be the default function

    this["default"] = function (value) {
      return console.log(value);
    }; // User settings defaults


    this.settings = {
      fps: 60
    }; // Assign the user options to the settings

    for (var key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    } // Used to throttle the functions and lock at a certain FPS


    this.time = {
      previous: null,
      current: null,
      elapsed: null,
      interval: 1000 / this.settings.fps
    }; // This will hold the current task

    this.task = {};
  }

  _createClass(Tween, [{
    key: "tween",
    value: function tween() {
      var _tween = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        from: 0,
        to: 100
      };

      var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this["default"];
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
      // Load in the new task
      this.task = {
        tween: _tween,
        func: func,
        duration: duration
      }; // Call the start method to get the ball rolling

      this.start();
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this = this;

      // If it needs to tween and we have a valid tween function
      if (this.task.enabled && this.task.tween.from != this.task.tween.to && this.task.func && typeof this.task.func == 'function') {
        // Some FPS maths
        this.time.current = Date.now();
        this.time.elapsed = this.time.current - this.time.previous; // Change the value of the tween

        this.task.tween.from -= Math.round((this.task.tween.from - this.task.tween.to) / (this.task.duration / 100) * 100) / 100; // If the time is right

        if (this.time.elapsed >= this.time.interval) {
          // More FPS maths
          this.time.previous = this.time.current - this.time.elapsed % this.time.interval; // Check if the tween's value is what is needs to be

          if (Math.round(this.task.tween.from) == this.task.tween.to) this.task.tween.from = this.task.tween.to; // Call the function

          this.task.func(this.task.tween.from);
        } // Call the function again


        window.requestAnimationFrame(function () {
          return _this.animate();
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      // Disable the animation
      this.task.enabled = false;
    }
  }, {
    key: "start",
    value: function start() {
      // Enable the animation
      this.task.enabled = true; // Call the animate method to get the ball rolling

      this.animate();
    }
  }]);

  return Tween;
}();

exports["default"] = Tween;