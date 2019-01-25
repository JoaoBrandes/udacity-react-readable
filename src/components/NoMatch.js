import React, { Component } from 'react'
import { connect } from 'react-redux'

class NoMatch extends Component {

  render() {
    return (
      <h3>Error 404: this page does not exist</h3>
    )
  }
}

export default connect()(NoMatch)
