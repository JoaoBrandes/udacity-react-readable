import { RECEIVE_POSTS, ADD_POST,
  DELETE_POST, EDIT_POST } from '../actions/posts'

export default function posts (state = [], action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      return action.posts
    case ADD_POST :
      return state.concat([action.post])
    case EDIT_POST:
      return state.map((post) => {
        if (post.id === action.post.id) {
          post.body = action.post.body
          post.title = action.post.title
          post.voteScore = action.post.voteScore
        }
        return post
      })
    case DELETE_POST :
      return state.filter((post) => post.id !== action.post.id)
    default :
      return state
  }
}
