# pivot-js

A lightweight module that takes an array of objects and produces an array of objects based on the aggregate values. Emulating excel pivot tables.

`pivot-js` can calculate different/same aggregate values for each column. the results can also be optionally renamed.

## Install

Using npm:

```console
$ npm install pivot-js
```

Using yarn:

```console
$ yarn add pivot-js
```

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

console.log(pivotTable)
/*
[{
  Domain: 'duckduckgo.com',
  'Frequency of Domain': 2,
  'Traffic Sum': 3000,
  'Average TF': 30
},
{
  Domain: 'google.com',
  'Frequency of Domain': 2,
  'Traffic Sum': 300,
  'Average TF': 42
},
{
  Domain: 'Grand Total',
  'Frequency of Domain': 4,
  'Traffic Sum': 3300,
  'Average TF': 36
}]
*/
```

| Domain         | Frequency of Domain | Traffic Sum | Average TF |
| -------------- | ------------------- | ----------- | ---------- |
| duckduckgo.com | 2                   | 3000        | 30         |
| google.com     | 2                   | 300         | 42         |
| Grand Total    | 4                   | 3300        | 36         |

---

## Options

Usage

```js
Pivot(data, index, values, rename)
```

Returns: `Array[Object]`

---

### data

Type: `Array[Object]`<br />
Required: `true`<br />
Description: Array of objects with the data to pivot against.

```js
data = [{
  example1: string, exmaple2: number...
},{
  ....
}]
```

---

### index

Type: `String`<br />
Required: `true`<br />
Description: The index row to use as pivot.

```js
index = 'example1'
```

---

### values

Type: `Object`<br />
Required: `true`<br />
Options: `display`, `count`, `sum`, `mean`, `min`, ` max`<br />
Description: The aggregate values:

- display: Do not compute the value just display it.<br />
- count: Count how many instances of the row.<br />
- sum: Sum entries.<br />
- mean: Calculate the average of entries.<br />
- min/max: Calculate min/max values. <br />

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
Required: `false`<br />
Description: Optionally rename the output columns, the order is important.

```js
rename = ['Domains', 'Traffic Estimates' ...]
```
