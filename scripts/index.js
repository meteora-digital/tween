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
export default class TweenController {
  /**
   * Constructor for the TweenController class.
   * @param {Object} options - User provided options.
   */
  constructor(options = {}) {
    this.enabled = false;
    this.default = (value) => console.log(value);
    this.events = {};

    // Merge user options with default settings
    this.settings = Object.assign({
      fps: 60,
    }, options);

    // Time related properties
    this.time = {
      previous: null,
      current: null,
      elapsed: null,
      interval: 1000 / this.settings.fps,
    }

    // Task related properties
    this.task = {};
  }

  /**
   * Method to start a new tween.
   * @param {Object} tween - Object with 'from' and 'to' properties.
   * @param {Function} func - Function to be called on each tween step.
   * @param {Number} duration - Duration of the tween in milliseconds.
   */
  tween(tween = { from: 0, to: 100 }, func = this.default, duration = 300) {
    this.task = {
      tween: tween,
      func: func,
      duration: duration,
    }
    this.start();
  }

  /**
   * Method to animate the tween.
   */
  animate() {
    if (this.task.enabled && this.task.tween.from !== this.task.tween.to && typeof this.task.func === 'function') {
      this.time.elapsed = Date.now() - this.time.start; // Calculate the time since the start of the animation

      // Calculate the current tween value using the easing function
      let currentValue = easeInOut(this.time.elapsed, this.task.tween.from, this.task.tween.to - this.task.tween.from, this.task.duration);

      // Check if the tween is complete
      if (this.time.elapsed >= this.task.duration) {
        currentValue = this.task.tween.to;
        this.task.enabled = false;
      }

      // Call the user-provided function with the current tween value
      this.task.func(currentValue);

      // Request the next animation frame
      if (this.task.enabled) {
        window.requestAnimationFrame(() => this.animate());
      }
    } else if (this.task.tween.from === this.task.tween.to) {
      this.end();
    }
  }

  /**
   * Method to start the animation.
   */
  start() {
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
  stop() {
    if (this.task.enabled) {
      this.task.enabled = false;
      this.callback('stop');
    }
  }

  /**
   * Method to end the animation.
   */
  end() {
    if (this.task.enabled) {
      this.task.enabled = false;
      this.callback('end');
    }
  }

  /**
   * Method to call a callback function.
   * @param {String} type - The type of event.
   */
  callback(type) {
    if (this.events[type]) this.events[type].forEach((event) => event());
  }

  /**
   * Method to add an event listener.
   * @param {String} event - The event to listen for.
   * @param {Function} func - The function to call when the event is triggered.
   */
  on(event, func) {
    if (event && event !== 'on' && event !== 'callback' && this[event] && func && typeof func === 'function') {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(func);
    }
  }
}
