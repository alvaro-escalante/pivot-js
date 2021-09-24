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

// Find wrong function for type of column
export const checkAggType = (aggregate: AggFunc, data: Entries) => {
  const property =
    Object.entries(aggregate).find(
      ([key, value]) => typeof data[key] === 'string' && value !== 'count'
    ) ?? ''

  if (property.length) {
    throw new TypeError(
      `The aggregate function "${property[1]}" cannot be used on the column "${property[0]}" because it's a string.`
    )
  }
}

// Find wrong aggregate functions on aggregate obj values
export const checkAggValues = (aggregate: AggFunc, aggValues: string[]) => {
  const missing =
    Object.values(aggregate).find(
      (val) => !aggValues.some((entry) => entry.includes(val))
    ) ?? ''

  if (missing) {
    throw new ReferenceError(
      `Incorrect aggregate function "${missing}". Allowed functions are ${aggValues.join(
        ', '
      )}.`
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

// Check rename function has enough items
export const checkRenames = (aggregate: AggFunc, rename: string[]) => {
  if (rename.length) {
    const columnNumber = Object.keys(aggregate).length + 1
    const missing = columnNumber !== rename.length
    if (missing) {
      throw new TypeError(
        `There should be "${columnNumber}" entries on the rename array, only "${rename.length}" defined, make sure the index is also included.`
      )
    }
  }
}
