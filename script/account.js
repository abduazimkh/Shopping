const profileName = document.querySelector("#profile-name");
const profileId = document.querySelector("#profile-id");
const profileAvatar = document.querySelector("#profile-avatar");
const profileEmail = document.querySelector("#profile-email");
const profileRole = document.querySelector("#profile-role");
const signOutBtn = document.querySelector("#signout-btn");

fetch("https://api.escuelajs.co/api/v1/auth/profile", 
  {
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem("user-auth-token")}`
    }
  }
)
  .then(response => response.json())
  .then(data => renderProfileData(data))

function renderProfileData(profileData){
  profileId.innerHTML = profileData.id
  profileName.innerHTML = profileData.name;
  profileRole.innerHTML = profileData.role;
  profileEmail.innerHTML = profileData.email;
  profileEmail.setAttribute("href", "mailto:" + profileData.email); 
  profileAvatar.src = profileData.avatar; 
};

(() => {
  if(localStorage.getItem("user-auth-token") && JSON.parse(window.atob(localStorage.getItem("user-auth-token").split(".")[1])).exp < (new Date().getTime() + 1) / 1000){
    localStorage.removeItem("user-auth-token");
  }

  if(!localStorage.getItem("user-auth-token")){
    window.location.replace(window.location.origin + "/pages/login.html")
  }
})();

signOutBtn.addEventListener("click", () => {
  const userAgreeToSignOut = confirm("Are you sure to sign out from your account?");
  if(userAgreeToSignOut){
    localStorage.removeItem("user-auth-token");
    window.location.replace(window.location.origin + "/index.html");
  }
});