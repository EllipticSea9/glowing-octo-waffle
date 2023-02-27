import {auth, provider,db} from './fb.js'
import {getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

var nav=document.getElementById('nav');
export var sesd=false;

//footer
var footer = document.getElementById('footer');
footer.innerHTML=` <footer class="bg-primary bg-opacity-75 text-center text-dark text-lg-start">
<div class="container pt-4">
  <div class="row">
    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
      <h5 class="text-uppercase">HELLO MOMY</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. 
      </p>
    </div>
    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
      <h5 class="text-uppercase">Enlaces útiles</h5>
      <ul class="list-unstyled mb-0">
        <li>
          <a href="#!" class="text-dark">Link 1</a>
        </li>
        <li>
          <a href="#!" class="text-dark">Link 2</a>
        </li>
      </ul>
    </div>
    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
      <h5 class="text-uppercase">Redes sociales</h5>
      <ul class="list-unstyled mb-0">
        <li>
          <a href="#!" class="text-dark">Facebook</a>
        </li>
        <li>
          <a href="#!" class="text-dark">Twitter</a>
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
  © 2023 LINKCRAFT
</div>
</footer>`


onAuthStateChanged(auth, (user) => {
if (user) {
//alert('Ok');
nav.innerHTML=/*html*/`<nav class="navbar navbar-expand-lg bg-primary bg-opacity-75 " data-bs-theme="light">
<div class="container-fluid">
  <a class="navbar-brand fs-4" href="#">Hello Momy</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="./Index.html">Inicio</a>
      </li>
    </ul>
    <ul>  
    <a class="btn btn-outline-light" href="./foro.html">Foro</a>
      <a class="btn btn-outline-light" href="./info-bb.html">Mi bebé</a>
      <button class="btn btn-danger" id="salir">Salir</button>
      </ul>
  </div>
</div>
</nav>`

var salir=document.getElementById('salir');
salir.addEventListener('click', ()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
})

}else{
    nav.innerHTML=
    /*html*/`<nav class="navbar navbar-expand-lg bg-primary bg-opacity-75 " data-bs-theme="light">
    <div class="container-fluid">
      <a class="navbar-brand fs-4" href="./Index.html">Hello Momy</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="./Index.html">Inicio</a>
          </li>
        </ul>
        <ul>  
          <a class="btn btn-outline-light" href="./foro.html">Foro</a>
          <button class="btn btn-success" id="acceder">Acceder</button>
          </ul>
      </div>
    </div>
  </nav>`

  var acceder=document.getElementById('acceder');
  acceder.addEventListener('click', ()=>{
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  })
  sesd=false;
}});