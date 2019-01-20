import { CHANGE_ORDER } from '../actions/listFilter'

export default function listFilter (state = {order:'score'}, action) {
  switch(action.type) {
    case CHANGE_ORDER :
        return {
          ...state,
          ...action.order
        }
    default :
      return state
  }
}
