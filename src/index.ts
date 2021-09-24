import * as validation from './validations'
import * as calcs from './calcs'
// Pivot table function
export const Pivot = (
  data: Entries[], // Data Array of Object
  index: string = '', // Index column String
  aggregate: AggFunc = {}, // Aggreate function object literal
  rename: string[] = [] // Rename function array of strings
) => {
  // Initialise variables
  const store: Store = {}
  const totalHash: TotalHash = {}
  const aggValues = ['counta', 'count', 'sum', 'mean', 'median', 'mode', 'min', 'max']

  // Order array by column index passed
  const order: Entries[] = data.sort((a, b) =>
    typeof a[index] === 'number'
      ? (a[index] as number) - (b[index] as number)
      : `${a[index]}`.localeCompare(`${b[index]}`)
  )

  // Check there is an index coliumn
  validation.checkIndex(index, data[0])

  // Check there is at least one aggregate function
  validation.checkOptions(aggregate)

  // Find wrong function for the type of column
  validation.checkAggType(aggregate, data[0])

  // Find incorrect aggregate name on aggregate obj values
  validation.checkAggValues(aggregate, aggValues)

  // Find wrong columns refered on aggregate obj keys
  validation.checkAggKeys(aggregate, Object.keys(data[0]))

  // Check rename function has enough items to much number of computed columns
  validation.checkRenames(aggregate, rename)

  // Calculate pivots
  const pivots = order.reduce((acc, row) => {
    // Collect data for pivots
    for (const [name, type] of Object.entries(aggregate)) {
      switch (type) {
        case 'count':
          if (!acc.has(row[index])) store[name] = { type, value: 0 }
          const val = typeof row[name] === 'string' && row[name] === '' ? 0 : 1
          store[name].value = store[name].value + val
          break
        case 'counta':
          if (!acc.has(row[index])) store[name] = { type, value: 0 }
          store[name].value = store[name].value + 1
          break
        case 'min':
        case 'max':
        case 'mean':
        case 'median':
        case 'mode':
          if (!acc.has(row[index])) store[name] = { type, collection: [] }
          store[name].collection.push(row[name] as number)
          break
        default:
          store[name] = {
            type,
            value: !acc.has(row[index])
              ? (row[name] as number)
              : (store[name].value as number) + (row[name] as number)
          }
          break
      }
    }

    const aggregateObj: Entries = {}
    // Compute collected pivots
    for (const [i, [name, type]] of Object.entries(aggregate).entries()) {
      const id = rename[i + 1] ?? false
      let title = ''

      switch (type) {
        case 'count':
          title = id ? id : `Count of ${name}`
          aggregateObj[title] = store[name].value
          break
        case 'counta':
          title = id ? id : `Count of ${name}`
          aggregateObj[title] = store[name].value
          break
        case 'mean':
        case 'median':
        case 'mode':
          title = id ? id : `${calcs.caps(type)} of ${name}`
          aggregateObj[title] = calcs[type](store[name].collection)
          break
        case 'min':
        case 'max':
          title = id ? id : `${calcs.caps(type)} of ${name}`
          aggregateObj[title] = Math[type](...store[name].collection)
          break
        default:
          title = id ? id : `Sum of ${name}`
          aggregateObj[title] = ((aggregateObj[title] as number) || 0) + store[name].value
          break
      }

      totalHash[title] = { type, name }
    }

    // Add default name to first entry or use renames array
    const indexID = rename.length ? rename[0] : calcs.caps(index)

    // Set table and spread aggregate calcs
    acc.set(row[index], {
      [indexID]: row[index],
      ...aggregateObj
    })

    return acc
  }, new Map())

  const pivotTable = [...pivots.values()]

  // Calculate totals
  const totals: Entries = {}

  // Get names of posibly renamed columns
  const headers: string[] = Object.keys(pivotTable[0])
  // Remove the first entry to use as row index
  const first: string = headers.splice(0, 1)[0]

  // Set totals name to match index column
  totals[first] = 'Grand Total'

  // Calculate totals based on original data and tabled data
  for (const header of headers) {
    const item = totalHash[header]
    const value = item.name

    // For mean take the whole data as a reference
    if (item.type === 'mean') {
      totals[header] =
        data.reduce((acc, curr) => acc + Number(curr[value]), 0) / data.length
      continue
    }

    // For min/max use pivoted results
    if (['min', 'max'].includes(item.type)) {
      totals[header] = data.reduce((acc, curr) => {
        const evaluation = item.type === 'min' ? acc < curr[value] : acc > curr[value]
        return acc !== 0 && evaluation ? acc : curr[value]
      }, 0)

      continue
    }

    if (['median', 'mode'].includes(item.type)) {
      const numbers = data.map((obj) => obj[item.name])
      totals[header] = calcs[item.type](numbers as number[])
      continue
    }

    // For sum use pivoted results
    totals[header] = pivotTable.reduce((acc, curr) => acc + curr[header], 0)
  }

  // Add totals to pivot table
  pivotTable.push(totals)

  return pivotTable
}
