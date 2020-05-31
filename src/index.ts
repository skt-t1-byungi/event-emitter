type AnyFn = (...params: any[]) => void
type Once = AnyFn & {key: AnyFn}
type NameBy<O> = (keyof O & string) | string | number
type ListenerBy<O, K> = K extends keyof O ? O[K] : AnyFn

export class EventEmitter<O extends { [k in keyof O]: AnyFn} = any> {
    private _o: { [name: string]: Array<AnyFn|Once> } = {}

    on<K extends NameBy<O>> (name: K, listener: ListenerBy<O, K>) {
        assertListener(listener);
        (hasOwn(this._o, name) ? this._o[name] : this._o[name] = []).push(listener)
        return () => this.off(name, listener)
    }

    off<K extends NameBy<O>> (name: K, listener?: ListenerBy<O, K>): void {
        if (listener) assertListener(listener)
        if (!hasOwn(this._o, name)) return
        if (!listener) {
            return void delete this._o[name]
        }

        const prev = this._o[name]
        const next = []
        for (let i = 0; i < prev.length; i++) {
            const f = prev[i]
            if (!equalListener(f, listener)) next.push(f)
        }

        if (next.length > 0) {
            this._o[name] = next
        } else {
            delete this._o[name]
        }
    }

    once<K extends NameBy<O>> (name: K, listener: ListenerBy<O, K>) {
        assertListener(listener)
        const f: any = (...params: any[]) => {
            this.off(name, f)
            listener(...params)
        }
        f.key = listener
        return this.on(name, f)
    }

    emit<K extends NameBy<O>> (name: K, ...params: Parameters<ListenerBy<O, K>>) {
        if (!hasOwn(this._o, name)) return
        const fns = this._o[name].slice()
        for (let i = 0; i < fns.length; i++) {
            fns[i](...params)
        }
    }

    has<K extends NameBy<O>> (name: K, listener?: ListenerBy<O, K>) {
        if (!hasOwn(this._o, name)) return false
        if (!listener) return true

        assertListener(listener)

        const fns = this._o[name]
        for (let i = 0; i < fns.length; i++) {
            if (equalListener(fns[i], listener)) return true
        }
        return false
    }
}

export default EventEmitter

function assertListener (f: AnyFn) {
    const type = typeof f
    if (type !== 'function') throw new TypeError(`Expected listener to be a function, but ${type}`)
}

function hasOwn (o: object, k: string|number) {
    return Object.prototype.hasOwnProperty.call(o, k)
}

function equalListener (target: AnyFn | Once, f: AnyFn) {
    return target === f || (target as Once).key === f
}
