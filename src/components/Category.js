import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Category extends Component {

  render() {
    const { category } = this.props

    const { name, path } = category

    return (
      <Link to={`/categories/${path}`} className='category'>
        <span>{name}</span>
      </Link>
    )
  }
}

function mapStateToProps ({ categories }, { category }) {
  return {
    category
  }
}

export default withRouter(connect(mapStateToProps)(Category))
