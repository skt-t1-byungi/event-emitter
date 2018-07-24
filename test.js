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

test('once listener', t => {
    const emitter = new EventEmitter()
    emitter.once('event', t.pass.bind(t))

    t.plan(1)
    emitter.emit('event')
    emitter.emit('event')
})