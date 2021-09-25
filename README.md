[![build](https://img.shields.io/travis/alvaro-escalante/pivot-js?style=for-the-badge)](https://app.travis-ci.com/github/alvaro-escalante/pivot-js)
![code-size](https://img.shields.io/github/languages/code-size/alvaro-escalante/pivot-js?style=for-the-badge)

![min-size](https://img.shields.io/bundlephobia/min/pivot-table-js?style=for-the-badge)
![types](https://img.shields.io/npm/types/pivot-table-js?style=for-the-badge)



# pivot-table-js

A lightweight module that takes an array of objects and produces an array of objects based on the aggregate values. Emulating excel pivot tables.

`pivot-table-js` can calculate different/same aggregate values for each column. the results can also be optionally renamed.

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
    traffic: 1000,
    trustFlow: 30
  },
  {
    domain: 'duckduckgo.com',
    traffic: 2000,
    trustFlow: 30
  },
  {
    domain: 'google.com',
    traffic: 100,
    trustFlow: 42
  },
  {
    domain: 'google.com',
    traffic: 200,
    trustFlow: 42
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
  'Frequency': 2,
  'Traffic Sum': 3000,
  'Average TF': 30
},
{
  Domain: 'google.com',
  'Frequency': 2,
  'Traffic Sum': 300,
  'Average TF': 42
},
{
  Domain: 'Grand Total',
  'Frequency': 4,
  'Traffic Sum': 3300,
  'Average TF': 36
}]
```


| Domain         | Frequency | Traffic Sum | Average TF |
| -------------- | ----------| ----------- | ---------- |
| duckduckgo.com | 2         | 3000        | 30         |
| google.com     | 2         | 300         | 42         |
| Grand Total    | 4         | 3300        | 36         |

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
  * `[column: <string>]:` `'count'`
  * `[column: <string>]:` `'counta'`
  * `[column: <string>]:` `'sum'` 
  * `[column: <string>]:` `'mean'` 
  * `[column: <string>]:` `'median'` 
  * `[column: <string>]:` `'mode'` 
  * `[column: <string>]:` `'min'`
  * `[column: <string>]:` `'max'`
* `rename` *`<Array><string>>`* Optionally rename the output columns, the order is important.
* `returns`: *`<Array<Object>>`*

---
