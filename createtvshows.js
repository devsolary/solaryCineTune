//javascript for create.html
const form = document.querySelector("form")

const createPost = async (e) => {
  e.preventDefault()
  const doc = {
    author: form.author.value,
    title: form.title.value,
    body: form.body.value,
    download: form.downloadLink.value,
  }
  await fetch("http://localhost:3000/tvshows", {
    method: "POST",
    body: JSON.stringify(doc),
    headers: { "content-type": "application/json" },
  })
  window.location.replace("./index.html")
}
form.addEventListener("submit", createPost)
