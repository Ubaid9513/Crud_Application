const apiUrl = "https://66f91ca12a683ce97310ef75.mockapi.io/api/vi/posts";

function fetchPosts() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayData(data))
    .catch((error) => console.log("Error", error));
}
fetchPosts();
// DISPLAY DATA IN SCREEN

function displayData(posts) {
  console.log(posts);
  posts.forEach((post) => {
    // console.log(post.id);
    let tableBody = document.getElementById("tableBody");
    let tableBodyData = `
    <tr>
                    <th><img src="./Images/WhatsApp Image 2023-12-28 at 04.50.00_10722079.jpg" alt="img"
                            style="width: 40px; height: 40px; border-radius: 50%;"></th>
                    <td>${post.name}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                    <td>
                        <div>
                            <button id="editBtn" onclick="updatePost(${post.id})">Edit</button>
                            <button id="delBtn" onclick="delPost(${post.id})">Delete</button>
                        </div>
                    </td>
                </tr>
    `;
    tableBody.innerHTML += tableBodyData;
  });
}

// CREATE POST

document.getElementById("createPostForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e);
  let name = document.getElementById("userName").value;
  let title = document.getElementById("userTitle").value;
  let avatar = document.getElementById("userProfileUrl").value;
  let body = document.getElementById("body").value;

  const newPost = {
    name: name,
    title: title,
    avatar: avatar,
    body: body,
  };
  console.log(newPost);
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("Error", error));
});

// DELETE POST

function delPost(id) {
  console.log(id);
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if(response.ok) {
        console.log("response", response);
        return response.json();
      }
    })
    .then((data) => alert(`${data.name} Successfully deleted`))
    .catch((error) => console.log("Error", error));
}

// UPDATE POST

function updatePost(id) {
  console.log(id);

  fetch(`${apiUrl}/${id}`)
  .then(response => response.json())
  .then((post) => {
    console.log(post.avatar);
    document.getElementById("createPostForm").style.display = "none";
    document.getElementById("updatePostForm").style.display = "block";
    document.getElementById("updatePostForm").name.value = post.name;
    document.getElementById("updatePostForm").title.value = post.title;
    document.getElementById("updatePostForm").avatar.value = post.avatar;
    document.getElementById("updatePostForm").body.value = post.body;


  })
  .catch((error) => console.log("Error",error))
};
