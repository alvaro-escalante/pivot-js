import Pivot from '../src/index'
import data from '../src/testData.json'

test('Only min with default index counter', () => {
  const options = { TF: 'mean' }

  expect(Pivot(data, 'domain', options)).toEqual([
    { row: 'duckduckgo.com', domain: 3, TF: 30 },
    { row: 'google.com', domain: 2, TF: 42 },
    { row: 'Grand Total', domain: 5, TF: 34.8 }
  ])
})

test('Only sum with default index counter', () => {
  const options = { TE: 'sum' }

  expect(Pivot(data, 'domain', options)).toEqual([
    { index: 'duckduckgo.com', domain: 3, TE: 6000 },
    { index: 'google.com', domain: 2, TE: 300 },
    { index: 'Grand Total', domain: 5, TE: 6300 }
  ])
})

test('Full with no rename', () => {
  const options = {
    domain: 'counter',
    type: 'display',
    TE: 'sum',
    TF: 'min'
  }
  expect(Pivot(data, 'type', options)).toEqual([
    { row: 'A', domain: 2, type: 'A', TE: 300, TF: 42 },
    { row: 'B', domain: 3, type: 'B', TE: 6000, TF: 30 },
    { row: 'Grand Total', domain: 5, type: '-', TE: 6300, TF: 30 }
  ])
})

test('Full with rename', () => {
  const options = {
    domain: 'counter',
    TE: 'sum',
    TF: 'mean'
  }
  const rename = ['Type', 'Domain', 'Traffic Estimate', 'Additional Traffic']
  expect(Pivot(data, 'type', options, rename)).toEqual([
    { Type: 'A', Domain: 2, 'Traffic Estimate': 300, 'Additional Traffic': 42 },
    { Type: 'B', Domain: 3, 'Traffic Estimate': 6000, 'Additional Traffic': 30 },
    {
      Type: 'Grand Total',
      Domain: 5,
      'Traffic Estimate': 6300,
      'Additional Traffic': 34.8
    }
  ])
})

test('Double condition with rename', () => {
  const options = {
    domain: 'counter',
    TE: 'sum',
    TF: 'sum'
  }
  const rename = ['Type', 'Domain', 'Traffic Estimate', 'Additional Traffic']
  expect(Pivot(data, 'type', options, rename)).toEqual([
    { Type: 'A', Domain: 2, 'Traffic Estimate': 300, 'Additional Traffic': 84 },
    { Type: 'B', Domain: 3, 'Traffic Estimate': 6000, 'Additional Traffic': 90 },
    {
      Type: 'Grand Total',
      Domain: 5,
      'Traffic Estimate': 6300,
      'Additional Traffic': 174
    }
  ])
})
