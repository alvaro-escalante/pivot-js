import { Pivot } from '../src/index'
import data from '../src/testData.json'

test('Full with no rename', () => {
  const options = {
    domain: 'counter',
    type: 'display',
    TE: 'sum',
    TF: 'mean'
  }
  expect(Pivot(data, 'type', options)).toEqual([
    { index: 'A', domain: 2, type: 'A', TE: 300, TF: 42 },
    { index: 'B', domain: 3, type: 'B', TE: 6000, TF: 30 },
    { index: 'Grand Total', domain: 5, type: '-', TE: 6300, TF: 34.8 }
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
