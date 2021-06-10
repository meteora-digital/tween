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

```html
<section class="banner">
  <div class="banner__image" style="background-image: url('path/to/your/image.jpg');"></div>
</section>
```

```javascript
import Tween from '@meteora-digital/tween';

const banner = document.querySelector('.banner');
const image = document.querySelector('.banner__image');
```

#### Create a controller!

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| fps | number | The frames per second for the animation | 60 |

```javascript
const Controller = new Tween({
  fps: 60,
});
```

#### Tweening

Use tweening to smoothly animate a number from one value to another.

the tween() method takes 3 arguments

| Type | Description | Defaults |
|------|-------------|----------|
| object | Two keys - "from" and "to" | from: 0, to: 100 |
| function | A function that returns the current value | (value) => console.log(value); |
| duration | A length of time in milliseconds | 300 |

The tween method will load the controller with a new task, it can only have one task at a time.

```javascript
Controller.tween({
  from: 0,
  to: 100,
}, (value) => {
  image.style.opacity = `${value / 100}px`;
}, 300);
```

### Stopping the tween

If we ever need to stop the animation we can use the stop() method

```javascript
Controller.stop();
```

### Restarting the tween

If we have stopped the animation we can restart it using the start() method

```javascript
Controller.start();
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

