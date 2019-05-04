import filter from '@skt-t1-byungi/array-filter'
import findIndex from '@skt-t1-byungi/array-find-index'
import forEach from '@skt-t1-byungi/array-for-each'

type Listener = (...params: any[]) => void
type OnceListener = Listener & {key: Listener}
interface ListenerMap { [name: string]: Array<Listener | OnceListener > }
type EventName<T> = (keyof T) & string

export class EventEmitter<T extends { [name in keyof T]: Listener} = any> {
    private _listeners: ListenerMap = {}

    public on<K extends EventName<T>> (name: K, listener: T[K]) {
        assertListener(listener)

        if (!this.has(name)) this._listeners[name] = []
        this._listeners[name].push(listener)
    }

    public off<K extends EventName<T>> (name: K, listener?: T[K]) {
        if (listener) assertListener(listener)

        if (!this.has(name)) return

        if (!listener) {
            delete this._listeners[name]
            return
        }

        this._listeners[name] = filter(this._listeners[name], target => !equalListener(target, listener))

        if (this._listeners[name].length === 0) delete this._listeners[name]
    }

    public once<K extends EventName<T>> (name: K, listener: T[K]) {
        assertListener(listener)

        const onceListener = ((...params: any[]) => {
            this.off(name, listener)
            listener(...params)
        }) as any

        onceListener.key = listener

        this.on(name, onceListener)
    }

    public emit<K extends EventName<T>> (name: K, ...params: Parameters<T[K]>) {
        if (!this.has(name)) return
        forEach(this._listeners[name].slice(), listener => listener(...params))
    }

    public has<K extends EventName<T>> (name: K, listener?: T[K]) {
        if (!hasOwn(this._listeners, name)) return false
        if (!listener) return true

        assertListener(listener)

        return findIndex(this._listeners[name], target => equalListener(target, listener)) > -1
    }
}

export default EventEmitter

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
