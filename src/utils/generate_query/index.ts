export const generateQuery = (params: Record<string, string>): string =>
  `?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')}`
