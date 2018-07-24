type Listener = (...params: any[]) => void
type KeyListener = Listener
type ListenerInfo = [KeyListener, Listener]
interface OnOptions {key: KeyListener}
interface ListenerMap { [name: string]: ListenerInfo[] }

class EventEmitter {
  private _events: ListenerMap = {}

  public on (name: string, listener: Listener, { key }: OnOptions = { key: listener }) {
    if (!this._events[name]) this._events[name] = []
    this._events[name].push([key, listener])
  }

  public off (name: string, listener?: Listener) {
    if (!this._events[name]) return

    if (!listener) {
      delete this._events[name]
      return
    }

    this._events[name] = this._events[name].filter(([key]) => key !== listener)

    if (this._events[name].length === 0) this.off(name)
  }

  public once (name: string, listener: Listener) {
    const onceListener = (...params: any[]) => {
      this.off(name, listener)
      listener(...params)
    }
    this.on(name, onceListener, { key: listener })
  }

  public emit (name: string, ...params: any[]) {
    (this._events[name] || []).forEach(([,listener]) => listener(...params))
  }
}

export = EventEmitter
