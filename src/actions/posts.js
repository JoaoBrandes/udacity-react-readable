import { addPostToServer, deletePostFromServer,
  deleteCommentFromServer, editPostToServer, editCommentToServer,
  votePost, voteComment } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

function editPost (post) {
  return {
    type: EDIT_POST,
    post,
  }
}

function deletePost (post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function handleEditPost (post) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return editPostToServer(post)
      .then(() => dispatch(editPost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleEditComment (comment) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return editCommentToServer(comment)
      .then(() => dispatch(hideLoading()))
  }
}

export function handleAddPost (post) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return addPostToServer(post)
      .then(() => dispatch(addPost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleDeletePost (post) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return deletePostFromServer(post)
      .then(() => dispatch(deletePost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleUpvotePost (post) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return votePost(post.id, {option: "upVote"})
      .then(() => dispatch(editPost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleDownvotePost (post) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return votePost(post.id, {option: "downVote"})
      .then(() => dispatch(editPost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleUpvoteComment (comment) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return voteComment(comment.id, {option: "upVote"})
      // .then(() => dispatch(editPost(comment)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleDownvoteComment (comment) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return voteComment(comment.id, {option: "downVote"})
      // .then(() => dispatch(editPost(comment)))
      .then(() => dispatch(hideLoading()))
  }
}


export function handleDeleteComment (comment) {
  return (dispatch, getState) => {
    dispatch(showLoading())
    return deleteCommentFromServer(comment)
      .then(() => dispatch(hideLoading()))
  }
}

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}
