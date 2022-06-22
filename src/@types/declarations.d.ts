type Entries = {
  [key: string]: string | number | Array<number | string | undefined>
}

type Store = {
  [key: string]: Entries
}

type AggFunc = {
  [key: string]: string | string[]
}

interface StoreNested {
  [key: string]: number | string | Array<number | string | undefined>
  title?: string
}
type AggregateObj = {
  [key: string]: number | string | Array<number | string | undefined>
}

interface HashNested {
  type: string
  name: string
}

type TotalHash = {
  [key: string]: HashNested
}
