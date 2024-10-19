const apiUrl = "https://66f91ca12a683ce97310ef75.mockapi.io/api/vi/posts";
const createPostForm = document.getElementById("createPostForm");
const updatePostForm = document.getElementById("updatePostForm");

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

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  
  posts.forEach((post) => {
    // console.log(post.id);
    let tableBodyData = `
    <tr>
                    <th><img src="${post.avatar}" alt="img"
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

createPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e);
  const name = document.getElementById("userName").value;
  const title = document.getElementById("userTitle").value;
  const avatar = document.getElementById("avatar").value;
  const body = document.getElementById("body").value;

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

  document.getElementById("userName").value = "";
  document.getElementById("userTitle").value = "";
  document.getElementById("avatar").value = "";
  document.getElementById("body").value = "";
});

// DELETE POST

function delPost(id) {
  console.log(id);
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
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
    .then((response) => response.json())
    .then((post) => {
      console.log(post);
      createPostForm.style.display = "none";
      updatePostForm.style.display = "block";
      updatePostForm.userName.value = post.name;
      updatePostForm.userTitle.value = post.title;
      updatePostForm.avatar.value = post.avatar;
      updatePostForm.body.value = post.body;
    })
    .catch((error) => console.log("Error", error));

  updatePostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);
    const name = updatePostForm.userName.value;
    const title = updatePostForm.userTitle.value;
    const avatar = updatePostForm.avatar.value;
    const body = updatePostForm.body.value;

    const updatedPost = {
      name: name,
      title: title,
      avatar: avatar,
      body: body,
    };
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${data.name} Successfully Updated`);
        fetchPosts();
      })
      .catch((error) => console.log("Error", error));

    updatePostForm.userName.value = "";
    updatePostForm.userTitle.value = "";
    updatePostForm.avatar.value = "";
    updatePostForm.body.value = "";
  });
}
// updatePostForm.addEventListener("submit",(e) => {
//   e.preventDefault();
//   console.log(e);
//   const name = updatePostForm.name.value;
//   const title = updatePostForm.title.value;
//   const avatar = updatePostForm.avatar.value;
//   const body = updatePostForm.body.value;

//   const updatedPost = {
//     name: name,
//     title: title,
//     avatar: avatar,
//     body: body,
//   }
//   fetch(`${apiUrl}/${id}`,{
//     method : "PUT",
//     headers : {
//       "Content-Type" : "application/json"
//     },
//     body : JSON.stringify(updatedPost),
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     alert(`${data.name} Successfully Updated`);
//     fetchPosts();
//   })
//   .catch((error) => console.log("Error",error));

// })
