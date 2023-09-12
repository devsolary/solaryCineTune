//javascript for newpost.html

const id = new URLSearchParams(window.location.search).get("id")
const container = document.querySelector(".newPost")
const deleteButton = document.querySelector(".delete")
const renderPost = async () => {
  const res = await fetch("http://localhost:3000/posts/" + id)
  const post = await res.json()
  console.log(post)

  const template = `
	<div class="newPost">
	<h2>${post.title}</h2>
	<p>${post.body}</p>
	
	</div>
	`
  container.innerHTML = template
}
deleteButton.addEventListener("click", async (e) => {
  const res = await fetch("http://localhost:3000/posts" + id, {
    method: "DELETE",
  })
  window.location.replace("/index.html")
})

window.addEventListener("DOMContentLoaded", () => renderPost())
