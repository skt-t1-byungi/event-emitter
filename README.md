# @byungi/event-emitter
> tiny event emitter

![bakabaka](./neko.png)

[![npm](https://flat.badgen.net/npm/v/@byungi/event-emitter)](https://www.npmjs.com/package/@byungi/event-emitter)


## Install
```sh
npm i @byungi/event-emitter
```
```js
import EventEmitter from '@byungi/event-emitter'
```

### UMD
```html
<script src="https://unpkg.com/@byungi/event-emitter"></script>
<script>
    const emitter = new EventEmitter.default();
</script>
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
emitter.has('event') // Returns whether the listener exists or not.
emitter.has('event', listener)
```

## License
MIT
