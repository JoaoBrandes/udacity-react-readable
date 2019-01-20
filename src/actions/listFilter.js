export const CHANGE_ORDER = 'CHANGE_ORDER'

export function changeOrder (order) {
  return {
    type: CHANGE_ORDER,
    order,
  }
}
