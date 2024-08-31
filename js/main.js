let userWrapper = document.querySelector('.user-wrapper')
let userInformations = document.querySelector(".user-Inform")
let UserLIST = document.querySelector(".users-list")
let elPosts = document.querySelector(".Posts")
let elCommentsWrapper = document.querySelector(".Comments-wrapper")
let elCommentsList = document.querySelector(".comments-list")

let elLoading = document.querySelector(".loading")

// render the Users section start
function getUser(arr){
    arr.forEach(item => {
        let userNamesRend = document.createElement("div")
        userNamesRend.className = "p-2 flex scale-1 items-center justify-between rounded-[30px] border border-gray-500"
        userNamesRend.innerHTML = `
        <img src="./images/user-icon.svg" alt="Icon" width="50"  />
        <div>
            <h2 class="text-xl text-gray-400  font-bold">${item.name}</h2>
            <p class="text-gray-500">${item.email}</p>
            </div>
        <button onclick="handleShowinformation(${item.id})" class="bg-blue-500 border border-blue-500 hover:bg-transparent hover:text-blue-500 duration-300 w-[200px] py-2 rounded-[30px] text-[20px] font-bold">See information</button>
        `
        userWrapper.appendChild(userNamesRend)
    })
}
fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then( data  => {
    getUser(data)
})
// render the Users section end


// Show information about user start
function handleShowinformation(id) {
    elPosts.innerHTML = null
    userWrapper.classList.add("hidden")
    elLoading.classList.remove("hidden")
     fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`).then(res => res.json()).then( data  => {
        setTimeout(() =>{
            userInformations.classList.remove("hidden")
           renderUsers(data)
           elLoading.classList.add("hidden")
        },500)
        })
        
    

    
}

function renderUsers(users) {
    UserLIST.innerHTML = null
    users.forEach(item => {
        let userItem = document.createElement("li")
        userItem.className = "flex flex-col items-center "
        userItem.innerHTML = `
            <div class="flex  items-start gap-[80px]">
                <img class="rounded-full" src="./images/Icon.png" alt="user icon" width="300">
                <div class="flex flex-col pt-6 space-y-2">
                  <p class=" text-gray-400 text-[35px]"><strong class="text-gray-300">FirtsName:</strong> ${item.name}</p>
                  <p class=" text-gray-400 text-[35px]"><strong class="text-gray-300">UserName:</strong> ${item.username}</p>
                  <p class="text-gray-400 text-[35px]"><strong class="text-gray-300">Email:</strong> ${item.email}</p>
                  <p class="text-gray-400 text-[35px]"><strong class="text-gray-300">Phone:</strong> ${item.phone}</p>
                </div>
            </div>
              <button id="show-posts" onclick="handleShowPosts(${item.id})" class="mt-[20px]  bg-blue-500 border border-blue-500 duration-300 w-[450px] py-3 rounded-2xl text-[20px] text-white hover:bg-transparent hover:text-blue-500">Show posts</button>
              <button class="hide-posts mt-[20px] hidden bg-blue-500 border border-blue-500 duration-300 w-[450px] py-3 rounded-2xl text-[20px] text-white hover:bg-transparent hover:text-blue-500">Hide posts</button>
        `
    UserLIST.appendChild(userItem)
    })
    let elShowPost = document.querySelector("#show-posts")
    let elHidePost = document.querySelector(".hide-posts")
    
    elShowPost.addEventListener("click", () => {
        elPosts.classList.remove("hidden")
        elHidePost.classList.remove("hidden")
        elShowPost.classList.add("hidden")
    })
    elHidePost.addEventListener("click", () => {
        elPosts.classList.add("hidden")
        elHidePost.classList.add("hidden")
        elShowPost.classList.remove("hidden")
    })
}




// Show information about user end




// show post start
function handleShowPosts(id) {
    elLoading.classList.remove("hidden")

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(res => res.json()).then(data  => {
        setTimeout(() => {
            renderPosts(data)
            elLoading.classList.add("hidden")
        } , 500)
   })
}
    
function renderPosts(posts) {
    elPosts.innerHTML = null
    posts.forEach(item => {
        let postItem = document.createElement("li")
        postItem.className = "w-[700px] bg-slate-900 text-gray-300 text-center px-[3%] py-3 rounded-xl"
        postItem.innerHTML = `
            <p class="text-xl mb-3 text-gray-500 text-start" ><strong>UserID:</strong> ${item.userId}</p>
            <p class="text-xl mb-3 text-gray-500 text-start"><strong>PostID:</strong> ${item.id}</p>
            <strong class="text-2xl text-gray-500">Title</strong>
            <h3 class="text-2xl mb-2"> ${item.title}</h3>
            <strong class="text-2xl text-gray-500">Content</strong>
            <p class="text-lg"> ${item.body}</p>
            <button onclick="handleShowComment(${item.id})" class=" mt-[20px] bg-blue-500 border border-blue-500 duration-300 w-[350px] py-3 rounded-2xl text-[20px] text-white hover:bg-transparent hover:text-blue-500">Show Comments</button>

        `
        elPosts.appendChild(postItem)
    })
}
// show post start
 

// Show comments start
function handleShowComment(id){
    elCommentsList.innerHTML = null
    userInformations.classList.add("hidden")
    elLoading.classList.remove("hidden")
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(res => res.json()).then(data  => {
        setTimeout(() => {
            renderComments(data)
            elLoading.classList.add("hidden")
        }, 800)
    })
    elCommentsWrapper.classList.remove("hidden")
}

function renderComments(arr) {
    elCommentsList.innerHTML = null
    arr.forEach(item => {
        let commentItem = document.createElement("li")
        commentItem.className = "w-[700px] bg-slate-900 text-gray-300 text-center px-[2%] py-3 rounded-xl"
        commentItem.innerHTML = `
            <p class="text-xl mb-3 text-gray-500 text-start" ><strong>PostID:</strong> ${item.postId}</p>
            <p class="text-xl mb-3 text-gray-500 text-start"><strong>CommentID:</strong> ${item.id}</p>
            <div class="flex space-x-4 items-center gap-[15px] mb-4">
              <img class="rounded-full" src="./images/Icon.png" alt="User Avatar img" width="90" height="90">
                <p class="text-2xl text-gray-500"><strong class=" text-gray-400" >Email:</strong> ${item.email}</p>
              </div>
            </div>
            <strong class="text-center block text-2xl text-gray-400" >Name</strong>
            <p class="text-2xl text-gray-500 mb-4">${item.name}</p>
            <strong class="text-2xl text-gray-400">Comment</strong>
            <p class="text-lg text-gray-500">${item.body}</p>
        `
        elCommentsList.appendChild(commentItem)
    })
    elCommentsWrapper.classList.remove("hidden")
 
}
// Show comments end


// back to users section start

function gotoBackUsersPart(){
    elLoading.classList.remove("hidden")
    setTimeout(() => {
        elLoading.classList.add("hidden")
        userInformations.classList.add("hidden")
        elCommentsWrapper.classList.add("hidden")
        userWrapper.classList.remove("hidden")
    }, 300)
  
}


function gotoBackPosts(){
    elLoading.classList.remove("hidden")
    setTimeout(() => {
        elLoading.classList.add("hidden")
        elCommentsWrapper.classList.add("hidden")
        userInformations.classList.remove("hidden")
    }, 300);
    
}


// back to users section end