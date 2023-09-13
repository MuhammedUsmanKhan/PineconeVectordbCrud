//const addpollBut = document.querySelector('#openModal');
const modal = document.getElementById('createPollModal');
const closeModal = modal.getElementsByClassName('createPoll-modal-close')[0];
const closeModalbut = modal.getElementsByClassName('createPoll-modal-close')[1];
const closeModalUpdtbut = modal.getElementsByClassName('createPoll-modal-close')[2];
const modalContainer = modal.getElementsByClassName('createPoll-modal-container')[0];
const modalOverlay = modal.getElementsByClassName('createPoll-modal-overlay')[0];
const errorDisplayModal = document.getElementById('myModal');
const errorcloseModal = errorDisplayModal.getElementsByClassName('error-modal-close')[0];
const errormodalContainer = errorDisplayModal.getElementsByClassName('error-modal-container')[0];
const errormodalOverlay = errorDisplayModal.getElementsByClassName('error-modal-overlay')[0];

/////////////have to modify it for update///////////////////


closeModal.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  modalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
});
closeModalbut.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  modalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
});
closeModalUpdtbut.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  modalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
});
modalOverlay.addEventListener('click', () => {
  modal.classList.remove('modal-open');
  modalContainer.classList.remove('modal-container-open');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
});

let openModal = (error) => {
  console.log(error)
  const modalText = document.getElementById(`Response`);
  modalText.innerText = `${error.response.data}`
  console.log(modalText.innerText)
  //console.log(error.data)
  errorDisplayModal.classList.remove('hidden');
  setTimeout(() => {
    errorDisplayModal.classList.add('modal-open');
    errormodalContainer.classList.add('modal-container-open');
  }, 50);
}
let succesOpenModal = (succes) => {
  const modalHeader = document.getElementById(`modalHeader`)
  const modalText = document.getElementById(`Response`);
  modalHeader.innerText = `Request Confirmed`
  modalText.innerText = `${succes.data}`
  console.log(modalText.innerText)
  //console.log(error.data)
  errorDisplayModal.classList.remove('hidden');
  setTimeout(() => {
    errorDisplayModal.classList.add('modal-open');
    errormodalContainer.classList.add('modal-container-open');
  }, 50);
}
let errorModel = () => {
  errorcloseModal.addEventListener('click', (event) => {
    event.preventDefault()
    errorDisplayModal.classList.remove('modal-open');
    errormodalContainer.classList.remove('modal-container-open');
    setTimeout(() => {
      errorDisplayModal.classList.add('hidden');
    }, 300);
  });
  errormodalOverlay.addEventListener('click', (event) => {
    event.preventDefault()
    errorDisplayModal.classList.remove('modal-open');
    errormodalContainer.classList.remove('modal-container-open');
    setTimeout(() => {
      errorDisplayModal.classList.add('hidden');
    }, 300);
  });
  errorcloseModal.addEventListener('click', (event) => {
    event.preventDefault()
    errorDisplayModal.classList.remove('modal-open');
    errormodalContainer.classList.remove('modal-container-open');
    setTimeout(() => {
      errorDisplayModal.classList.add('hidden');
    }, 300);
  });
  errormodalOverlay.addEventListener('click', (event) => {
    event.preventDefault()
    errorDisplayModal.classList.remove('modal-open');
    errormodalContainer.classList.remove('modal-container-open');
    setTimeout(() => {
      errorDisplayModal.classList.add('hidden');
    }, 300);
  });

}

