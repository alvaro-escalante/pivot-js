// Function to detect if the index is string to order array
function assertIsString(value: string | number): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(`Expected a string, but got ${typeof value}`)
  }
}

// Pivot table function
export default (
  data: Entries[],
  index: string,
  aggregate: AggFunc,
  renames: string[] = []
) => {
  // Set starting variables
  let counter: number = 0
  const store: Store = {}
  const totalHash: TotalHash = {}
  // Order array by column index passed
  const order: Entries[] = data.sort((a, b) => {
    const avalue = a[index]
    const bvalue = b[index]
    assertIsString(avalue)
    assertIsString(bvalue)

    return avalue.localeCompare(bvalue)
  })

  // Find columns on data array, expose if not present
  const missing = Object.keys(aggregate).find(
    (entry) => !Object.keys(data[0]).includes(entry)
  )

  if (missing) {
    throw Error(`${missing} does not exists`)
  }

  // Add counter if none has been passed explicitly
  if (!Object.values(aggregate).includes('counter')) aggregate[index] = 'counter'

  // Calculate pivots
  const pivots = order.reduce((acc, row) => {
    // Collect data for pivots
    for (const [name, type] of Object.entries(aggregate)) {
      switch (type) {
        case 'display':
          store[name] = { type, title: row[name] as string }
          break
        case 'counter':
          store[name] = { type, value: counter }
          counter = !acc.has(row[index]) ? 1 : counter + 1
          break
        case 'min':
        case 'max':
          if (!acc.has(row[index])) store[name] = { type, minmax: [] }
          store[name].minmax.push(row[name])
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

    for (const [index, [name, type]] of Object.entries(aggregate).entries()) {
      const id = renames[index + 1] ?? name
      totalHash[id] = { type, name }

      switch (type) {
        case 'display':
          aggregateObj[id] = store[name].title
          break
        case 'counter':
          aggregateObj[id] = counter
          break
        case 'mean':
          aggregateObj[id] = store[name].value / counter
          break
        case 'min':
          aggregateObj[id] = Math[type](...store[name].minmax)
          break
        default:
          aggregateObj[id] = store[name].value
          break
      }
    }

    // Add default name to first entry or use renames array
    let indexID = renames.length ? renames[0] : 'row'

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
