type Entries = {
  [key: string]: string | number
}

type AggFunc = {
  [key: string]: string
}

interface StoreDeep {
  type: string
  value?: any
}

type Store = {
  [key: string]: StoreDeep
}

type TotalHash = {
  [key: string]: any
}

type Totals = {
  [key: string]: string | number
}
