# @skt-t1-byungi/event-emitter
> tiny event emitter

## Install
```sh
npm i @skt-t1-byungi/event-emitter
// or
yarn add @skt-t1-byungi/event-emitter
```

### Node
```js
const EventEmitter = require('@skt-t1-byungi/event-emitter')
```
### Browser
```html
<script src="https://unpkg.com/@skt-t1-byungi/event-emitter"></script>
```

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