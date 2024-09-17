



let all_content = document.getElementById("all-content")
let signup_button = document.getElementById("signup-btn")
let login_nav_button = document.getElementById("login")
let bg_container_image = document.getElementById("bg-container-image")
let home_button = document.getElementById("home-btn")

let log_out_nav_button = document.getElementById("logout")
signup_button.addEventListener("click",createSignUp) 

login_nav_button.addEventListener("click",createLogin)

let blogs = document.getElementById("all-blogs")


home_button.addEventListener("click",()=>{
    all_content.innerHTML=""
    let title = document.createElement('h3')
    all_content.appendChild(title)

    title.innerText="Welcome to Our Gardening Blogs"
    title.classList.add("text-center" , "homepage-title","mt-5")
    bg_container_image.classList.add('bg-img-container')
})

blogs.addEventListener("click",()=>{
    
    fetch("https://66e8028eb17821a9d9daf072.mockapi.io/blogs")
    .then(res=>res.json())
    .then(data => {
        
           
            createAllBlogs(data)
       
        
        // data.map(item => {
        //     console.log(item)
        //     createBlogsPage(item.userId) })
    })

})


function createHomePage(){
    bg_container_image.classList.add('bg-img-container')
}


function createLogin(){
   

    all_content.innerHTML=""
    bg_container_image.classList.add('bg-img-container')
    let userNameInput = document.createElement('input');
    let passwordInput = document.createElement('input');
    let title = document.createElement('h5');
    let main_content = document.createElement("div")
    let signup_btn_form = document.createElement("btn")
    main_content.classList.add("login-card")
    

    
    userNameInput.id = 'user-name';
    userNameInput.type = 'text';
    userNameInput.placeholder = 'User name';

    passwordInput.id = 'password';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';

//     <div class="login-card">
//     <h2>Login</h2>
//     <input type="username" placeholder="email"  id="email">
//     <input type="password" placeholder="password" id="password">
//  </div>

    signup_btn_form.classList.add('btn', 'btn-info', 'col-5', 'mt-3');
    signup_btn_form.href = '#';
    signup_btn_form.textContent = 'Login';
    title.textContent="Log in"
    title.classList.add("mt-4")
    main_content.classList.add("mt-5")
    all_content.appendChild(main_content)
    main_content.appendChild(title);
    main_content.appendChild(userNameInput);
    main_content.appendChild(passwordInput);

    main_content.appendChild(signup_btn_form);

    signup_btn_form.addEventListener("click", e=>{

        
    fetch(`https://66e8028eb17821a9d9daf072.mockapi.io/users/?password=${passwordInput.value}&username=${userNameInput.value}`)
    .then(res => res.json())
    .then (data => {
        console.log(data[0].id)

        if (data === "Not found") {
            Swal.fire({
                icon: "error",
                title: "Login failed",
                text: " probably due to incorrect login info",
            });
            return
        }
        
        createUserPage(data[0].id,data[0].username)

          
        signup_button.classList.add("display-invis")
        login_nav_button.classList.add("display-invis")

        log_out_nav_button.classList.remove("display-invis")
    
        
        let add_blogs = document.getElementById("add-blog")

        add_blogs.classList.remove("display-invis")

        add_blogs.addEventListener("click",()=>{
            bg_container_image.classList.add('bg-img-container')
          

            createPersonalPage(data[0].id,data[0].username)})
     

        
    })

    log_out_nav_button.addEventListener("clikc",e =>{

        signup_button.classList.remove("display-invis")
        login_nav_button.classList.remove("display-invis")

        log_out_nav_button.classList.add("display-invis")
        add_blogs.classList.add("display-invis")
        all_content.innerHTML=""
        createHomePage()
    
    })

    })

}


function createBlogsPage (id){
    all_content.innerHTML=""
    bg_container_image.classList.remove('bg-img-container')
    fetch(`https://66e8028eb17821a9d9daf072.mockapi.io/blogs/?userId=${id}`)
    .then(res =>res.json())
    .then ( data =>{
        console.log(data)
        data.forEach(blog =>{
         
            console.log(blog)
            let bg =document.createElement("div")
            let main_div =document.createElement("div")
            let circle_div =document.createElement("div")
           
            let title = document.createElement("h3")
            let username = document.createElement("h5")
            let p_content = document.createElement("p")

            // all_content.appendChild(bg)
            all_content.classList.add("col-12")

            all_content.appendChild(main_div)
            main_div.classList.add("col-10", "row", "d-flex", "justify-content-center", "bg-yellow","mt-3")
            main_div.appendChild(title)
            main_div.appendChild(username)
        
            // main_div.appendChild(circle_div)
            main_div.appendChild(p_content)
            p_content.style.backgroundColor="#f9f9e9"
            p_content.style.borderRadius="40px"

            

            circle_div.classList.add("clip-circle")
            circle_div.style.backgroundImage=`url(${data.photo})`
            title.classList.add("col-12","main-title")

            title.textContent = blog.blog.title

            p_content.textContent = blog.blog.text
            username.textContent = "by: "+ blog.username

            // <!-- <div class="bg-img-container col-12">
            // </div>
      
            // <div class="col-12 row d-flex justify-content-center bg-yellow ">
            //     <div class="col-12 main-title" > Gardening blog</div>
              
            //     <div class="clip-circle"></div>
            //     <p class="blog">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sed, ratione rerum hic cumque veniam ducimus. Et necessitatibus architecto inventore quas sunt aliquid qui nobis voluptatum veniam, eum numquam perspiciatis!</p>
               
            // </div> -->

      
        })
    })
}


