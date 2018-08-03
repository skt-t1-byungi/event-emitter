import filter = require('@skt-t1-byungi/array-filter')
import forEach = require('@skt-t1-byungi/array-for-each')

type Listener = (...params: any[]) => void
type OnceListener = Listener & {key: Listener}
interface ListenerMap { [name: string]: Array<Listener | OnceListener > }

class EventEmitter {
  private _listeners: ListenerMap = {}

  public on (name: string, listener: Listener) {
    assertListener(listener)
    if (!this._hasListeners(name)) this._listeners[name] = []
    this._listeners[name].push(listener)
  }

  public off (name: string, listener?: Listener) {
    if (listener) assertListener(listener)

    if (!this._hasListeners(name)) return

    if (!listener) {
      delete this._listeners[name]
      return
    }

    this._listeners[name] = filter(
      this._listeners[name],
      added => added !== listener && (added as OnceListener).key !== listener
    )

    if (this._listeners[name].length === 0) delete this._listeners[name]
  }

  public once (name: string, listener: Listener) {
    assertListener(listener)

    const onceListener = ((...params: any[]) => {
      this.off(name, listener)
      listener(...params)
    }) as OnceListener

    onceListener.key = listener

    this.on(name, onceListener)
  }

  public emit (name: string, ...params: any[]) {
    if (!this._hasListeners(name)) return
    forEach(this._listeners[name].slice(), listener => listener(...params))
  }

  private _hasListeners (name: string) {
    return Object.prototype.hasOwnProperty.call(this._listeners, name)
  }
}

export = EventEmitter

function assertListener (listener: Listener) {
  const type = typeof listener
  if (type !== 'function') throw new TypeError(`Expected listener to be a function, but ${type}`)
}
