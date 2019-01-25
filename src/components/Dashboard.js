import React, { Component } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import Category from './Category'
import DropDown from './DropDown'
import { changeOrder } from '../actions/listFilter'

class Dashboard extends Component {

  changeOrder = (order) => {
    const { dispatch } = this.props
    dispatch(changeOrder({
      order
    }))
  }

  render() {
    return (
      <div>
        <div className='dashboard-list'>
          <h3 className='center'>Categories</h3>
          {this.props.categories.map((cat) => (
            <Category key={cat.name} category={cat}/>
          ))}
        </div>
        <h3 className='center'>Your Timeline</h3>
        <DropDown changeOrder={this.changeOrder}/>
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

function mapStateToProps ({ posts, categories, listFilter }) {
  if (listFilter.order === 'time') {
    posts = posts.sort((a,b) =>
    b.timestamp - a.timestamp
  )
} else if (listFilter.order === 'score'){
  posts = posts.sort((a,b) =>
  b.voteScore - a.voteScore
)
}
return {
  categories,
  posts
}
}

export default connect(mapStateToProps)(Dashboard)
