# pivot-js

A lightway module that takes an array of objects and outputs a pivoted array of objects back.

`pivot-js` can pivot rows and calculate different metrics for each column. the results can also be optionally renamed.

## Example

```js

import Pivot from 'pivot-js'

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

const pivotTable = Pivot(
  data,
  'domain',
  {
    domain: 'counter',
    traffic: 'sum',
    trustFlow: 'mean'
  },
  ['Domain', 'Frequency of Domain', 'Traffic Sum', 'Average TF']
)

console.log(pivotTable) ->
[{
  Domain: 'duckduckgo.com',
  'Frequency of Domain': 2,
  'Traffic Sum': 3000,
  'Average TF': 30
},{
  Domain: 'google.com',
  'Frequency of Domain': 2,
  'Traffic Sum': 300,
  'Average TF': 42
},{
  Domain: 'Grand Total',
  'Frequency of Domain': 4,
  'Traffic Sum': 3300,
  'Average TF': 36
}]
```

## Options

Usage

```js
Pivot(data, row, values, rename)
```

Returns: `Array[Object]`

---

### data

Type: `Array[Object]`<br />
Required: `true`
Description: 'Prepare the data to pivot it'

```js
data = [{
  example1: string, exmaple2: number...
},{
  ....
}]
```

---

### row

Type: `String`<br />
Required: `true`

```js
row = 'example1'
```

---

### values

Type: `Object`<br />
Required: `true`<br />
Options: `display`, `count`, `sum`, `mean`, `min`, ` max`<br />

```js
values = {
  example1: 'count',
  example2: 'sum',
  example3: 'mean'
}
```

---

### rename

Type: `Array[Strings]`<br />
Required: `false`

```js
rename = ['Domains', 'Traffic Estimates']
```

---

## Install

Using npm:

```console
$ npm install pivot-js
```

Using yarn:

```console
$ yarn add pivot-js
```
