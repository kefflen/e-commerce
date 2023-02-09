import QueryString from 'qs'

type queryField =
  | string
  | QueryString.ParsedQs
  | string[]
  | QueryString.ParsedQs[]
  | undefined

export function buildSortings(sortBy: queryField, sortByDesc: queryField) {
  const sortings: { [k: string]: 1 | -1 } = {}

  if (sortBy) {
    let sortByField: string[] | QueryString.ParsedQs[] = []

    if (typeof sortBy === 'string') {
      sortByField = sortBy.split(',')
    } else if (Array.isArray(sortBy)) {
      sortByField = sortBy
    }

    for (const fieldQuery of sortByField) {
      const field = String(fieldQuery).toLowerCase()
      sortings[field] = 1
    }
  }

  if (sortByDesc) {
    let sortByField: string[] | QueryString.ParsedQs[] = []

    if (typeof sortByDesc === 'string') {
      sortByField = sortByDesc.split(',')
    } else if (Array.isArray(sortByDesc)) {
      sortByField = sortByDesc
    }

    for (const fieldQuery of sortByField) {
      const field = String(fieldQuery).toLowerCase()
      sortings[field] = -1
    }
  }

  return sortings
}