let modalOpen = (postidRef) => {
  console.log(postidRef)
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.add('modal-open');
    modalContainer.classList.add('modal-container-open');
  }, 50);
  let postCreatedBut = document.getElementById(`pollCreatedBut`)
  postCreatedBut.classList.add(`hidden`)
  //let postidRef = idRef
  let updateBut = document.getElementById(`postCreatedBut`)
  updateBut.classList.remove(`hidden`)
  updateBut.setAttribute(`ref`, `${postidRef}`)
  let postTitle = document.getElementById(`Title`)
  let postDetails = document.getElementById(`textArea`)

  axios.get(`/api/v1/post/${postidRef}`)
    .then((postData) => {
      //console.log(postData.data[0].PostTitle)
      postTitle.value = postData.data[0].PostTitle
      postDetails.value = postData.data[0].Desc

    })
    .catch((error) => {
      console.log(error)
      openModal(error)
      errorModel()
      //console.log(updateBut)
    })
}
window.displayPost = () => {

  axios.get(`/api/v1/posts`)
    .then((post) => {
      console.log(post)
      console.log(post.data)
      let postArr = post.data.length
      //if (postArr.length > 0) {
      console.log(postArr)
      // post.data.forEach(element => {
      //let postsContainer = document.getElementById(`postContainer`)
      // Create main container

      post.data.forEach((element) => {
        console.log(element)
        console.log(element.PostTitle)
        console.log(element._id)

        // Create the main container
        const container = document.createElement("div");
        container.classList.add(
          "relative",
          "flex",
          "flex-col",
          "justify-between",
          "bg-white",
          "rounded-lg",
          "shadow-md",
          "p-6",
          "transform",
          "hover:scale-105",
          "transition",
          "duration-300"
        );

        // Create the decorative ribbon
        const ribbon = document.createElement("div");
        ribbon.classList.add(
          "absolute",
          "top-0",
          "left-0",
          "transform",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "bg-blue-500",
          "w-16",
          "h-8",
          "-rotate-45",
          "z-10"
        );
        container.appendChild(ribbon);

        // Create the content (head and name)
        const content = document.createElement("div");
        content.classList.add("space-y-1");

        const head = document.createElement("h1");
        head.classList.add("text-2xl", "text-gray-900", "font-bold");
        head.textContent = `${element.PostTitle}`;
        content.appendChild(head);

        const name = document.createElement("p");
        name.classList.add("text-lg", "font-semibold", "text-gray-800");
        name.textContent = `${element.Desc}`;
        content.appendChild(name);

        container.appendChild(content);

        // Create the buttons (Edit and Delete)
        const buttons = document.createElement("div");
        buttons.classList.add("flex", "justify-between", "mt-4");

        const editButton = document.createElement("button");
        editButton.classList.add(
          "bg-green-500",
          "text-white",
          "px-4",
          "py-2",
          "rounded-md",
          "mr-2",
          "hover:bg-green-600",
          "font-semibold"
        );
        editButton.textContent = "Edit";
        editButton.setAttribute('ref', element._id)
        editButton.addEventListener(`click`, () => modalOpen(element._id))
        buttons.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add(
          "bg-red-500",
          "text-white",
          "px-4",
          "py-2",
          "rounded-md",
          "font-semibold",
          "hover:bg-red-600"
        );
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute('ref', element._id)
        deleteButton.addEventListener('click', delFunc)
        buttons.appendChild(deleteButton);

        container.appendChild(buttons);

        // Add the container to the main container on the HTML page
        const postContainer = document.getElementById("postList");
        postContainer.appendChild(container);

      })

      // });  
      // // Create the main container div
    })
    .catch((error) => {
      console.log(error)
    })

}

//document.addEventListener()
let addPost = () => {
  let postTitle = document.getElementById(`postTitle`)
  let postDetails = document.getElementById(`postContent`)
  let postContainer = document.getElementById(`postList`)
  axios.post(`/api/v1/post`, {
    PostTitle: postTitle.value,
    Desc: postDetails.value
  })
    .then((response) => {
      console.log(response.data);
      //document.querySelector("#result").innerHTML = response.data;
      //getAllPost();
      let successModalContainer = document.getElementsByClassName(`error-modal-container`)[0]
      if (!successModalContainer.classList.contains(`bg-purple-700`)) {
        successModalContainer.classList.add(`bg-purple-700`)
      }
      postTitle.value = " "
      postDetails.value = " "
      postContainer.innerHTML = " "
      succesOpenModal(response)
      errorModel()
      displayPost();
    })
    .catch((error) => {
      // handle error
      console.log(error.response.data);
      let successModalContainer = document.getElementsByClassName(`error-modal-container`)[0]
      if (!successModalContainer.classList.contains(`bg-purple-700`)) {
        successModalContainer.classList.add(`bg-purple-700`)
      }
      openModal(error)
      errorModel()
    })
}
//document.querySelector("#result").innerHTML = "error in post submission"


let postCreateBut = document.getElementById(`addPostButton`)
postCreateBut.addEventListener(`click`, addPost)

//postCreateBut.addEventListener(`click`,displayPost)

let delFunc = (event) => {

  let postID = event.target.getAttribute('ref')
  axios.delete(`/api/v1/post/delete/${postID}`)
    .then((response) => {
      console.log(response)
      let postContainer = document.getElementById(`postList`)
      postContainer.innerHTML = ''
      displayPost();
      succesOpenModal(response)
      errorModel()
    })
    .catch((err) => {
      console.log(err);
      openModal(err)
      errorModel()
    });

}

const updtPostBut = document.querySelector('#postCreatedBut');

let Update = (event) => {

  let postContainer = document.getElementById(`postList`)
  postContainer.innerHTML = ""
  console.log(event.target);
  let theRef = event.target.attributes.ref.value;

  let postTitle = document.getElementById(`Title`)
  let postDetails = document.getElementById(`textArea`)

  axios.put(`/api/v1/post/update/${theRef}`, {
    PostTitle: postTitle.value,
    Desc: postDetails.value
  })
    .then((postData) => {
      console.log(postData)
      // let successModalContainer = document.getElementsByClassName(`error-modal-container`)[0]
      // if (!successModalContainer.classList.contains(`bg-indigo-700`)) {
      //   successModalContainer.classList.add(`bg-indigo-700`)
      // }
      succesOpenModal(postData)
      errorModel()
      displayPost();
    })
    .catch((error) => {
      console.log(error)
      // let successModalContainer = document.getElementsByClassName(`error-modal-container`)[0]
      // if (!successModalContainer.classList.contains(`bg-indigo-700`)) {
      //   successModalContainer.classList.add(`bg-indigo-700`)
      // }
      openModal(error)
      errorModel()
    })

}

updtPostBut.addEventListener(`click`, Update)



