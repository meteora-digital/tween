# Tween

An easy to use tweening class.
Any number can be tweened from one value to another over a set period of time.
The class will handle the tweening, you do the rest!

## Installation

```bash
npm i @meteora-digital/tween
yarn add @meteora-digital/tween
```

## Usage

#### HTML
```html
<section class="banner">
  <div class="banner__image" style="background-image: url('path/to/your/image.jpg');"></div>
</section>
```

#### JavaScript
```javascript
import Tween from '@meteora-digital/tween';

const banner = document.querySelector('.banner');
const image = document.querySelector('.banner__image');
```

#### Create a controller!

```javascript
const Controller = new Tween({
  fps: 60,
});
```

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| fps | number | the frame rate for the tween | 60 |


#### Tweening - smoothly animate a number from one value to another.

```javascript
Controller.tween({ from: 0, to: 100 }, (value) => image.style.opacity = value / 100, 300);
```

The tween method will load the controller with a new task, it can currently only have one task at a time.
the tween() method takes 3 arguments:

| Type | Description | Defaults |
|------|-------------|----------|
| object | Two keys - "from" and "to" | from: 0, to: 100 |
| function | A function that returns the current value | (value) => console.log(value); |
| duration | A length of time in milliseconds | 300 |


###### Note this function uses rounding to stop the function from looping continuously without any visual changes, therefore is is best to use whole numbers for situations like the example above.


#### Stopping the tween

```javascript
Controller.stop();
```

If we ever need to stop the animation we can use the stop() method


#### Restarting the tween

```javascript
Controller.start();
```

If we have stopped the animation we can restart it using the start() method

#### Callbacks

###### The available callbacks are 'start', 'stop' and 'end'. 

| Event | Description |
|------|-------------|
| start | Triggered when the animation starts |
| stop | Triggered when the animation is stopped via the .stop() method |
| end | Triggered when the animation has come to it's end naturally |

```javascript
Controller.on('start', () => console.log('Animation has started!'));
```

If we have stopped the animation we can restart it using the start() method


###### License
[MIT](https://choosealicense.com/licenses/mit/)

