import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, getPostDetailsFromServer, getCommentDetailsFromServer } from '../utils/api'
import { generateUID } from '../utils/helpers'
import { Redirect } from 'react-router-dom'
import * as actions from '../actions/posts'

class NewPost extends Component {
  state = {
    body: '',
    author: '',
    title: '',
    category: 'react',
    toHome: false,
    post: {}
  }

  componentDidMount () {
    const { postId, isEditing, isComment } = this.props
    if (isEditing === true) {
      if (isComment) {
        getCommentDetailsFromServer(postId).then((comment) => {
          this.setState((currState) => ({
            ...currState,
            id: postId,
            body: comment.body,
            category: comment.category,
            author: comment.author,
            post: comment
          }))
        })
      } else {
        getPostDetailsFromServer(postId).then((post) => {
          this.setState((currState) => ({
            ...currState,
            id: postId,
            body: post.body,
            category: post.category,
            title: post.title,
            author: post.author,
            post
          }))
        })
      }
    }

  }

  handleBodyChange = (e) => {
    const body = e.target.value

    this.setState((currState) => ({
      ...currState,
      body
    }))
  }

  handleAuthorChange = (e) => {
    const author = e.target.value

    this.setState((currState) => ({
      ...currState,
      author
    }))
  }

  handleTitleChange = (e) => {
    const title = e.target.value

    this.setState((currState) => ({
      ...currState,
      title
    }))
  }

  handleCategoryChange = (e) => {
    const category = e.target.value
    this.setState((currState) => ({
      ...currState,
      category
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { parentPost, isEditing } = this.props
    if (parentPost !== undefined) {
      this.addComment()
    } else {
      if (isEditing) {
        this.editPost()
      } else {
        this.addNewPost()
      }
    }
  }

  editPost() {
    const { isComment } = this.props
    const { body, title, post } = this.state
    post.body = body
    if (!isComment) {
      post.title = title
      this.props.handleEditPost(post)
    } else {
      post.timestamp = new Date()
      this.props.handleEditComment(post)
    }

    this.setState(() => ({
      body: '',
      author: '',
      category: 'react',
      toHome: true
    }))
  }

  addNewPost() {
    const { body, author, category, title } = this.state
    const newPost = {
      id: generateUID(),
      timestamp: new Date(),
      title,
      body,
      author,
      category,
      voteScore: 1
    }

    this.props.handleAddPost(newPost)

    this.setState(() => ({
      body: '',
      author: '',
      category: 'react',
      toHome: true
    }))
  }

  addComment() {
    const { body, author } = this.state
    const { parentPost } = this.props
    const newComment = {
      id: generateUID(),
      timestamp: new Date(),
      body,
      author: author,
      parentId: parentPost,
      voteScore: 1
    }
    this.props.addNewComment(newComment)

    addComment(newComment).then(() => {
      this.setState(() => ({
        body: '',
        author: '',
        category: 'react',
        toHome: false
      }))
    })
  }

  render() {
    const { body, author, title, toHome, post } = this.state
    const { parentPost, categories, isEditing, isComment } = this.props
    if (toHome === true) {
      if (isComment) {
        return <Redirect to={`/posts/${post.parentId}`} />
      }
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3 className='center'>{isEditing ? 'Edit post': 'Add new Post'}</h3>
        <div className='center'>
          {parentPost === undefined && !isComment &&
            categories.map((category) => (
              <span key={category.name}>
                <input type="radio"
                  value={category.name}
                  disabled={isEditing}
                  checked={this.state.category === category.name}
                  onChange={this.handleCategoryChange} />{category.name}</span>
              ))
            }
          </div>
          <form className='new-post' onSubmit={this.handleSubmit}>

            <input
              type="text"
              placeholder="Your Name"
              value={author}
              disabled={isEditing}
              onChange={this.handleAuthorChange}

              />
            {parentPost === undefined && !isComment &&
              <input
                type="text"
                placeholder="Title"
                value={title}

                onChange={this.handleTitleChange}
                />
            }
            <textarea
              placeholder= {parentPost === undefined ? "Your Post" : "Your comment"}
              value={body}
              onChange={this.handleBodyChange}
              className='textarea'
              />

            <button
              className='btn'
              type='submit'
              disabled={body === ''}>
              Submit
            </button>
          </form>
        </div>
      )
    }
  }

  function mapStateToProps ({ categories }, props) {
    var postId = 0
    var isComment = false
    if (props.parentPost === undefined ) {
      const { id } = props.match.params
      if (id !== undefined) {
        postId = id
        if (props.match.path.includes("comments")) {
          isComment = true
        }
      }
    }
    return {
      categories,
      postId,
      isEditing: postId !== 0,
      isComment
    }
  }



  export default connect(mapStateToProps, actions)(NewPost)
