import QueryString from 'qs'
import { AppError } from '../../domain/errors/AppError'

export function buildFindQuery(query: QueryString.ParsedQs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const findQuery: { [k: string]: any } = {}

  for (const queryKey in query) {
    if (queryKey.startsWith('-') || queryKey.startsWith('+')) {
      const [prefix, ...rest] = queryKey
      const key = rest.join('').toLowerCase()
      const value = query[queryKey]

      if (typeof findQuery[key] === 'string')
        throw AppError.badRequest('Invalid search query')

      if (!findQuery[key]) {
        findQuery[key] = {}
      }

      if (prefix === '-') {
        findQuery[key] = {
          ...findQuery[key],
          $lte: value,
        }
      } else if (prefix === '+') {
        findQuery[key] = {
          ...findQuery[key],
          $gte: value,
        }
      }
    } else {
      if (typeof findQuery[queryKey] === 'object')
        throw AppError.badRequest('Invalid search query')
      findQuery[queryKey] = String(query[queryKey]).toLowerCase()
    }
  }

  return findQuery
}
