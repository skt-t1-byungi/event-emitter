# @byungi/event-emitter
tiny event emitter

## Install
```sh
npm i @byungi/event-emitter
// or
yarn add @byungi/event-emitter
```
```js
const EventEmitter = require('event-emitter')
```

## Example
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