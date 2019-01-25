import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import CategoryList from './CategoryList'
import PostDetails from './PostDetails'
import NewPost from './NewPost'
import NoMatch from './NoMatch'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              :
                  <div>
                    <Switch>
                      <Route path='/' exact component={Dashboard} />
                      <Route path='/categories/:category' exact component={CategoryList} />
                      <Route path='/posts/:id' exact component={PostDetails} />
                      <Route path='/new' exact component={NewPost} />
                      <Route path='/edit/posts/:id' exact component={NewPost} />
                      <Route path='/edit/comments/:id' exact component={NewPost} />
                      <Route path='/edit/comments/:id' exact component={NewPost} />
                      <Route path='/error' exact component={NoMatch} />
                      <Route component={NoMatch} />
                    </Switch>
                  </div>


              }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    loading: posts === null
  }
}

export default connect(mapStateToProps)(App)
