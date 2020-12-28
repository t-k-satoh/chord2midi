import { ParsedUrlQuery } from 'querystring'
import { Query } from '../../../../types'

export const generateUrlQuery = (query: ParsedUrlQuery): Partial<Query> => {
  const tempQuery: Partial<Query> = {}

  Object.entries(query).forEach((entry) => {
    const key = entry[0]
    const value = entry[1]

    tempQuery[key] = value
  })

  return tempQuery
}
