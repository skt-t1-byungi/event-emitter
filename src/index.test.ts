import EE from '.'

test('on, emit', () => {
    const ee = new EE()
    const f = jest.fn()

    const off = ee.on('a', f)
    expect(f).toBeCalledTimes(0)
    ee.emit('a')
    expect(f).toBeCalledTimes(1)
    ee.emit('a', 1, 2, 3)
    expect(f).toBeCalledTimes(2)
    expect(f).lastCalledWith(1, 2, 3)
    off()
    ee.emit('a')
    expect(f).toBeCalledTimes(2)
})

test('off', () => {
    const ee = new EE()
    const f = jest.fn()

    ee.on('a', f)
    ee.off('a', f)
    ee.emit('a')
    expect(f).toBeCalledTimes(0)
})

test('once', () => {
    const ee = new EE()
    const f = jest.fn()

    ee.once('a', f)
    ee.emit('a')
    ee.emit('a')
    ee.emit('a')
    expect(f).toBeCalledTimes(1)
})

test('check listener', () => {
    const ee = new EE()

    expect(() => ee.on('test', true as any)).toThrow()
    expect(() => ee.off('test', {} as any)).toThrow()
    expect(() => ee.once('test', 1 as any)).toThrow()
})

test('has', () => {
    const ee = new EE()
    const f = () => {}

    expect(ee.has('a')).toBe(false)
    ee.on('a', f)
    expect(ee.has('a')).toBe(true)
    expect(ee.has('a', Function.prototype)).toBe(false)
    expect(ee.has('a', f)).toBe(true)
})

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Events type support.', () => {
    interface Events {
        aa (): void;
        bb (a: number, b: string): void;
        '1'(): void;
    }
    const ee = new EE<Events>()
    ee.on('aa', () => [])
    ee.on('bb', (a, b) => [])
    ee.emit('aa')
    ee.emit('bb', 1, 's')
    ee.has(1)
})
