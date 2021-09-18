# pivot-js

A lightway module that takes an array of objects and outputs a pivoted array of objects back.

`pivot-js` can pivot rows and calculate diferent metrics for each column.

`pivot-js` can also rename the original columns for output clarity.

## Options

### Pivot(data, index, values, rename)

Returns: `Array[Object]`

#### data

Type: `Array[Object]`<br />
Required: `true`

#### index

Type: `String`<br />
Required: `true`

#### values

Type: `Object`<br />
Required: `true`<br />
Options: `display`, `count`, `sum`, `mean`, `min`, ` max`<br />
Example: `values = { columnName: 'count' }`

#### rename

Type: `Array`<br />
Required: `false`
<br />

## Install

Using npm:

```console
$ npm install pivot-js
```

Using yarn:

```console
$ yarn add pivot-js
```

## Usage

Preapare your data

```js
const data = [
  {
    type: 'B',
    domain: 'duckduckgo.com',
    TE: 1000,
    TF: 30
  },
  {
    type: 'B',
    domain: 'duckduckgo.com',
    TE: 2000,
    TF: 30
  },
  {
    type: 'B',
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
```
