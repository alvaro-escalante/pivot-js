import { Pivot } from '../src/index'
import * as data from './data'

test('Simple count with auto rename', () => {
  const options = {
    rank: 'count'
  }

  expect(Pivot(data.avis, 'rank', options)).toEqual([
    { Rank: 1, 'Count of rank': 2 },
    { Rank: 3, 'Count of rank': 1 },
    { Rank: 'Grand Total', 'Count of rank': 3 }
  ])
})

test('Sum with renaming', () => {
  const options = { TF: 'sum' }

  const rename = ['Ranking', 'Trustflow']

  expect(Pivot(data.jose, 'position', options, rename)).toEqual([
    { Ranking: 1, Trustflow: 110 },
    { Ranking: 2, Trustflow: 140 },
    { Ranking: 3, Trustflow: 20 },
    { Ranking: 'Grand Total', Trustflow: 270 }
  ])
})

test('Number as index', () => {
  const options = { position: 'count', TF: 'sum' }
  expect(Pivot(data.jose, 'position', options)).toEqual([
    { Position: 1, 'Sum of TF': 110, 'Count of position': 2 },
    { Position: 2, 'Sum of TF': 140, 'Count of position': 1 },
    { Position: 3, 'Sum of TF': 20, 'Count of position': 1 },
    { Position: 'Grand Total', 'Sum of TF': 270, 'Count of position': 4 }
  ])
})

// test('Only min with default index counter', () => {
//   const options = { TF: 'mean' }

//   expect(Pivot(data.test, 'domain', options)).toEqual([
//     { index: 'duckduckgo.com', domain: 3, TF: 30 },
//     { index: 'google.com', domain: 2, TF: 42 },
//     { index: 'Grand Total', domain: 5, TF: 34.8 }
//   ])
// })

// test('Only sum with default index counter', () => {
//   const options = { TE: 'sum' }

//   expect(Pivot(data.test, 'domain', options)).toEqual([
//     { index: 'duckduckgo.com', domain: 3, TE: 6000 },
//     { index: 'google.com', domain: 2, TE: 300 },
//     { index: 'Grand Total', domain: 5, TE: 6300 }
//   ])
// })

// test('Only min with default index counter', () => {
//   const options = { TF: 'min' }

//   expect(Pivot(data.test, 'domain', options)).toEqual([
//     { index: 'duckduckgo.com', domain: 3, TF: 30 },
//     { index: 'google.com', domain: 2, TF: 42 },
//     { index: 'Grand Total', domain: 5, TF: 30 }
//   ])
// })

// test('Full with no rename', () => {
//   const options = {
//     domain: 'display',
//     TE: 'sum',
//     TF: 'min'
//   }
//   expect(Pivot(data.test, 'type', options)).toEqual([
//     { index: 'A', domain: 'google.com', TE: 5300, TF: 30, type: 4 },
//     { index: 'B', domain: 'duckduckgo.com', TE: 1000, TF: 30, type: 1 },
//     { index: 'Grand Total', domain: '-', TE: 6300, TF: 30, type: 5 }
//   ])
// })

// test('Full with rename', () => {
//   const options = {
//     domain: 'counter',
//     TE: 'sum',
//     TF: 'mean'
//   }
//   const rename = ['Type', 'Domain', 'Traffic Estimate', 'Additional Traffic']
//   expect(Pivot(data, 'type', options, rename)).toEqual([
//     { Type: 'A', Domain: 2, 'Traffic Estimate': 300, 'Additional Traffic': 42 },
//     { Type: 'B', Domain: 3, 'Traffic Estimate': 6000, 'Additional Traffic': 30 },
//     {
//       Type: 'Grand Total',
//       Domain: 5,
//       'Traffic Estimate': 6300,
//       'Additional Traffic': 34.8
//     }
//   ])
// })

// test('Double condition with rename', () => {
//   const options = {
//     domain: 'counter',
//     TE: 'sum',
//     TF: 'sum'
//   }
//   const rename = ['Type', 'Domain', 'Traffic Estimate', 'Additional Traffic']
//   expect(Pivot(data, 'type', options, rename)).toEqual([
//     { ype: 'A', Domain: 2, 'Traffic Estimate': 300, 'Additional Traffic': 84 },
//     { Type: 'B', Domain: 3, 'Traffic Estimate': 6000, 'Additional Traffic': 90 },
//     {
//       Type: 'Grand Total',
//       Domain: 5,
//       'Traffic Estimate': 6300,
//       'Additional Traffic': 174
//     }
//   ])
// })
