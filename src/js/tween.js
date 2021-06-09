/*-------------------------------------------------------------------
A simple tweening function - pass in a from / to value and a function
-------------------------------------------------------------------*/

export default class Tween {
  constructor(options = {}) {
    this.enabled = false;

    // This will be the default function
    this.default = (value) => console.log(value);

    // User settings defaults
    this.settings = {
      fps: 60,
    }

    // Assign the user options to the settings
    for (let key in this.settings) {
      if (this.settings.hasOwnProperty(key) && options.hasOwnProperty(key)) this.settings[key] = options[key];
    }

    // Used to throttle the functions and lock at a certain FPS
    this.time = {
      previous: null,
      current: null,
      elapsed: null,
      interval: 1000 / this.settings.fps,
    }
  }

  animate(tween = {from: 0, to: 100}, func = this.default, duration = 300) {
    // If it needs to tween and we have a valid tween function
    if (tween.from != tween.to && func && typeof func == 'function') {
      // Some FPS maths
      this.time.current = Date.now();
      this.time.elapsed = this.time.current - this.time.previous;
      // If the time is right
      if (this.time.elapsed >= this.time.interval * duration / 1000) {
        // More FPS maths
        this.time.previous = this.time.current - (this.time.elapsed % this.time.interval);
        // Change the value of the tween
        tween.from -= Math.round(((tween.from - tween.to) / (this.time.interval * duration / 1000)) * 100) / 100;
        // Check if the tween's value is what is needs to be
        if (Math.round(tween.from) == tween.to) tween.from = tween.to;
        // Call the function
        func(tween.from);
      }

      // Call the function again
      window.requestAnimationFrame(() => this.animate(tween, func, duration));
    }
  }
}