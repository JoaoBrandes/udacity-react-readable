import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Category from './Category'
import { withRouter } from 'react-router-dom'

class CategoryList extends Component {
  render() {
    return (
      <div>
        <div className='dashboard-list'>
          <h3  className='center'>Categories</h3>
          {this.props.categories.map((cat) => (
              <Category key={cat.id} category={cat}/>
          ))}
        </div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
          {this.props.posts.map((post) => (
            <li key={post.id}>
              <Post post={post}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories }, props) {
  const { category } = props.match.params

  return {
    categories: categories,
    posts: posts
      .filter((a) => a.category === category)
      .sort((a,b) => b.timestamp - a.timestamp)
  }
}

export default withRouter(connect(mapStateToProps)(CategoryList))
