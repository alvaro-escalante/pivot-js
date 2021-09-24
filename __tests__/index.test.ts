import { Pivot } from '../src/index'
import * as data from './data'

describe('Aggregates with auto rename', () => {
  test('Simple count with auto rename', () => {
    const options = {
      rank: 'count'
    }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Count of rank': 2 },
      { Rank: 3, 'Count of rank': 1 },
      { Rank: 'Grand Total', 'Count of rank': 3 }
    ])
  })

  test('Simple sum with auto rename', () => {
    const options = {
      rank: 'sum'
    }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Sum of rank': 2 },
      { Rank: 3, 'Sum of rank': 3 },
      { Rank: 'Grand Total', 'Sum of rank': 5 }
    ])
  })

  test('Simple mean with auto rename', () => {
    const options = {
      rank: 'mean'
    }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Average of rank': 1 },
      { Rank: 3, 'Average of rank': 3 },
      { Rank: 'Grand Total', 'Average of rank': 1.6666666666666667 }
    ])
  })

  test('Simple min with auto rename', () => {
    const options = {
      page: 'min'
    }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Min of page': 1 },
      { Rank: 3, 'Min of page': 2 },
      { Rank: 'Grand Total', 'Min of page': 1 }
    ])
  })

  test('Simple max with auto rename', () => {
    const options = {
      page: 'max'
    }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Max of page': 2 },
      { Rank: 3, 'Max of page': 2 },
      { Rank: 'Grand Total', 'Max of page': 2 }
    ])
  })
})

describe('Aggregates with renames', () => {
  test('Count with renaming', () => {
    const options = { position: 'count' }

    const rename = ['Ranking', 'Instances']

    expect(Pivot(data.renames, 'position', options, rename)).toEqual([
      { Ranking: 1, Instances: 2 },
      { Ranking: 2, Instances: 1 },
      { Ranking: 3, Instances: 1 },
      { Ranking: 'Grand Total', Instances: 4 }
    ])
  })

  test('Sum with renaming', () => {
    const options = { TF: 'sum' }

    const rename = ['Ranking', 'Trustflow sum']

    expect(Pivot(data.renames, 'position', options, rename)).toEqual([
      { Ranking: 1, 'Trustflow sum': 110 },
      { Ranking: 2, 'Trustflow sum': 140 },
      { Ranking: 3, 'Trustflow sum': 20 },
      { Ranking: 'Grand Total', 'Trustflow sum': 270 }
    ])
  })

  test('Mean with renaming', () => {
    const options = { TF: 'mean' }

    const rename = ['Ranking', 'Trustflow avg']

    expect(Pivot(data.renames, 'position', options, rename)).toEqual([
      { Ranking: 1, 'Trustflow avg': 55 },
      { Ranking: 2, 'Trustflow avg': 140 },
      { Ranking: 3, 'Trustflow avg': 20 },
      { Ranking: 'Grand Total', 'Trustflow avg': 67.5 }
    ])
  })

  test('Min with renaming', () => {
    const options = { TF: 'min' }

    const rename = ['Ranking', 'Trustflow min']

    expect(Pivot(data.renames, 'position', options, rename)).toEqual([
      { Ranking: 1, 'Trustflow min': 10 },
      { Ranking: 2, 'Trustflow min': 140 },
      { Ranking: 3, 'Trustflow min': 20 },
      { Ranking: 'Grand Total', 'Trustflow min': 10 }
    ])
  })

  test('Max with renaming', () => {
    const options = { TF: 'max' }

    const rename = ['Ranking', 'Trustflow max']

    expect(Pivot(data.renames, 'position', options, rename)).toEqual([
      { Ranking: 1, 'Trustflow max': 100 },
      { Ranking: 2, 'Trustflow max': 140 },
      { Ranking: 3, 'Trustflow max': 20 },
      { Ranking: 'Grand Total', 'Trustflow max': 140 }
    ])
  })
})

