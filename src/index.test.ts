import test from 'ava'
import EventEmitter from '.'

test('on(), emit()', t => {
    const emitter = new EventEmitter()
    let capture

    emitter.on('event', (...params: any[]) => {
        t.pass()
        capture = params
    })

    t.plan(3)
    emitter.emit('event')
    emitter.emit('event', 1, 2, 3)
    t.deepEqual(capture, [1, 2, 3])
})

test.cb('off()', t => {
    const emitter = new EventEmitter()
    const failListener = t.fail.bind(t, 'Fails "off()"')

    emitter.on('event', failListener)
    emitter.off('event', failListener)
    emitter.emit('event')

    setTimeout(() => t.end(), 1)
})

test('once()', t => {
    const emitter = new EventEmitter()
    emitter.once('event', t.pass.bind(t))

    t.plan(1)
    emitter.emit('event')
    emitter.emit('event')
})

test('prevent "Object.prototype[method]" access.', t => {
    const emitter = new EventEmitter()
    t.notThrows(() => emitter.emit('toString'))
})

test('if invalid listener type, throws error', t => {
    const emitter = new EventEmitter()
    t.throws(() => emitter.on('test', true as any))
    t.throws(() => emitter.off('test', true as any))
    t.throws(() => emitter.once('test', true as any))
})

test('has()', t => {
    const emitter = new EventEmitter()
    const listener = () => undefined
    t.false(emitter.has('test'))
    emitter.on('test', listener)

    t.true(emitter.has('test'))
    t.false(emitter.has('test', () => undefined))
    t.true(emitter.has('test', listener))
})

test('Events type support.', t => {
    interface Events {
        aa (): void,
        bb (a: number, b: string): void
    }
    const emitter = new EventEmitter<Events>()
    emitter.on('aa', () => [])
    emitter.on('bb', (a, b) => [])
    emitter.emit('aa')
    emitter.emit('bb', 1, 's')
    t.pass()
})