function createAllBlogs (data){
 all_content.innerHTML=""
        for(let i = 0 ; i <data.length; i ++){
            let blog = data[i]
            
            bg_container_image.classList.remove('bg-img-container')
           
           
            let bg =document.createElement("div")
            let main_div =document.createElement("div")
            let circle_div =document.createElement("div")
           
            let title = document.createElement("h3")
            let username = document.createElement("h5")
            let p_content = document.createElement("p")
        
            // all_content.appendChild(bg)
            all_content.classList.add("col-12")
        
            all_content.appendChild(main_div)
            main_div.classList.add("col-10", "row", "d-flex", "justify-content-center", "bg-yellow","mt-3")
            main_div.appendChild(title)
            main_div.appendChild(username)
        
            // main_div.appendChild(circle_div)
            main_div.appendChild(p_content)
            p_content.style.backgroundColor="#f9f9e9"
            p_content.style.borderRadius="40px"
        
            
        
            circle_div.classList.add("clip-circle")
            circle_div.style.backgroundImage=`url(${data.photo})`
            title.classList.add("col-12","main-title")
        
            title.textContent = blog.blog.title
        
            p_content.textContent = blog.blog.text
            username.textContent = "by: "+ blog.username
        }
  
    
   
}


function createSignUp(){
     
    all_content.innerHTML=""
    bg_container_image.classList.add('bg-img-container')
    let userNameInput = document.createElement('input');
    let emailInput = document.createElement('input');
    let emailRepeatInput = document.createElement('input');
    let passwordInput = document.createElement('input');
    let passwordRepeatInput = document.createElement('input');
    let title = document.createElement('h5');
    let main_content = document.createElement("div")
    let signup_btn_form = document.createElement("btn")
    main_content.classList.add("sign-up-card")
    
    userNameInput.id = 'user-name';
    userNameInput.type = 'text';
    userNameInput.placeholder = 'User name';

    emailInput.id = 'email';
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';

    emailRepeatInput.id = 'email-repeat';
    emailRepeatInput.type = 'email';
    emailRepeatInput.placeholder = 'Re-type Email';

    passwordInput.id = 'password';
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';

    passwordRepeatInput.id = 'password-repeat';
    passwordRepeatInput.type = 'password';
    passwordRepeatInput.placeholder = 'Re-type Password';


//     <div class="login-card">
//     <h2>Login</h2>
//     <input type="username" placeholder="email"  id="email">
//     <input type="password" placeholder="password" id="password">
//  </div>

    signup_btn_form.classList.add('btn', 'btn-info', 'col-5', 'mt-3');
    signup_btn_form.href = '#';
    signup_btn_form.textContent = 'Sign Up';
    title.textContent="Sign up"
    title.classList.add("mt-4")
    main_content.classList.add("mt-5")
    all_content.appendChild(main_content)
    main_content.appendChild(title);
    main_content.appendChild(userNameInput);
    main_content.appendChild(emailInput);
    main_content.appendChild(emailRepeatInput);
    main_content.appendChild(passwordInput);
    main_content.appendChild(passwordRepeatInput);
    main_content.appendChild(signup_btn_form);

    signup_btn_form.addEventListener("click", e=>{
        let isPasswordTooShort = !(passwordInput.value.length > 8) || !(passwordRepeatInput.value.length > 8)
        let isUsernameTooShort = !(userNameInput.value.length > 5)
        let allfieldsFull = userNameInput.value === "" || emailInput.value === "" || emailRepeatInput.value === ""
            || passwordInput.value === "" || passwordRepeatInput.value === ""
        if (allfieldsFull) {
            Swal.fire({
                icon: "error",
                title: "Sign Up failed!",
                text: "make sure all fields are filled",
            });
            return
        }


        if (isUsernameTooShort) {
            Swal.fire({
                icon: "error",
                title: "Sign Up failed!",
                text: "Username Must be longer than 5 letters",
            });
            return
        }

        if (isUsernameTooShort) {
            Swal.fire({
                icon: "error",
                title: "Sign Up failed!",
                text: "Username Must be longer than 5 letters",
            });
            return
        }
        if (isPasswordTooShort) {
            Swal.fire({
                icon: "error",
                title: "Sign Up failed!",
                text: "Your password must be atleast 9 numbers",
            });
            return

        }

        if (passwordInput.value !== passwordRepeatInput.value) {
            Swal.fire({
                icon: "error",
                title: "Sign Up failed!",
                text: "passwords don't match",
            });
            return

        }


        // email validation regex i found online
        let isValidEmail = String(emailInput.value).toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (!isValidEmail) {
            Swal.fire({
                icon: "error",
                title: "Sign Up failed!",
                text: "invalid email. Make sure your email is valid",
            });
            return

        }

        if (emailInput.value !== emailRepeatInput.value) {
            Swal.fire({
                icon: "error",
                title: "Sign Up failed!",
                text: "emails don't match",
            });
            return
        }
        //Error checking.............................

        fetch("https://66e8028eb17821a9d9daf072.mockapi.io/users", {
            method: "POST",
            body: JSON.stringify({
                username: userNameInput.value,
                password: passwordInput.value,
                email: emailInput.value

            })
            ,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(res => res.json())
            .then(data => {

                //createUserPage(container, userNameInput, data.username)
                console.log(data)
                createPersonalPage(data.id,data.username)


            })
    })

}

function createPersonalPage(id,username){
    all_content.innerHTML=""
   
     
    let main_content = document.createElement("div")
   

    let input_blog = document.createElement("textarea")
    let title = document.createElement("input")

    let submit = document.createElement("button")

    main_content.classList.add("enter-blog")

    
    all_content.appendChild(main_content)
    
    
    main_content.appendChild(title)
    main_content.appendChild(input_blog)
    main_content.appendChild(submit)

    main_content.classList.add("row","mt-5")
    submit.textContent="submit"

    title.setAttribute("placeholder","enter your title")
    input_blog.setAttribute("placeholder","text....")

    input_blog.setAttribute("rows","7")
    input_blog.setAttribute("cols","50")

    title.classList.add("col-9")
    input_blog.classList.add("col-9")
    submit.classList.add("col-9")
    input_blog.style.resize="none"



    submit.addEventListener("click", e=>{

        fetch(`https://66e8028eb17821a9d9daf072.mockapi.io/blogs/`, {
            method: 'POST',
            body: JSON.stringify({
              userId: id,
              username:username,
              blog: {
                title:title.value,
                text:input_blog.value

              }
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
      
    })
   
}


all_content.innerHTML=""
let title = document.createElement('h3')
all_content.appendChild(title)

title.innerText="Welcome to Our Gardening Blogs"
title.classList.add("text-center" , "homepage-title","mt-5")
bg_container_image.classList.add('bg-img-container')


function createUserPage(id,personal_user){
    all_content.innerHTML=""
 
    let username_title = document.createElement("h2")
    
    
    username_title.textContent="Welcome to your personal page, " +  personal_user



    all_content.innerHTML=""
    all_content.appendChild(username_title)
    bg_container_image.classList.remove('bg-img-container')
    fetch(`https://66e8028eb17821a9d9daf072.mockapi.io/blogs/?userId=${id}`)
    .then(res =>res.json())
    .then ( data =>{
        console.log(data)
        
        data.forEach(blog =>{
         
            console.log(blog)
            let bg =document.createElement("div")
            let main_div =document.createElement("div")
            let circle_div =document.createElement("div")
           
            let title = document.createElement("h3")
            let username = document.createElement("h5")
            let p_content = document.createElement("p")
            let delete_button = document.createElement("button")
            delete_button.classList.add("btn",'btn-danger')
            
            

            // all_content.appendChild(bg)
            all_content.classList.add("col-12")
           
            all_content.appendChild(main_div)
            main_div.classList.add("col-10", "row", "d-flex", "justify-content-center", "bg-yellow","mt-3")
            main_div.appendChild(title)
            main_div.appendChild(username)
        
            // main_div.appendChild(circle_div)
            main_div.appendChild(p_content)
            p_content.style.backgroundColor="#f9f9e9"
            p_content.style.borderRadius="40px"
            main_div.appendChild(delete_button)
            delete_button.textContent="Delete!"
            delete_button.classList.add("col-4")
            

            circle_div.classList.add("clip-circle")
            circle_div.style.backgroundImage=`url(${data.photo})`
            title.classList.add("col-12","main-title")

            title.textContent = blog.blog.title

            p_content.textContent = blog.blog.text
            username.textContent = "by: "+ blog.username


            delete_button.addEventListener("click",()=>{
                fetch(`https://66e8028eb17821a9d9daf072.mockapi.io/blogs/${blog.id}`, {
                    method: 'DELETE',
                  })
                  .then(res=>res.json())
                  .then(data =>  createUserPage(id,personal_user))
                 

            })
            // <!-- <div class="bg-img-container col-12">
            // </div>
      
            // <div class="col-12 row d-flex justify-content-center bg-yellow ">
            //     <div class="col-12 main-title" > Gardening blog</div>
              
            //     <div class="clip-circle"></div>
            //     <p class="blog">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sed, ratione rerum hic cumque veniam ducimus. Et necessitatibus architecto inventore quas sunt aliquid qui nobis voluptatum veniam, eum numquam perspiciatis!</p>
               
            // </div> -->

      
        })
    })


    
}


