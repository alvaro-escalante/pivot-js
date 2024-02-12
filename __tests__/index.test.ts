import { Pivot } from '../src/index'
import * as data from './data'

describe('Readme test', () => {
  test('Run main test with one value in an array and with renames', () => {
    const options = {
      domain: 'count',
      traffic: ['sum', 'mean'],
      trustFlow: 'mean'
    }

    const rename = ['Domain', 'Frequency', 'Traffic Sum', 'Traffic Average', 'TF Average']

    expect(Pivot(data.readme, 'domain', options, rename)).toEqual([
      {
        Domain: 'duckduckgo.com',
        Frequency: 2,
        'Traffic Sum': 23000,
        'Traffic Average': 11500,
        'TF Average': 25
      },
      {
        Domain: 'google.com',
        Frequency: 2,
        'Traffic Sum': 30000,
        'Traffic Average': 15000,
        'TF Average': 40
      },
      {
        Domain: 'Grand Total',
        Frequency: 4,
        'Traffic Sum': 53000,
        'Traffic Average': 13250,
        'TF Average': 32.5
      }
    ])
  })
})

describe('Convert string that can be converted to numbers', () => {
  test('Sum number that comes as string', () => {
    const options = { traffic: 'sum' }

    expect(Pivot(data.stringNumbers, 'domain', options)).toEqual([
      {
        Domain: 'duckduckgo.com',
        'Sum of traffic': 23000
      },
      {
        Domain: 'google.com',
        'Sum of traffic': 30000
      },
      {
        Domain: 'Grand Total',
        'Sum of traffic': 53000
      }
    ])
  })
})

describe('Run two different functions on the same column', () => {
  test('Count and mode on same column', () => {
    const options = { position: ['count', 'sum'] }

    expect(Pivot(data.dub, 'keyword', options)).toEqual([
      { Keyword: 'car hire', 'Count of position': 3, 'Sum of position': 4 },
      { Keyword: 'Grand Total', 'Count of position': 3, 'Sum of position': 4 }
    ])
  })
})

describe('Run with string only', () => {
  test('Count and mode on same column', () => {
    const options = { position: 'count' }

    expect(Pivot(data.dub, 'keyword', options)).toEqual([
      { Keyword: 'car hire', 'Count of position': 3 },
      { Keyword: 'Grand Total', 'Count of position': 3 }
    ])
  })
})

describe('Aggregates with auto rename', () => {
  test('Count, ignoring empty string, auto rename', () => {
    const options = { keyword: 'count' }

    expect(Pivot(data.empty, 'position', options)).toEqual([
      { Position: 1, 'Count of keyword': 1 },
      { Position: 2, 'Count of keyword': 1 },
      { Position: 3, 'Count of keyword': 1 },
      { Position: 'Grand Total', 'Count of keyword': 3 }
    ])
  })

  test('Counta, including empty string auto rename', () => {
    const options = { keyword: 'counta' }
    expect(Pivot(data.empty, 'position', options)).toEqual([
      { Position: 1, 'Count of keyword': 2 },
      { Position: 2, 'Count of keyword': 1 },
      { Position: 3, 'Count of keyword': 1 },
      { Position: 'Grand Total', 'Count of keyword': 4 }
    ])
  })

  test('Sum auto rename', () => {
    const options = { rank: 'sum' }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Sum of rank': 2 },
      { Rank: 3, 'Sum of rank': 3 },
      { Rank: 'Grand Total', 'Sum of rank': 5 }
    ])
  })

  test('Mean auto rename', () => {
    const options = {
      rank: 'mean'
    }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Mean of rank': 1 },
      { Rank: 3, 'Mean of rank': 3 },
      { Rank: 'Grand Total', 'Mean of rank': 1.67 }
    ])
  })

  test('Median auto rename', () => {
    const options = { revenue: 'median' }

    expect(Pivot(data.median, 'page', options)).toEqual([
      { Page: 1, 'Median of revenue': 70 },
      { Page: 2, 'Median of revenue': 95 },
      { Page: 3, 'Median of revenue': 20 },
      { Page: 'Grand Total', 'Median of revenue': 60 }
    ])
  })

  test('Mode number auto rename', () => {
    const options = { position: 'mode' }

    expect(Pivot(data.mode, 'keyword', options)).toEqual([
      { Keyword: 'car hire', 'Mode of position': '1' },
      { Keyword: 'Grand Total', 'Mode of position': '1' }
    ])
  })

  test('Mode string auto rename', () => {
    const options = { url: 'mode' }

    expect(Pivot(data.mode, 'keyword', options)).toEqual([
      { Keyword: 'car hire', 'Mode of url': 'google.com' },
      { Keyword: 'Grand Total', 'Mode of url': 'google.com' }
    ])
  })

  test('Min auto rename', () => {
    const options = {
      page: 'min'
    }

    expect(Pivot(data.auto, 'rank', options)).toEqual([
      { Rank: 1, 'Min of page': 1 },
      { Rank: 3, 'Min of page': 2 },
      { Rank: 'Grand Total', 'Min of page': 1 }
    ])
  })

  test('Max auto rename', () => {
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
        'Mean of TF': 30
      },
      {
        Domain: 'google.com',
        'Count of type': 2,
        'Sum of TE': 300,
        'Mean of TF': 42
      },
      {
        Domain: 'Grand Total',
        'Count of type': 5,
        'Sum of TE': 6300,
        'Mean of TF': 34.8
      }
    ])
  })

  test('Duplicate mean aggregate functions ', () => {
    const options = { type: 'count', TE: 'mean', TF: 'mean' }
    expect(Pivot(data.full, 'domain', options)).toEqual([
      {
        Domain: 'duckduckgo.com',
        'Count of type': 3,
        'Mean of TE': 2000,
        'Mean of TF': 30
      },
      {
        Domain: 'google.com',
        'Count of type': 2,
        'Mean of TE': 150,
        'Mean of TF': 42
      },
      {
        Domain: 'Grand Total',
        'Count of type': 5,
        'Mean of TE': 1260,
        'Mean of TF': 34.8
      }
    ])
  })
})

