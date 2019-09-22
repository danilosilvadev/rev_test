import { pagination } from '..'

describe('Pagination behavior tests', () => {
  it('should create a paginated array', () => {
    const currentPage = 10
    const totalPages = 20
    expect(pagination(currentPage, totalPages)).toEqual([
      1,
      '...',
      8,
      9,
      10,
      11,
      12,
      '...',
      20,
    ])
  })
})