describe('Full tests', () => {
  test('Multiple aggregate functions ', () => {
    const options = { type: 'count', TE: 'sum', TF: 'mean' }
    expect(Pivot(data.full, 'domain', options)).toEqual([
      {
        Domain: 'duckduckgo.com',
        'Count of type': 3,
        'Sum of TE': 6000,
        'Average of TF': 30
      },
      {
        Domain: 'google.com',
        'Count of type': 2,
        'Sum of TE': 300,
        'Average of TF': 42
      },
      {
        Domain: 'Grand Total',
        'Count of type': 5,
        'Sum of TE': 6300,
        'Average of TF': 34.8
      }
    ])
  })

  test('Duplicate mean aggregate functions ', () => {
    const options = { type: 'count', TE: 'mean', TF: 'mean' }
    expect(Pivot(data.full, 'domain', options)).toEqual([
      {
        Domain: 'duckduckgo.com',
        'Count of type': 3,
        'Average of TE': 2000,
        'Average of TF': 30
      },
      {
        Domain: 'google.com',
        'Count of type': 2,
        'Average of TE': 150,
        'Average of TF': 42
      },
      {
        Domain: 'Grand Total',
        'Count of type': 5,
        'Average of TE': 1260,
        'Average of TF': 34.8
      }
    ])
  })
})

describe('Errors', () => {
  test('Missing index argument', () => {
    const options = { keyword: 'count' }
    expect(() => Pivot(data.auto, '', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, '', options)).toThrow(
      `Missing second argument "index", please provide a string to identify the index column`
    )
  })

  test('Missing aggregate functions', () => {
    expect(() => Pivot(data.auto, 'keyword')).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword')).toThrow(
      `No options provided for the 3 argument, please provide at least one aggregate function`
    )
  })

  test('Not existing index column provided', () => {
    const options = { keyword: 'count' }
    expect(() => Pivot(data.auto, 'noindex', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'noindex', options)).toThrow(
      `The index column "noindex" does not exists`
    )
  })

  test('Not existing column on aggregate object', () => {
    const options = { notThere: 'sum' }
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(
      `"notThere" does not exists`
    )
  })

  test('Not existing aggregate function', () => {
    const options = { page: 'suma' }
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(
      `Incorrect aggregate function "suma". Allowed functions are counta, count, sum, mean, min, max.`
    )
  })

  test('Not enough columns on rename array', async () => {
    const options = { page: 'sum', rank: 'mean' }
    const rename = ['Page', 'Rank']
    expect(() => Pivot(data.auto, 'keyword', options, rename)).toThrow(TypeError)
    expect(() => Pivot(data.auto, 'keyword', options, rename)).toThrow(
      `There should be "3" entries on the rename array, only "2" defined, make sure the index is also included`
    )
  })

  test('Pass a number aggregate to a string column', async () => {
    const options = { url: 'sum', page: 'min', rank: 'mean' }
    const rename = ['Keyword', 'URL', 'Page', 'Rank']
    expect(() => Pivot(data.auto, 'keyword', options, rename)).toThrow(TypeError)
    expect(() => Pivot(data.auto, 'keyword', options, rename)).toThrow(
      `The aggregate function "sum" cannot be used on the column "url" because it's a string`
    )
  })
})

describe('Edge cases', () => {
  test('Count on empty string', () => {
    const options = { keyword: 'count' }
    expect(Pivot(data.empty, 'position', options)).toEqual([
      { Position: 1, 'Count of keyword': 1 },
      { Position: 2, 'Count of keyword': 1 },
      { Position: 3, 'Count of keyword': 1 },
      { Position: 'Grand Total', 'Count of keyword': 3 }
    ])
  })

  test('Count on empty string with index', () => {
    const options = { keyword: 'count' }
    expect(Pivot(data.empty, 'keyword', options)).toEqual([
      { Keyword: '', 'Count of keyword': 0 },
      { Keyword: 'bar', 'Count of keyword': 1 },
      { Keyword: 'foo', 'Count of keyword': 1 },
      { Keyword: 'hey', 'Count of keyword': 1 },
      { Keyword: 'Grand Total', 'Count of keyword': 3 }
    ])
  })

  test('Count all on empty string', () => {
    const options = { keyword: 'counta' }
    expect(Pivot(data.empty, 'position', options)).toEqual([
      { Position: 1, 'Count of keyword': 2 },
      { Position: 2, 'Count of keyword': 1 },
      { Position: 3, 'Count of keyword': 1 },
      { Position: 'Grand Total', 'Count of keyword': 4 }
    ])
  })

  test('Number as index', () => {
    const options = { position: 'count', TF: 'sum' }
    const rename = ['Rank', 'Counter', 'Trustflow']
    expect(Pivot(data.renames, 'position', options, rename)).toEqual([
      { Rank: 1, Trustflow: 110, Counter: 2 },
      { Rank: 2, Trustflow: 140, Counter: 1 },
      { Rank: 3, Trustflow: 20, Counter: 1 },
      { Rank: 'Grand Total', Trustflow: 270, Counter: 4 }
    ])
  })
})
