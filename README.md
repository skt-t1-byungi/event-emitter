# @skt-t1-byungi/event-emitter
> tiny event emitter

![bakabaka](./neko.png)

## Install
```sh
npm i @skt-t1-byungi/event-emitter
// or
yarn add @skt-t1-byungi/event-emitter
```

### In Node
```js
const EventEmitter = require('@skt-t1-byungi/event-emitter')
```
### In Browser
```html
<script src="https://unpkg.com/@skt-t1-byungi/event-emitter"></script>
```

### Browsers support
IE6+ 👴🏻

## Usage
```js
const emitter = new EventEmitter()

emitter.on('add', (a, b)=>{
  console.log('add : ' a + b)
})

emitter.emit('add', 1, 2)
// => add : 3

emitter.once('event', listener) // runs only once
emitter.off('event', listener) // remove a listener. if no listener, remove all listeners.
```

## License
MIT