[![build](https://img.shields.io/travis/alvaro-escalante/pivot-js?style=for-the-badge)](https://app.travis-ci.com/github/alvaro-escalante/pivot-js)
![code-size](https://img.shields.io/github/languages/code-size/alvaro-escalante/pivot-js?style=for-the-badge)
![min-size](https://img.shields.io/bundlephobia/min/pivot-table-js?style=for-the-badge)
![types](https://img.shields.io/npm/types/pivot-table-js?style=for-the-badge)<br>
![node](https://img.shields.io/node/v/pivot-table-js?style=for-the-badge)
![npm](https://img.shields.io/npm/v/pivot-table-js?style=for-the-badge)


# pivot-table-js

A lightweight module that takes an array of objects and produces an array of objects back based on one or more aggregate function per column. Emulating excel pivot tables.

`pivot-table-js` can calculate different aggregate functions on sets of values. The results can be optionally renamed.


## Install

Using npm:

```console
$ npm install pivot-table-js
```

Using yarn:

```console
$ yarn add pivot-table-js
```

## Example

```js
import { Pivot } from 'pivot-table-js'


const data = [
  {
    domain: 'duckduckgo.com',
    path: '/search',
    traffic: 15000,
    trustFlow: 30
  },
  {
    domain: 'duckduckgo.com',
    path: '/images',
    traffic: 8000,
    trustFlow: 20
  },
  {
    domain: 'google.com',
    path: '/search',
    traffic: 20000,
    trustFlow: 42
  },
  {
    domain: 'google.com',
    path: '/images',
    traffic: 10000,
    trustFlow: 38
  }
]


const index = 'domain'

const aggFunc =   {
  domain: 'count', 
  traffic: 'sum', 
  trustFlow: 'mean' 
}

const rename = ['Domain', 'Frequency', 'Traffic Sum', 'Average TF']

const pivotTable = Pivot(data, index, aggFunc, rename)

console.log(pivotTable)
```

Will output:

```js
[{
  Domain: 'duckduckgo.com',
  'Count of domain': 2,
  'Sum of traffic': 23000,
  'Mean of traffic': 11500,
  'Mean of trustFlow': 25
},
{
  Domain: 'google.com',
  'Count of domain': 2,
  'Sum of traffic': 30000,
  'Mean of traffic': 15000,
  'Mean of trustFlow': 40
},
{
  Domain: 'Grand Total',
  'Count of domain': 4,
  'Sum of traffic': 53000,
  'Mean of traffic': 13250,
  'Mean of trustFlow': 32.5
}]
```


| Domain         | Frequency | Traffic Sum | Average TF |
| -------------- | ----------| ----------- | ---------- |
| duckduckgo.com | 2         | 3000        | 30         |
| google.com     | 2         | 300         | 42         |
| Grand Total    | 4         | 3300        | 36         |


## Updates

New feature allows for multiple funcions on the same column, just enclose the type of funcions in an array 

```js
const aggFunc =   {
  domain: 'count', 
  traffic: ['sum', 'mean'], 
  trustFlow: 'mean' 
}
```

---

## Available aggregate functions

| Function  | Definition     |
| :-------------- | :-------------------------------------- |
| count  | Calculates the count of all values in a set |
| counta | Calculates the count of all values in a set including empty strings |
| sum    | Calculates the sum of values. |
| mean   | Calculates the average in a set of values — not rounded |
| median | Calculates the median in a set of values — not rounded |
| mode   | Calculates the mode in a set of values |
| min    | Minimum gets the minimum value in a set of values |
| max    | Maximun gets the maximum value in a set of values |
 
## Usage

### Pivot(data, index, values [,rename])

* `data` *`<Array<Object>>`* Prepared Array of objects to pivot against.
* `index` *`<string>`* The index row to use as pivot.
* `values` *`<Object>`* Aggregate functions
  * `[column: <string>]: <Array<string>> | string` Use array for more than one option on the same column
* `rename` *`<Array<string>>`* Optionally rename the output columns, the order is important.
* `returns`: *`<Array<Object>>`*

---
