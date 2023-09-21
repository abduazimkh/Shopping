const form = document.querySelector("#auth-form");
const formUserEmail = form.querySelector(".auth-email");
const formUserPassword = form.querySelector(".auth-password");
const authAlert = form.querySelector(".auth-alert");
const authError = form.querySelector(".auth-error");
const authBtn = form.querySelector("[type='submit']");

form.addEventListener("submit", loginUser);

function loginUser(e){
  e.preventDefault();

  authError.style.display = "none";
  authBtn.setAttribute("disabled", true);
  fetch("https://api.escuelajs.co/api/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: formUserEmail.value,
        password: formUserPassword.value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
  ).then(response => response.json())
    .then(data => {
      if(data.access_token){
        authAlert.style.display = "block";
        localStorage.setItem("user-auth-token", data.access_token);
        setTimeout(() => {
          window.location.replace(window.location.origin + "/index.html")
        }, 1500)
      }
      else{
        authError.style.display = "block";
        authBtn.removeAttribute("disabled");
        form.reset();
      }
    })
}