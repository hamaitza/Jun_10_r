let login_container = document.querySelector(".left-container");
let register_form = document.querySelector(".register-container");
let alternate_login = document.querySelector(".alternate-login");
let register_button = document.querySelector(".register-button");
let login_form = document.querySelector(".login-container");
let login_button = document.querySelector(".login-button");
let alternate_register = document.querySelector(".alternate-register");
let close_button_1 = document.querySelector(".close-button-1");
let close_button_2 = document.querySelector(".close-button-2");
let close_button_3 = document.querySelector(".close-button-3");
let user_box = document.querySelector(".user-box");
let user_page = document.querySelector(".user-page-container");
let disconnect_button = document.querySelector(".disconnect-button");

let ok = 0;
let user_id = localStorage.getItem("session");
if(user_id === "0") {
    user_box.classList.remove("active");
}
else{
    user_box.classList.add("active");
}
    
let login_nickname = '';
async function new_connected_user() {

    const request = new Request('http://localhost:8080/users/user');
    const response = await fetch(request);
    const temp = await response.json();
    localStorage.setItem("session", temp['id']);
    ok = 0;
}

async function connected_user() {

    const request = new Request('http://localhost:8080/users/nickname/'  + login_nickname);
  
    const response = await fetch(request);
    const temp = await response.json();
    localStorage.setItem("session", temp['id']);
    ok = 0;
}

login_container.addEventListener('click', () => {
    register_form.classList.add("active");
});

alternate_login.addEventListener('click', () => {
    register_form.classList.remove("active");
    login_form.classList.add("active");
});

register_button.addEventListener('click', () => {
    
    var object = new Object();
    let name = document.getElementsByClassName("name")[0];
    let nickname = document.getElementsByClassName("nickname")[0];
    let email = document.getElementsByClassName("email")[0];
    let password = document.getElementsByClassName("password")[0];
    let phone = document.getElementsByClassName("phone")[0];
    object.name = name.value;
    object.nickname = nickname.value;
    object.email = email.value;
    object.password = password.value;
    object.phone = phone.value;

    fetch("http://localhost:8080/users/add", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(object)
      }).then(res => {
        const reader = res.body.getReader();
        let data = '';
        reader.read().then(function processResult(result) {
          if (result.done) {
            const value = data;
            if(value[1] === "2"){
                new_connected_user();
                user_box.classList.add("active");
                register_form.classList.remove("active");
            } 
            else{
                let name = document.getElementsByClassName("alert-container")[0];
                let alert_button = document.getElementsByClassName("alert-container-button")[0];
                name.classList.add("active");
                alert_button.addEventListener('click', () => {
                    name.classList.remove("active");
                });
            }    
            return;
          }
          const chunk = result.value;
          data += chunk;
          return reader.read().then(processResult);
        });
      });
});

login_button.addEventListener('click', () => {
    var object = new Object();
    let nickname = document.getElementsByClassName("login-name")[0];
    let password = document.getElementsByClassName("login-password")[0];

    login_nickname = nickname.value;
    object.name = "";
    object.nickname = nickname.value;
    object.email = "";
    object.password = password.value;
    object.phone = "";
    fetch("http://localhost:8080/users/connect", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(object)
      }).then(res => {
        const reader = res.body.getReader();
        let data = '';
        reader.read().then(function processResult(result) {
          if (result.done) {
            const value = data;
            if(value[1] === "2"){
               connected_user();
               user_box.classList.add("active");
               login_form.classList.remove("active");
            } 
            else if(value[1] == "1"){
                let name = document.getElementsByClassName("alert-container")[0];
                let alert_button = document.getElementsByClassName("alert-container-button")[0];
                name.classList.add("active");
                alert_button.addEventListener('click', () => {
                    name.classList.remove("active");
                });
            }    
            return;
          }
          const chunk = result.value;
          data += chunk;
          return reader.read().then(processResult);
        });
      });

});

alternate_register.addEventListener('click', () => {
    login_form.classList.remove("active");
    register_form.classList.add("active");
});

close_button_1.addEventListener('click', () => {
    register_form.classList.remove("active");
});

close_button_2.addEventListener('click', () => {
    login_form.classList.remove("active");
});

async function user_details() {
    user_id = localStorage.getItem("session");
    localStorage.setItem("session", user_id);
    const request = new Request('http://localhost:8080/users/id/' + user_id);
    const response = await fetch(request);
    const temp = await response.json();
    let user_name = document.getElementsByClassName("user_name")[0];
    let user_email = document.getElementsByClassName("user_email")[0];
    let user_phone = document.getElementsByClassName("user_phone")[0];
    
    let user_nickname = document.getElementsByClassName("user-page-nickname")[0];

    user_name.innerHTML = "Nume: " + temp['name'];
    user_email.innerHTML = "E-mail: " + temp['email'];
    user_phone.innerHTML = "Telefon: " + temp['phone'];
    
    user_nickname.innerHTML = temp['nickname'];


}

async function user_exercices() {
    
    console.log(user_id);    
    var exercice_container = document.getElementsByClassName("user-exercices-container")[0];
    let user_exercices = document.getElementsByClassName("user_exercices")[0];
    const request = new Request('http://localhost:8080/exercices/id/' + user_id);
    const response = await fetch(request);
    const temp = await response.json();
    for(var i = 0; i < temp.length; i++){
        var exercice = document.createElement("h2");
        exercice.innerHTML= `
        <h2 class="user-individual-exercice"> ${temp[i]['exerciceName']} </h2>
       `;
       exercice_container.append(exercice);
    }
    if(temp.length === 0){
        exercice_container.innerHTML = "";
    }
    user_exercices.innerHTML = "Probleme rezolvate: " + temp.length;
    
    
}



user_box.addEventListener('click', () => {
    user_page.classList.add("active");
    user_details();
    console.log(ok);
    if(ok === 0){
        user_exercices();
        ok = 1;
    }
    
    
});

close_button_3.addEventListener('click', () => {
    user_page.classList.remove("active");
});

disconnect_button.addEventListener('click', () => {
    localStorage.setItem("session", 0);
    user_page.classList.remove("active");
    user_box.classList.remove("active");
});
