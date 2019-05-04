# @byungi/event-emitter
> A tiny event emitter that works old browser, and supports typescript.

[![npm](https://flat.badgen.net/npm/v/@byungi/event-emitter)](https://www.npmjs.com/package/@byungi/event-emitter)
[![bundle size](https://badgen.net/bundlephobia/minzip/@byungi/event-emitter)](https://bundlephobia.com/result?p=@byungi/event-emitter)

![bakabaka](./neko.png)

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
    aa(): void
    bb(a: number, b: string): void
}
const emitter = new EventEmitter<Events>()

// ✔️ Compiled.
emitter.on('aa', () => { /.../ })
emitter.on('bb', (a, b) => { /.../ })
emitter.emit('aa')
emitter.emit('bb', 100, 'test')

// ❌ Compile error.
emitter.on('aa', (a, b) => { /.../ })
emitter.on('bb', (other:boolean) => { /.../ })
emitter.on('ccc', () => { /.../ })
emitter.emit('aa', 100, 'test')
emitter.emit('bb')
emitter.emit('ccc')
```

## Browser compatibility
IE6+ 👴🏻

## API
### on(name, listener)
Add an event listener.

### has(name[, listener])
Returns whether there is an event listener.

### emit(name, ...params)
Emit events to listeners.

### off(name[, listener])
Remove the event listener(s).

### once(name, listener)
Add an event listener that runs once.

## License
MIT
