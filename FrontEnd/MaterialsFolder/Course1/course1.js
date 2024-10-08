
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
    user_id = localStorage.getItem("session");
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
    user_exercices.innerHTML = "Probleme rezolvate: " + temp.length;
    
    
}



user_box.addEventListener('click', () => {
    user_page.classList.add("active");
    user_details();
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
