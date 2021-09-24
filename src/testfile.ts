import { Pivot } from './index'

const data = [
  {
    type: 'B',
    domain: 'duckduckgo.com',
    TE: 1000,
    TF: 30
  },
  {
    type: 'A',
    domain: 'duckduckgo.com',
    TE: 2000,
    TF: 30
  },
  {
    type: 'A',
    domain: 'duckduckgo.com',
    TE: 3000,
    TF: 30
  },
  {
    type: 'A',
    domain: 'google.com',
    TE: 100,
    TF: 42
  },
  {
    type: 'A',
    domain: 'google.com',
    TE: 200,
    TF: 42
  }
]

const options = {
  type: 'mean',
  TE: 'mean',
  TF: 'mean'
}

const pivotTable = Pivot(data, 'domain', options)

console.log(pivotTable)
