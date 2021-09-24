export const auto = [
  {
    keyword: 'car hire',
    url: 'https://www.avis.com',
    page: 1,
    rank: 1
  },
  {
    keyword: 'car rental',
    url: 'https://www.budget.com',
    rank: 1,
    page: 2
  },
  {
    keyword: 'car hire',
    url: 'https://www.hertz.com',
    page: 2,
    rank: 3
  }
]

export const renames = [
  {
    position: 1,
    TF: 100
  },
  {
    position: 2,
    TF: 140
  },
  {
    position: 3,
    TF: 20
  },
  {
    position: 1,
    TF: 10
  }
]

export const full = [
  {
    type: 'B',
    domain: 'duckduckgo.com',
    TE: 1000,
    TF: 30
  },
  {
    type: 'A',
    domain: 'duckduckgo.com',
    TE: 2000,
    TF: 30
  },
  {
    type: 'A',
    domain: 'duckduckgo.com',
    TE: 3000,
    TF: 30
  },
  {
    type: 'A',
    domain: 'google.com',
    TE: 100,
    TF: 42
  },
  {
    type: 'A',
    domain: 'google.com',
    TE: 200,
    TF: 42
  }
]

export const empty = [
  {
    position: 1,
    keyword: ''
  },
  {
    position: 2,
    keyword: 'foo'
  },
  {
    position: 3,
    keyword: 'bar'
  },
  {
    position: 1,
    keyword: 'hey'
  }
]
