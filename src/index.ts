import * as validation from './validations'
import * as util from './utils'
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
  const aggValues = [
    'counta',
    'count',
    'count-unique',
    'sum',
    'mean',
    'median',
    'mode',
    'min',
    'max'
  ]
  let renameCounter: number = 0

  // Order array by column index passed
  const order: Entries[] = data.sort((a, b) =>
    typeof a[index] === 'number'
      ? (a[index] as number) - (b[index] as number)
      : `${a[index]}`.localeCompare(`${b[index]}`)
  )

  // Unique set for count-unique only
  const uniqueCount = new Set()

  // Make sure the data array is not empty
  validation.checkData(data)

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
    for (const [name, types] of Object.entries(aggregate)) {
      for (const type of Object.values([types]).flat()) {
        switch (type) {
          case 'count-unique':
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {}
              store[name][type] = 0
            }

            if (!uniqueCount.has(row[name])) {
              uniqueCount.add(row[name])
              store[name][type] = (store[name][type] as number) + 1
            }

            break

          case 'count':
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {}
              store[name][type] = 0
            }

            const val = typeof row[name] === 'string' && row[name] === '' ? 0 : 1
            store[name][type] = (store[name][type] as number) + val
            break
          case 'counta':
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {}
              store[name][type] = 0
            }

            store[name][type] = (store[name][type] as number) + 1
            break
          case 'min':
          case 'max':
          case 'mean':
          case 'median':
          case 'mode':
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {}
              store[name][type] = []
            }
            ;(store[name][type] as (string | number | null)[] | null).push(
              util.coerceType(row[name] as number)
            )
            break
          default:
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {}
              store[name][type] = 0
            }

            const num = util.coerceType(row[name] as number)

            store[name][type] = (store[name][type] as number) + (num as number)

            break
        }
      }
    }

    const aggregateObj: Entries = {}

    // Compute collected pivots
    for (const [name, types] of Object.entries(aggregate)) {
      let title = ''

      for (const type of Object.values([types]).flat()) {
        renameCounter++
        const id = rename[renameCounter] ?? false

        switch (type) {
          case 'count-unique':
            title = id ? id : `Unique count of ${name}`
            aggregateObj[title] = store[name][type]
            break
          case 'count':
            title = id ? id : `Count of ${name}`
            aggregateObj[title] = store[name][type]
            break
          case 'counta':
            title = id ? id : `Count of ${name}`
            aggregateObj[title] = store[name][type]
            break
          case 'mean':
          case 'median':
          case 'mode':
            title = id ? id : `${util.caps(type)} of ${name}`

            const values = store[name][type] as number[]
            aggregateObj[title] = util[type](values)
            break
          case 'min':
          case 'max':
            title = id ? id : `${util.caps(type)} of ${name}`
            aggregateObj[title] = Math[type](...(store[name][type] as number[]))
            break
          default:
            title = id ? id : `Sum of ${name}`

            aggregateObj[title] =
              ((aggregateObj[title] as number) || 0) + (store[name][type] as number)
            break
        }

        totalHash[title] = { type, name }
      }
    }

    renameCounter = 0

    // Add default name to first entry or use renames array
    const indexID = rename.length ? rename[0] : util.caps(index)

    // Set table and spread aggregate util
    acc.set(row[index], {
      [indexID]: row[index],
      ...aggregateObj
    })

    return acc
  }, new Map())

  console.log(pivots)

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
      const cleanData = data.filter((entry) =>
        Object.keys(aggregate).every((key) => {
          if (aggregate[key] === 'mean') {
            return typeof entry[key] === 'number'
          }
          return true
        })
      )

      const amount = cleanData.reduce((acc, curr) => {
        let num = curr[value]

        if (typeof num === 'string') num = util.coerceType(num)

        return acc + (num as number)
      }, 0)
      const decimals = (amount / cleanData.length).toFixed(2)
      totals[header] = Number(decimals)

      continue
    }

    // For min/max use pivoted results
    if (['min', 'max'].includes(item.type)) {
      totals[header] = data.reduce((acc, curr) => {
        // Ensure curr[value] is a number before comparing. If not, return acc to skip this iteration.
        if (typeof curr[value] !== 'number') return acc
        // Convert acc to number in case it's the initial value (0) or another type. Use +acc for shorthand conversion.
        const accNumber = +acc
        const currNumber = curr[value] as number // We've already checked it's a number, so this type assertion is safe.

        // Perform the comparison using the numeric values.
        const evaluation =
          item.type === 'min' ? accNumber < currNumber : accNumber > currNumber
        return accNumber !== 0 && evaluation ? accNumber : currNumber
      }, 0)

      continue
    }

    if (['median', 'mode'].includes(item.type)) {
      const numbers = data.map((obj) => obj[item.name])
      totals[header] = util[item.type](numbers as number[])
      continue
    }

    // For sum use pivoted results
    totals[header] = pivotTable.reduce((acc, curr) => acc + curr[header], 0)
  }

  // Add totals to pivot table
  pivotTable.push(totals)

  return pivotTable
}
