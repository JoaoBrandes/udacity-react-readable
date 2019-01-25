import { CHANGE_ORDER } from './types'
export function changeOrder (order) {
  return {
    type: CHANGE_ORDER,
    order,
  }
}
