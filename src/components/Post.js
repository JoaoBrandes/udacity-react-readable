import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'
import { handleDeletePost, handleUpvotePost, handleDownvotePost } from '../actions/posts'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'

class Post extends Component {

  handleUpVote = (e) => {
    e.preventDefault()
    const { post, dispatch, voteCallback } = this.props
    const { voteScore } = post
    post.voteScore = voteScore + 1
    dispatch(handleUpvotePost(post))
    if (voteCallback !== undefined) {
      voteCallback()
    }
  }

  handleDownVote = (e) => {
    e.preventDefault()
    const { post, dispatch, voteCallback } = this.props
    const { voteScore } = post
    post.voteScore = voteScore - 1
    dispatch(handleDownvotePost(post))
    if (voteCallback !== undefined) {
      voteCallback()
    }
  }

  handleEdit = (e) => {
    e.preventDefault()
    const { post, history } = this.props
    history.push(`/edit/posts/${post.id}`)
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { post, dispatch, history } = this.props
    dispatch(handleDeletePost(post))

    history.push('/')
  }

  render() {
    const { post } = this.props
    const {
      id, timestamp, title, body, author, category, voteScore
    } = post

    return (
      <Link to={`/posts/${id}`} className='post'>
        <div >
          <div>
            <div className='post-info'>
              <span>{title}</span>
              <div>{formatDate(timestamp)}</div>
              <span>Author {author}, Category: {category}</span>
              <p>{body}</p>
            </div>
            <div>
              <button onClick={this.handleEdit}>Edit</button>
              <button onClick={this.handleDelete}>Delete</button>

            </div>
          </div>
          <div className='post-icons'>
            <span>Score: {voteScore}</span>
            <button className="heart-button" onClick={this.handleUpVote}>
              <MdArrowUpward className='post-icon'  />
            </button>
            <button className="heart-button" onClick={this.handleDownVote}>
              <MdArrowDownward className='post-icon' />
            </button>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({ posts }, { post, voteCallback }) {
  return {
    post,
    voteCallback
  }
}

export default withRouter(connect(mapStateToProps)(Post))
