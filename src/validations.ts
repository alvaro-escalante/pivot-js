import { coerceType } from './utils'

export const checkData = (data: Entries[]) => {
  if (!data.length) {
    throw new Error(
      'The array is empty please make sure it includes the objects to pivot with'
    )
  }
}

// Check there is an index coliumn
export const checkIndex = (index: string, data: Entries) => {
  if (!index.length) {
    throw new ReferenceError(
      `Missing second argument "index", please provide a string to identify the index column.`
    )
  }

  const isIndex = Object.keys(data).includes(index)

  if (!isIndex) {
    throw new ReferenceError(`The index column "${index}" does not exists.`)
  }
}

// Check there is at least one aggregate function
export const checkOptions = (aggregate: AggFunc) => {
  if (!Object.keys(aggregate).length) {
    throw new ReferenceError(
      `No options provided for the 3 argument, please provide at least one aggregate function.`
    )
  }
}

// Find wrong columns on aggregate obj keys
export const checkAggKeys = (aggregate: AggFunc, main: string[]) => {
  const missing = Object.keys(aggregate).find((entry) => !main.includes(entry))

  if (missing) {
    throw new ReferenceError(`"${missing}" does not exists.`)
  }
}

// Find wrong function for type of column
export const checkAggType = (aggregate: AggFunc, data: Entries) => {
  type PropTypes = {
    key?: string
    inclusion?: string
  }

  let property: PropTypes = {}

  for (const [key, value] of Object.entries(aggregate)) {
    const mode = Object.values([value]).flat()

    const inclusion = mode.find(
      (entry) => !['count', 'counta', 'mode', 'mean'].includes(entry)
    )

    // Convert to string if possible if not then send error
    if (typeof coerceType(data[key] as string | number) === 'string' && inclusion) {
      property = { key, inclusion }
    }
  }

  if (Object.keys(property).length) {
    throw new TypeError(
      `The aggregate function "${property?.inclusion}" cannot be used on the column "${property.key}" because it's a string.`
    )
  }
}

// Find wrong aggregate functions on aggregate obj values
export const checkAggValues = (aggregate: AggFunc, aggValues: string[]) => {
  const values = Object.values(aggregate).flat()
  const missing = values.find((val) => !aggValues.includes(val)) ?? ''

  if (missing) {
    throw new ReferenceError(
      `Incorrect aggregate function "${missing}". Allowed functions are ${aggValues.join(
        ', '
      )}.`
    )
  }
}

// Check rename function has enough items
export const checkRenames = (aggregate: AggFunc, rename: string[]) => {
  if (rename.length) {
    const columnNumber = Object.values(aggregate).flat().length + 1
    const missing = columnNumber !== rename.length
    if (missing) {
      throw new TypeError(
        `There should be "${columnNumber}" entries on the rename array, only "${rename.length}" defined, make sure the index is also included.`
      )
    }
  }
}
