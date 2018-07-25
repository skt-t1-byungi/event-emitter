import test from 'ava'
import EventEmitter from './EventEmitter'

test('add listener, emit', t => {
  const emitter = new EventEmitter()
  let capture;

  emitter.on('event', (...params) => {
    t.pass()
    capture = params
  })

  t.plan(3)
  emitter.emit('event')
  emitter.emit('event', 1, 2, 3)
  t.deepEqual(capture, [1, 2, 3])
})

test.cb('off listener', t => {
  const emitter = new EventEmitter()
  const failListener = t.fail.bind(t, 'Fails "off()"')

  emitter.on('event', failListener)
  emitter.off('event', failListener)
  emitter.emit('event')

  setTimeout(() => t.end(), 1)
})

test('once listener', t => {
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

test('if not listener, throws error', t => {
  const emitter = new EventEmitter()
  t.throws(() => emitter.on('test', true))
  t.throws(() => emitter.off('test', true))
  t.throws(() => emitter.once('test', true))
})