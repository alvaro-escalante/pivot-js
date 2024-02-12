export const mean = (arr: (number | string | null)[]): number => {
  // Filter out nulls and non-numeric values, then only keep numbers
  const cleanArray = arr.filter(
    (val): val is number => typeof val === 'number' && !isNaN(val)
  )

  // Calculate the sum of the numeric values if any
  const sum = cleanArray.reduce((total, num) => total + num, 0)

  // Calculate the mean, divide by length only if cleanArray is not empty
  const average =
    cleanArray.length > 0 ? parseFloat((sum / cleanArray.length).toFixed(3)) : 0

  return average
}

export const median = (arr: number[]) => {
  const mid = Math.floor(arr.length / 2)
  const nums = [...arr].sort((a, b) => a - b)
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}

export const mode = (arr: number[]) => {
  let max = 0

  const freq = Object.fromEntries(
    arr.reduce((mapper, entry) => {
      mapper.set(entry, (mapper.get(entry) || 0) + 1)
      if (mapper.get(entry) > max) max = mapper.get(entry)

      return mapper
    }, new Map())
  )

  return Object.keys(freq)
    .filter((key) => freq[key] === max)
    .join('|')
}

export const caps = (el: string) => {
  return el.charAt(0).toUpperCase() + el.slice(1)
}

export const coerceType = (entry: number | string) => {
  if (typeof entry === 'number') return entry
  const parsedEntry = parseFloat(entry)
  return !isNaN(parsedEntry) ? parsedEntry : entry
}
