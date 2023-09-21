const form = document.querySelector("#auth-form");
const formUserName = form.querySelector(".auth-name");
const formUserEmail = form.querySelector(".auth-email");
const formUserPassword = form.querySelector(".auth-password");
const formUserAvatarURL = form.querySelector(".auth-avatar");
const authAlert = form.querySelector(".auth-alert");
const authError = form.querySelector(".auth-error");
const authBtn = form.querySelector("[type='submit']");

form.addEventListener("submit", createNewUser);

function createNewUser(e){
  e.preventDefault();
  authBtn.setAttribute("disabled", true);
  authError.style.display = "none";
  fetch("https://api.escuelajs.co/api/v1/users/", 
    {
      method: "POST",
      body: JSON.stringify(
        {
          name: formUserName.value,
          email: formUserEmail.value,
          password: formUserPassword.value,
          avatar: formUserAvatarURL.value
        }  
      ),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      if(data.id){
        authAlert.style.display = "block";
        setTimeout(() => {
          window.location.replace(window.location.origin + "/pages/login.html")
        }, 1500)
      }
      else{
        authError.style.display = "block";
        authBtn.removeAttribute("disabled");
        form.reset();
      }
    })
}
