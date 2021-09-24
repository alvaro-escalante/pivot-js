import * as validation from './validations'
// Pivot table function
export const Pivot = (
  data: Entries[], // Data Array of Object
  index: string = '', // Index column String
  aggregate: AggFunc = {}, // Aggreate function object literal
  rename: string[] = [] // Rename function array of strings
) => {
  // Initialise variables
  let counter: number = 0
  const store: Store = {}
  const totalHash: TotalHash = {}
  const aggValues = ['count', 'sum', 'mean', 'min', 'max']

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
          store[name] = { type, value: counter }
          counter = !acc.has(row[index]) ? 1 : counter + 1
          break
        case 'min':
        case 'max':
        case 'mean':
          if (!acc.has(row[index])) store[name] = { type, colection: [] }
          store[name].colection.push(row[name] as number)
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
          aggregateObj[title] = counter
          break
        case 'mean':
          title = id ? id : `Average of ${name}`
          const colection = store[name].colection
          aggregateObj[title] =
            colection.reduce((total, num) => total + num) / colection.length
          break
        case 'min':
        case 'max':
          title = id ? id : `${type.charAt(0).toUpperCase() + type.slice(1)} of ${name}`
          aggregateObj[title] = Math[type](...store[name].colection)
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

    // For sum use pivoted results
    totals[header] = pivotTable.reduce((acc, curr) => acc + curr[header], 0)
  }

  // Add totals to pivot table
  pivotTable.push(totals)

  return pivotTable
}
