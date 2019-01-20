import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { withRouter } from 'react-router-dom'
import { handleUpvoteComment, handleDownvoteComment } from '../actions/posts'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'

class Comment extends Component {

  handleUpVote = (e) => {
    e.preventDefault()
    const { comment, dispatch, voteCallback } = this.props
    const { voteScore } = comment
    comment.voteScore = voteScore + 1
    dispatch(handleUpvoteComment(comment))
    if (voteCallback !== undefined) {
      voteCallback(comment)
    }
  }

  handleDownVote = (e) => {
    e.preventDefault()
    const { comment, dispatch, voteCallback } = this.props
    const { voteScore } = comment
    comment.voteScore = voteScore - 1
    dispatch(handleDownvoteComment(comment))
    if (voteCallback !== undefined) {
      voteCallback(comment)
    }
  }

  handleEdit = (e) => {
    e.preventDefault()
    const { history, comment } = this.props
    history.push(`/edit/comments/${comment.id}`)
  }

  handleDelete = (e) => {
    e.preventDefault()
    const { removeComment, comment } = this.props
    removeComment(comment)
  }

  render() {
    const { comment } = this.props

    const {
      timestamp, title, body, author, voteScore
    } = comment

    return (
        <div className='post-info'>
          <div>
            <span>{title}</span>
            <div>{formatDate(timestamp)}</div>
            <span>Author {author}</span>
            <p>{body}</p>
          </div>
          <div>
            <button onClick={this.handleEdit}>Edit</button>
            <button onClick={this.handleDelete}>Delete</button>
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
    )
  }
}

function mapStateToProps ({ posts }, { comment, voteCallback }) {
  return {
    comment,
    voteCallback
  }
}

export default withRouter(connect(mapStateToProps)(Comment))
