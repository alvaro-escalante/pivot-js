type Entries = {
  [key: string]: string | number
}

type AggFunc = {
  [key: string]: string
}

interface StoreNested {
  type: string
  value?: number
  colection?: number[]
  title?: string
}

type Store = {
  [key: string]: StoreNested
}

interface HashNested {
  type: string
  name: string
}

type TotalHash = {
  [key: string]: HashNested
}
