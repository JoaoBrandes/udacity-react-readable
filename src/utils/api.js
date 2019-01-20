const api = "http://localhost:3001"



const headers = {
  'Authorization': 'whatever-you-want'
}

export const getPosts = () => {
    return getAll('posts')
  }

export const getCategories = () => {
  return getAll('categories')
}

const getAll = (path) =>
  fetch(`${api}/${path}`, { headers })
    .then(response => response.json())
    .then(data => {
      return data
    }).catch((error) => {
      console.log("Something went wrong. ", error)
    })

export const getPostComments = (id) => {
  return fetch(`${api}/posts/${id}/comments`, { headers })
    .then(response =>
      response.json()
    ).then(data =>
      data
    ).catch((error) => {
      console.log("Something went wrong. ", error)
    })
}
export const getPostDetailsFromServer = (id) => {
  return fetch(`${api}/posts/${id}`, { headers })
  .then(response =>
    response.json()
  ).then(data =>
    data
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}

export const getCommentDetailsFromServer = (id) => {
  return fetch(`${api}/comments/${id}`, { headers })
  .then(response =>
    response.json()
  ).then(data =>
    data
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}

export const addPostToServer = (post) => {
  return fetch(`${api}/posts/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}

export const editPostToServer = (post) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}

export const votePost = (id, vote) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( vote )
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}
export const voteComment = (id, vote) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( vote )
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}

export const editCommentToServer = (comment) => {
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}

export const deletePostFromServer = (post) => {
  console.log("deletePostFromServer ", post.id)
  return fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}



export const deleteCommentFromServer = (comment) => {
  console.log("deletePostFromServer ", comment.id)
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}

export const addComment = (comment) => {
  return fetch(`${api}/comments/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
  }).then(res => res.json()
  ).catch((error) => {
    console.log("Something went wrong. ", error)
  })
}




export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books)
