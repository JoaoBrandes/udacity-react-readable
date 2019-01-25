import { RECEIVE_CATEGORIES } from './types'
export function receiveCategories (categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }
}