describe('Errors', () => {
  test('Empty data, checkData()', () => {
    const options = { keyword: 'count' }
    expect(() => Pivot([], 'keyword', options)).toThrow(Error)
    expect(() => Pivot([], 'keyword', options)).toThrow(
      'The array is empty please make sure it includes the objects to pivot with'
    )
  })

  test('Missing index argument, checkIndex()', () => {
    const options = { keyword: 'count' }
    expect(() => Pivot(data.auto, '', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, '', options)).toThrow(
      `Missing second argument "index", please provide a string to identify the index column`
    )
  })

  test('Not existing index column provided, checkIndex()', () => {
    const options = { keyword: 'count' }
    expect(() => Pivot(data.auto, 'noindex', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'noindex', options)).toThrow(
      `The index column "noindex" does not exists`
    )
  })

  test('Missing aggregate functions, checkOptions()', () => {
    expect(() => Pivot(data.auto, 'keyword')).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword')).toThrow(
      `No options provided for the 3 argument, please provide at least one aggregate function`
    )
  })

  test('Not existing column on aggregate object, checkAggKeys()', () => {
    const options = { notThere: 'sum' }
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(
      `"notThere" does not exists`
    )
  })

  test('Not existing aggregate function, checkAggValues()', () => {
    const options = { page: 'suma' }
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(
      `Incorrect aggregate function "suma". Allowed functions are counta, count, sum, mean, median, mode, min, max.`
    )
  })

  test('Not existing aggregate function with two values wrong 1st, checkAggValues()', () => {
    const options = { page: ['counto', 'sumo'] }
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(
      `Incorrect aggregate function "counto". Allowed functions are counta, count, sum, mean, median, mode, min, max.`
    )
  })

  test('Not existing aggregate function with two values wrong 2nd', () => {
    const options = { page: ['count', 'sumo'] }
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(
      `Incorrect aggregate function "sumo". Allowed functions are counta, count, sum, mean, median, mode, min, max.`
    )
  })

  test('Not existing aggregate function with two single value wrong in array', () => {
    const options = { page: ['counto'] }
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(ReferenceError)
    expect(() => Pivot(data.auto, 'keyword', options)).toThrow(
      `Incorrect aggregate function "counto". Allowed functions are counta, count, sum, mean, median, mode, min, max.`
    )
  })

  test('Not enough columns on rename array, checkRenames()', async () => {
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

  test('Pass a number aggregate to a string column with array as second argument', async () => {
    const options = { url: ['count', 'min'], page: 'min', rank: 'mean' }
    const rename = ['Keyword', 'URL', 'Page', 'Rank']
    expect(() => Pivot(data.auto, 'keyword', options, rename)).toThrow(TypeError)
    expect(() => Pivot(data.auto, 'keyword', options, rename)).toThrow(
      `The aggregate function "min" cannot be used on the column "url" because it's a string`
    )
  })
})

describe('Edge cases', () => {
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

  test('Null as mean values', () => {
    const options = { keyword: 'count', meanValue: 'mean' }
    const rename = ['Keyword', 'Count', 'Mean']
    expect(Pivot(data.mean, 'keyword', options, rename)).toEqual([
      { Keyword: 'N/A', Count: 2, Mean: 19 },
      { Keyword: 'Grand Total', Count: 2, Mean: 19 }
    ])
  })
})
