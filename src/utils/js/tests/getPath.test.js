import { getPathAtPos, getPathLength } from '..'

describe('Location manipulation behavior tests', () => {
  beforeEach(() => {
    global.window = Object.create(window)
    const url = '/15/dashboard'
    Object.defineProperty(window, 'location', {
      value: {
        pathname: url,
      },
    })
  })
  it('should get path length', () => {
    expect(getPathLength()).toBe(3)
  })

  it('should get item at url at certain position', () => {
    expect(getPathAtPos(2)).toBe('dashboard')
  })
})
