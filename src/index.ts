// Function to detect if the index is string to order array
function assertIsString(value: string | number): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Expected a string, but got ${typeof value}`)
  }
}
// Pivot table function
export function Pivot(
  data: Entries[],
  index: string,
  aggregate: AggFunc,
  renames: string[] = []
) {
  let counter: number = 0
  const store: Store = {}
  const totalHash: TotalHash = {}
  const order: Entries[] = data.sort((a, b) => {
    const avalue = a[index]
    const bvalue = b[index]
    assertIsString(avalue)
    assertIsString(bvalue)

    return avalue.localeCompare(bvalue)
  })

  const missing = Object.keys(aggregate).find(
    (entry) => !Object.keys(data[0]).includes(entry)
  )

  if (missing) {
    throw Error(`${missing} does not exists`)
  }

  if (!Object.values(aggregate).includes('counter')) {
    aggregate[index] = 'counter'
  }

  // Calculate pivots
  const pivots = order.reduce((acc, row) => {
    // Collect data for pivots
    for (const [name, type] of Object.entries(aggregate)) {
      // Add count per each row

      if (type === 'display') {
        store[name] = { type, value: row[name] }
        continue
      }

      if (type === 'counter') {
        store[name] = { type }
        counter = !acc.has(row[index]) ? 1 : counter + 1
        continue
      }

      if (['min', 'max'].includes(type)) {
        if (!acc.has(row[index])) {
          store[name] = { type, value: [] }
          store[name].value.push(row[name])
        } else {
          store[name].value.push(...store[name].value, row[name])
        }
        continue
      }

      // Aggregation is sum
      store[name] = {
        type,
        value: !acc.has(row[index]) ? row[name] : store[name].value + row[name]
      }
    }

    // Add the data as 'required table'
    const aggregateObj: Entries = {}

    for (const [index, [name, type]] of Object.entries(aggregate).entries()) {
      const id = renames[index + 1] ?? name
      totalHash[id] = { type, name }

      // If counter just add it
      if (type === 'counter') {
        aggregateObj[id] = counter
        continue
      }

      // If is mean divided by exisiting counter on stored column
      if (type === 'mean') {
        aggregateObj[id] = store[name].value / counter
        continue
      }

      // If min/max run Math on array on stored column
      if (['min', 'max'].includes(type)) {
        const val: number[] = store[name].value
        aggregateObj[id] = type === 'min' ? Math.min(...val) : Math.max(...val)
        continue
      }

      // If sum add the stored value for that column
      aggregateObj[id] = store[name].value
    }

    // Add default name to first entry or use renames array
    let indexID = renames.length ? renames[0] : 'index'

    // Set table and spread aggregate calcs
    acc.set(row[index], {
      [indexID]: row[index],
      ...aggregateObj
    })

    return acc
  }, new Map())

  const table = [...pivots.values()]

  // Calculate totals

  // Get names of posibly renamed columns
  const headers: string[] = Object.keys(table[0])
  // Remove the first one
  const first: string = headers.splice(0, 1)[0]

  const totals: Totals = {}
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

    // For min/max use tabled results
    if (['min', 'max'].includes(item.type)) {
      totals[header] = data.reduce((acc, curr) => {
        const evaluation = item.type === 'min' ? acc < curr[value] : acc > curr[value]
        return acc !== 0 && evaluation ? acc : curr[value]
      }, 0)

      continue
    }

    if (item.type === 'display') {
      totals[header] = '-'
      continue
    }

    // For sum use tabled results
    totals[header] = table.reduce((acc, curr) => acc + curr[header], 0)
  }

  // Add totals to pivot table
  table.push(totals)

  return table
}
