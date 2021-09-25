export const mean = (arr: number[]) => {
  return arr.reduce((total, num) => total + num) / arr.length
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
