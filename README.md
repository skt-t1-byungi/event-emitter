# @byungi/event-emitter
> Small (< 600Byte), type-safe event emitter that support old browsers

[![npm](https://flat.badgen.net/npm/v/@byungi/event-emitter)](https://www.npmjs.com/package/@byungi/event-emitter)
[![bundle size](https://flat.badgen.net/bundlephobia/minzip/@byungi/event-emitter)](https://bundlephobia.com/result?p=@byungi/event-emitter)
[![npm](https://flat.badgen.net/travis/skt-t1-byungi/event-emitter)](https://travis-ci.org/skt-t1-byungi/event-emitter)

## Install
```sh
npm i @byungi/event-emitter
```

### UMD
```html
<script src="https://unpkg.com/@byungi/event-emitter"></script>
<script>
    const emitter = new EventEmitter.default();
</script>
```

### Browser ESM
```html
<script type="module">
    import EventEmitter from 'https://unpkg.com/@byungi/event-emitter/dist/index.esm.js'
    const emitter = new EventEmitter();
</script>
```

## Example
```ts
interface Events {
    a(): void
    b(a: number, b: string): void
}
const emitter = new EventEmitter<Events>()

// ✔️ Compiled.
emitter.on('a', () => { /.../ })
emitter.on('b', (a, b) => { /.../ })
emitter.emit('a')
emitter.emit('b', 100, 'test')

// ❌ Compile error.
emitter.on('a', (a, b) => { /.../ })
emitter.on('b', (other:boolean) => { /.../ })
emitter.on('c', () => { /.../ })
emitter.emit('a', 100, 'test')
emitter.emit('b')
emitter.emit('c')
```

## Browser compatibility
IE6+

## API
### new EventEmitter()
Create an event emitter instance.

### emitter.on(name, listener)
Add an event listener. Returns function to off.

```js
const off = emitter.on('a', listener)
off() // == emitter.off('a', listener)
```

### ee.off(name[, listener])
Remove an event listener(s).

### ee.has(name[, listener])
Returns whether there is an event listener.

### ee.emit(name, ...params)
Emit event to listeners.

### ee.once(name, listener)
Add an event listener that runs once.

## License
MIT
