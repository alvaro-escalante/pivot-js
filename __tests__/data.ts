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
    page: 2,
    rank: 1
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

export const mean = [
  {
    keyword: 'N/A',
    meanValue: 19
  },
  {
    keyword: 'N/A',
    meanValue: 'nodata'
  }
]

export const median = [
  {
    page: 1,
    revenue: 100
  },
  {
    page: 1,
    revenue: 70
  },
  {
    page: 2,
    revenue: 140
  },
  {
    page: 3,
    revenue: 20
  },
  {
    page: 1,
    revenue: 10
  },
  {
    page: 2,
    revenue: 50
  }
]

export const mode = [
  {
    keyword: 'car hire',
    position: 1,
    url: 'google.com'
  },
  {
    keyword: 'car hire',
    position: 2,
    url: 'google.com'
  },
  {
    keyword: 'car hire',
    position: 1,
    url: 'example.com'
  }
]

export const dub = [
  {
    keyword: 'car hire',
    position: 1,
    url: 'google.com'
  },
  {
    keyword: 'car hire',
    position: 2,
    url: 'google.com'
  },
  {
    keyword: 'car hire',
    position: 1,
    url: 'example.com'
  }
]

export const readme = [
  {
    domain: 'duckduckgo.com',
    path: '/search',
    traffic: 15000,
    trustFlow: 30
  },
  {
    domain: 'duckduckgo.com',
    path: '/images',
    traffic: 8000,
    trustFlow: 20
  },
  {
    domain: 'google.com',
    path: '/search',
    traffic: 20000,
    trustFlow: 42
  },
  {
    domain: 'google.com',
    path: '/images',
    traffic: 10000,
    trustFlow: 38
  }
]

export const stringNumbers = [
  {
    domain: 'duckduckgo.com',
    path: '/search',
    traffic: '15000',
    trustFlow: 30
  },
  {
    domain: 'duckduckgo.com',
    path: '/images',
    traffic: '8000',
    trustFlow: 20
  },
  {
    domain: 'google.com',
    path: '/search',
    traffic: '20000',
    trustFlow: 42
  },
  {
    domain: 'google.com',
    path: '/images',
    traffic: '10000',
    trustFlow: 38
  }
]
