import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import posts from './posts'
import categories from './categories'
import listFilter from './listFilter'

export default combineReducers({
  posts,
  categories,
  listFilter,
  loadingBar: loadingBarReducer,
})
