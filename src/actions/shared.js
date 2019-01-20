import { getPosts, getCategories } from '../utils/api'
import { receivePosts } from '../actions/posts'
import { receiveCategories } from '../actions/categories'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {

  return (dispatch) => {
    dispatch(showLoading())
    return getPosts()
      .then((posts) => {
        return dispatch(receivePosts(posts))
      }).then(() => {
        return getCategories()
      }).then((categories) => {
        dispatch(receiveCategories(categories.categories))
        dispatch(hideLoading())
      })
  }
}
