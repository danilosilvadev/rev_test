import { clearString } from '..'

describe('clearString behavior tests', () => {
  it('should clear the string using text style', () => {
    expect(clearString.text('dan silva')).toBe('Dan Silva')
  })
  it('should clear the string using snake case style', () => {
    expect(clearString.snakeCase('dan silva')).toBe('dan_silva')
  })
})
