import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { getPostComments, getPostDetailsFromServer } from '../utils/api'
import Comment from './Comment'
import Post from './Post'
import { handleDeleteComment } from '../actions/posts'
import NewPost from './NewPost'

class PostDetails extends Component {

  constructor() {
    super();

    this.state = {
      post: {},
      commentList: [],
      toError: false
    };

  }

  componentDidMount () {
    const { postId } = this.props
    getPostDetailsFromServer(postId).then((post) => {
      if (post.id === undefined) {
        this.setState(() => ({
          toError: true
        }))
      } else {
        this.setState(() => ({
          post
        }))
      }
    })
    getPostComments(postId).then((comments) => {
      this.setState(() => ({
        commentList: comments
      }))
    })
  }

  addNewComment = (comment) => {
    this.setState((currState) => ({
      commentList: currState.commentList.concat(comment)
    }))
  }

  votePostCallback = () => {
    const { post } = this.state
    this.setState(() => ({
      post
    }))
  }

  voteCommentCallback = (comment) => {
    this.setState((currState) => ({
      commentList: currState.commentList.map((c) => {
        if (c.id !== comment.id) {
          return c
        }
        return comment
      })
    }))
  }

  removeComment = (comment) => {
    const { dispatch } = this.props
    dispatch(handleDeleteComment(comment))
    this.setState((currState) => ({
      commentList: currState.commentList.filter((c) => c.id !== comment.id)
    }))
  }

  _doRender() {
    return (
      <div>
        <Post post={post} voteCallback={this.votePostCallback}/>
        <NewPost parentPost={post.id} addNewComment={this.addNewComment} />
        {commentList.length !== 0 && <h3 className='center'>Comments</h3>}
        <ul>
          {commentList.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} voteCallback={this.voteCommentCallback} removeComment={this.removeComment}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const { post, commentList, toError } = this.state
    if (toError === true) {
      return <Redirect to='/error' />
    }
    return (
      <Fragment>
        {post.id !== undefined &&
          _doRender()
        }
      </Fragment>

    )
  }
}


function mapStateToProps ({ posts }, props) {
  const { id } = props.match.params
  return {
    postId: id
  }

}

export default withRouter(connect(mapStateToProps)(PostDetails))
