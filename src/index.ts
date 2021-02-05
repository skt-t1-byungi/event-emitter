type AnyFunc = (...args: any[]) => void
type OnceFunc = AnyFunc & { key: Function }
type EventName<Events> = keyof Events & string
type EventListener<Events, K> = K extends keyof Events ? Events[K] : AnyFunc
type InternalListener = AnyFunc | OnceFunc

export class EventEmitter<Events extends { [K in keyof Events]: AnyFunc } = Record<string, AnyFunc>> {
    private _map: Record<string | number, InternalListener[]> = {}

    on<K extends EventName<Events>>(name: K, listener: EventListener<Events, K>) {
        assertListener(listener)
        ;(hasOwn(this._map, name) ? this._map[name] : (this._map[name] = [] as InternalListener[])).push(listener)
        return () => this.off(name, listener)
    }

    off<K extends EventName<Events>>(name: K, listener?: EventListener<Events, K>): void {
        if (listener) assertListener(listener)

        if (!hasOwn(this._map, name)) return
        if (!listener) {
            delete this._map[name]
            return
        }

        const prev = this._map[name]
        const next = []
        for (let i = 0; i < prev.length; i++) {
            const f = prev[i]
            if (!equalListener(f, listener)) next.push(f)
        }

        if (next.length > 0) {
            this._map[name] = next
        } else {
            delete this._map[name]
        }
    }

    once<K extends EventName<Events>>(name: K, listener: EventListener<Events, K>) {
        assertListener(listener)

        const f: any = (...params: any[]) => {
            this.off(name, f)
            listener(...params)
        }
        f.key = listener

        return this.on(name, f)
    }

    emit<K extends EventName<Events>>(name: K, ...params: Parameters<EventListener<Events, K>>) {
        if (!hasOwn(this._map, name)) return
        const fns = this._map[name].slice()
        for (let i = 0; i < fns.length; i++) {
            fns[i](...params)
        }
    }

    has<K extends EventName<Events>>(name: K, listener?: EventListener<Events, K>) {
        if (!hasOwn(this._map, name)) return false
        if (!listener) return true

        assertListener(listener)

        const fns = this._map[name]
        for (let i = 0; i < fns.length; i++) {
            if (equalListener(fns[i], listener)) return true
        }
        return false
    }
}

export default EventEmitter

function assertListener(f: any): asserts f is Function {
    const type = typeof f
    if (type !== 'function') throw new TypeError(`Expected listener to be a function, but ${type}`)
}

function hasOwn(o: object, k: string | number) {
    return Object.prototype.hasOwnProperty.call(o, k)
}

function equalListener(fn: InternalListener, key: Function) {
    return fn === key || ((fn as OnceFunc).key && (fn as OnceFunc).key === key)
}
