let API = "https://6809f5e51f1a52874cde8620.mockapi.io/user"
let userList = document.getElementById("userList")
let form = document.getElementById("userForm")
let nameInput = document.getElementById("name")
let emailInput = document.getElementById("email") 
let error = document.getElementById("error")
let users = []

async function feachData(){
    try{
        let res = await fetch(API)
        users = await res.json()
        // console.log(users)
        renderUsers()
        
    }catch(err){
        error.innerHTML = 'Failed to load users.'
    }
}

function renderUsers() {
    userList.innerHTML = ''
    users.forEach(user => {
    const div = document.createElement('div')
    div.className = 'user'
    div.innerHTML = `
    <div class="user-name">${user.name}</div>
    <div class="user-email">${user.email}</div>
    `
    userList.appendChild(div)
})

form.addEventListener("submit", e => PostData(e))
}

async function PostData(e){
    e.preventDefault() 
    error.innerHTML = ""

    let name = nameInput.value.trim()
    let email = emailInput.value.trim()

    let isExist = users.some( user => user.email.toLowerCase() === email.toLowerCase())

    if(isExist){
       error.textContent = 'User with this email already exists.'
       return
    }

    try{
        let res = await fetch(API, {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email})
        })

        if(!res.ok) throw new Error('POST failed')
        let newUser = await res.json()
        users.push(newUser)
        renderUsers()
        form.reset()
    }
    catch(err){
       err.textContent =  'Oops! Failed to add the user. Try again later.'
    }
}

feachData()