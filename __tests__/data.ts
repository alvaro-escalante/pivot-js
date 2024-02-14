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

export const unique = [
  {
    type: 'Art',
    position: 1,
    url: 'google.com'
  },
  {
    type: 'Art',
    position: 2,
    url: 'google.co.uk'
  },
  {
    type: 'Art',
    position: 3,
    url: 'google.es'
  },
  {
    type: 'Unique',
    position: 5,
    url: 'example.com'
  },
  {
    type: 'Unique',
    position: 6,
    url: 'example.com'
  }
]

export const totals = [
  {
    'Requested URL': 'https://www.cewe.co.uk/',
    'Final URL': 'https://www.cewe.co.uk/',
    Redirected: 'FALSE',
    LCP: 1711,
    CLS: 0.1,
    INP: 361,
    FID: 19,
    FCP: 1387,
    TTFB: 578,
    Date: '2024-02-13',
    'Page Type': 'N/A'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/photo-printing/photo-prints.html',
    'Final URL': 'https://www.cewe.co.uk/photo-printing/photo-prints.html',
    Redirected: 'FALSE',
    LCP: 1784,
    CLS: 0.09,
    INP: 247,
    FID: 16,
    FCP: 1145,
    TTFB: 359,
    Date: '2024-02-13',
    'Page Type': 'N/A'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/service/contact.html',
    'Final URL': 'https://www.cewe.co.uk/service/contact.html',
    Redirected: 'FALSE',
    LCP: 1604,
    CLS: 0.05,
    INP: 'nodata',
    FID: 'nodata',
    FCP: 934,
    TTFB: 185,
    Date: '2024-02-13',
    'Page Type': 'N/A'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/service/faqs.html',
    'Final URL': 'https://www.cewe.co.uk/service/faqs.html',
    Redirected: 'FALSE',
    LCP: 1356,
    CLS: 0,
    INP: 'nodata',
    FID: 'nodata',
    FCP: 1044,
    TTFB: 'nodata',
    Date: '2024-02-13',
    'Page Type': 'N/A'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/service/order-status.html',
    'Final URL': 'https://www.cewe.co.uk/service/order-status.html',
    Redirected: 'FALSE',
    LCP: 1430,
    CLS: 0.01,
    INP: 214,
    FID: 18,
    FCP: 1346,
    TTFB: 529,
    Date: '2024-02-13',
    'Page Type': 'N/A'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/service/price-list.html',
    'Final URL': 'https://www.cewe.co.uk/service/price-list.html',
    Redirected: 'FALSE',
    LCP: 1686,
    CLS: 0,
    INP: 'nodata',
    FID: 'nodata',
    FCP: 618,
    TTFB: 122,
    Date: '2024-02-13',
    'Page Type': 'N/A'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/shop-by-theme/photo-yearbooks.html',
    'Final URL': 'https://www.cewe.co.uk/shop-by-theme/photo-yearbooks.html',
    Redirected: 'FALSE',
    LCP: 2640,
    CLS: 0.02,
    INP: 'nodata',
    FID: 'nodata',
    FCP: 1596,
    TTFB: 724,
    Date: '2024-02-13',
    'Page Type': 'N/A'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/photo-books/large-landscape-photo-book.html',
    'Final URL': 'https://www.cewe.co.uk/photo-books/large-landscape-photo-book.html',
    Redirected: 'FALSE',
    LCP: 1499,
    CLS: 0.09,
    INP: 243,
    FID: 14,
    FCP: 909,
    TTFB: 202,
    Date: '2024-02-13',
    'Page Type': 'Photo books'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/photo-books/large-portrait-photo-book.html',
    'Final URL': 'https://www.cewe.co.uk/photo-books/large-portrait-photo-book.html',
    Redirected: 'FALSE',
    LCP: 1620,
    CLS: 0.09,
    INP: 296,
    FID: 15,
    FCP: 999,
    TTFB: 306,
    Date: '2024-02-13',
    'Page Type': 'Photo books'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/photo-books/small-square-photo-book.html',
    'Final URL': 'https://www.cewe.co.uk/photo-books/small-square-photo-book.html',
    Redirected: 'FALSE',
    LCP: 1935,
    CLS: 0.09,
    INP: 253,
    FID: 'nodata',
    FCP: 1372,
    TTFB: 443,
    Date: '2024-02-13',
    'Page Type': 'Photo books'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/photo-books/square-photo-book.html',
    'Final URL': 'https://www.cewe.co.uk/photo-books/square-photo-book.html',
    Redirected: 'FALSE',
    LCP: 1269,
    CLS: 0.09,
    INP: 257,
    FID: 16,
    FCP: 663,
    TTFB: 135,
    Date: '2024-02-13',
    'Page Type': 'Photo books'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/photo-books/xxl-landscape-photo-book.html',
    'Final URL': 'https://www.cewe.co.uk/photo-books/xxl-landscape-photo-book.html',
    Redirected: 'FALSE',
    LCP: 1342,
    CLS: 0.01,
    INP: 'nodata',
    FID: 'nodata',
    FCP: 867,
    TTFB: 162,
    Date: '2024-02-13',
    'Page Type': 'Photo books'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/photo-gifts.html',
    'Final URL': 'https://www.cewe.co.uk/photo-gifts.html',
    Redirected: 'FALSE',
    LCP: 1291,
    CLS: 0.02,
    INP: 320,
    FID: 18,
    FCP: 1142,
    TTFB: 433,
    Date: '2024-02-13',
    'Page Type': 'Photo gifts'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/wall-art.html',
    'Final URL': 'https://www.cewe.co.uk/wall-art.html',
    Redirected: 'FALSE',
    LCP: 1600,
    CLS: 0.09,
    INP: 327,
    FID: 18,
    FCP: 1003,
    TTFB: 339,
    Date: '2024-02-13',
    'Page Type': 'Wall art'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/wall-art/canvas-prints.html',
    'Final URL': 'https://www.cewe.co.uk/wall-art/canvas-prints.html',
    Redirected: 'FALSE',
    LCP: 1514,
    CLS: 0.1,
    INP: 210,
    FID: 22,
    FCP: 919,
    TTFB: 180,
    Date: '2024-02-13',
    'Page Type': 'Wall art'
  },
  {
    'Requested URL': 'https://www.cewe.co.uk/wall-art/premium-poster.html',
    'Final URL': 'https://www.cewe.co.uk/wall-art/premium-poster.html',
    Redirected: 'FALSE',
    LCP: 1421,
    CLS: 0.09,
    INP: 219,
    FID: 14,
    FCP: 991,
    TTFB: 238,
    Date: '2024-02-13',
    'Page Type': 'Wall art'
  }
]
