//javascript for index.html

const container = document.querySelector(".blogs")
const searchBar = document.querySelector(".search")
const searchButton = document.querySelector(".srchbtn")
const postsPerPage = 10
let currentPage = 1
let totalPosts = 0
let totalPages = 0

const renderPost = async (term) => {
  let urlPost = "http://localhost:3000/posts?_sort=id&_order=desc"

  if (term) {
    urlPost += `&q=${term}`
  }

  const postRes = await fetch(urlPost)
  const data = await postRes.json()
  totalPosts = data.totalPosts
  totalPages = Math.ceil(totalPosts / postsPerPage)

  return { props: { posts: data } }
}

const displayPosts = (posts) => {
  container.innerHTML = ""

  if (!Array.isArray(posts)) {
    container.innerHTML = `<p>No post Available.....</p>`
    return
  }

  const postList = document.createElement("ul")

  posts.forEach((post) => {
    const postItem = document.createElement("li")
    postItem.className = "post"

    const postTitle = document.createElement("h2")
    const postLink = document.createElement("a")
    postLink.href = `/newpost.html?id=${post.id}`
    postTitle.innerHTML = `${post.title}`
    postTitle.className = "post-title"

    const postBody = document.createElement("p")
    postBody.innerHTML = `${post.body.slice(0, 50)}`
    postBody.className = "post-body"

    postLink.appendChild(postTitle)
    postLink.appendChild(postBody)

    postItem.appendChild(postLink)
    postList.appendChild(postItem)
  })

  container.appendChild(postList)
}

const displayPagination = () => {
  const paginationContainer = document.getElementById("pagination")
  paginationContainer.innerHTML = ""

  const prevButton = document.createElement("button")
  prevButton.innerHTML = "previous"
  prevButton.className = "pageButton"
  prevButton.addEventListener("click", () => changePage(currentPage - 1))

  const nextButton = document.createElement("button")
  nextButton.innerHTML = "next"
  nextButton.className = "pageButton"
  nextButton.addEventListener("click", () => changePage(currentPage + 1))

  paginationContainer.appendChild(prevButton)

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement(button)
    pageButton.className = "pageNumbers"
    pageButton.innerHTML = i
    pageButton.addEventListener("click", () => changePage(i))

    paginationContainer.appendChild(pageButton)
  }

  paginationContainer.appendChild(nextButton)
}

const changePage = async (newPage) => {
  if (newPage < 1 || newPage > totalPages) {
    return
  }

  currentPage = newPage
  const {
    props: { posts },
  } = await renderPost(currentPage)
  displayPosts(posts)
  displayPagination()
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault()
  renderPost(searchBar.term.value.trim())
})
window.addEventListener("DOMContentLoaded", changePage())
