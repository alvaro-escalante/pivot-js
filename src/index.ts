import * as validation from './validations'
// Pivot table function
export function Pivot(
  data: Entries[],
  index: string,
  aggregate: AggFunc,
  rename: string[] = []
) {
  // Set starting variables
  let counter: number = 0
  let len: number = 0
  const store: Store = {}
  const totalHash: TotalHash = {}
  const aggValues = ['count', 'sum', 'mean', 'min', 'max']

  // Order array by column index passed
  const order: Entries[] = data.sort((a, b) => {
    if (typeof a[index] === 'number') {
      return (a[index] as number) - (b[index] as number)
    } else {
      return (a[index] as string).localeCompare(b[index] as string)
    }
  })

  // Find wrong function for type of column
  validation.checkAggType(aggregate, data[0])

  // Find wrong aggregate functions on aggregate obj values
  validation.checkAggValues(aggregate, aggValues)

  // Find wrong columns on aggregate obj keys
  validation.checkAggKeys(aggregate, Object.keys(data[0]))

  // Check rename function has enough items
  validation.checkRenames(rename, aggregate)

  // Calculate pivots
  const pivots = order.reduce((acc, row) => {
    // Collect data for pivots
    for (const [name, type] of Object.entries(aggregate)) {
      len = !acc.has(row[index]) ? 1 : len + 1
      switch (type) {
        case 'count':
          store[name] = { type, value: counter }
          counter = !acc.has(row[index]) ? 1 : counter + 1
          break

        case 'min':
        case 'max':
          if (!acc.has(row[index])) store[name] = { type, minmax: [] }
          store[name].minmax.push(row[name] as number)
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

    for (const [i, [name, type]] of Object.entries(aggregate).entries()) {
      const id = rename[i + 1] ?? false
      let title = ''

      switch (type) {
        case 'count':
          title = id ? id : `Count of ${name}`
          aggregateObj[title] = counter
          break
        case 'mean':
          title = id ? id : `Mean of ${name}`
          aggregateObj[title] = store[name].value / len
          break
        case 'min':
        case 'max':
          title = id ? id : `${type.charAt(0).toUpperCase() + type.slice(1)} of ${name}`
          aggregateObj[title] = Math[type](...store[name].minmax)
          break
        default:
          title = id ? id : `Sum of ${name}`
          aggregateObj[title] = store[name].value + ((aggregateObj[title] as number) ?? 0)
          break
      }

      totalHash[title] = { type, name }
    }

    // Add default name to first entry or use renames array
    const indexID = rename.length
      ? rename[0]
      : `${index.charAt(0).toUpperCase()}${index.slice(1)}`

    // Set table and spread aggregate calcs
    acc.set(row[index], {
      [indexID]: row[index],
      ...aggregateObj
    })

    return acc
  }, new Map())

  const pivotTable = [...pivots.values()]

  // Calculate totals

  // Get names of posibly renamed columns
  const headers: string[] = Object.keys(pivotTable[0])
  // Remove the first entry to use as row index
  const first: string = headers.splice(0, 1)[0]

  const totals: Entries = {}
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

    // For sum use pivoted results
    totals[header] = pivotTable.reduce((acc, curr) => acc + curr[header], 0)
  }

  // Add totals to pivot table
  pivotTable.push(totals)

  return pivotTable
}
