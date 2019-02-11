import filter = require('@skt-t1-byungi/array-filter')
import findIndex = require('@skt-t1-byungi/array-find-index')
import forEach = require('@skt-t1-byungi/array-for-each')

type Listener = (...params: any[]) => void
type OnceListener = Listener & {key: Listener}
interface ListenerMap { [name: string]: Array<Listener | OnceListener > }

class EventEmitter {
    private _listeners: ListenerMap = {}

    public on (name: string, listener: Listener) {
        assertListener(listener)

        if (!this.has(name)) this._listeners[name] = []
        this._listeners[name].push(listener)
    }

    public off (name: string, listener?: Listener) {
        if (listener) assertListener(listener)

        if (!this.has(name)) return

        if (!listener) {
            delete this._listeners[name]
            return
        }

        this._listeners[name] = filter(this._listeners[name], target => !equalListener(target, listener))

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
        if (!this.has(name)) return
        forEach(this._listeners[name].slice(), listener => listener(...params))
    }

    public has (name: string, listener?: Listener) {
        if (!hasOwn(this._listeners, name)) return false
        if (!listener) return true

        assertListener(listener)

        return findIndex(this._listeners[name], target => equalListener(target, listener)) > -1
    }
}

export = EventEmitter

function assertListener (listener: Listener) {
    const type = typeof listener
    if (type !== 'function') throw new TypeError(`Expected listener to be a function, but ${type}`)
}

function hasOwn (obj: object, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

function equalListener (target: Listener | OnceListener, listener: Listener) {
    return target === listener || (target as OnceListener).key === listener
}
