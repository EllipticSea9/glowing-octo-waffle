
import {auth, provider,db} from './fb.js'
import {getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

var bodys=document.getElementById('base1');
onAuthStateChanged(auth, (user) => {
if (user && location.pathname=='/Index.html'){
bodys.innerHTML=/*html*/`<h1><p class="fs-1">¿Madre primeriza?</p></h1>
<button type="button" class="btn btn-secondary">Comienza aquí</button>
<br>
<h5><p class="fs-5">Video introductorio</p></h5>
<iframe width="560" height="315" src="https://www.youtube.com/embed/c03UDhalVD4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
`;
}else if(location.pathname=='/Index.html'){
    bodys.innerHTML=/*html*/`<h1><p class="fs-1">¿Madre primeriza?</p></h1>
    <button type="button" class="btn btn-secondary" id="acceder">Comienza aquí</button>
    <br>
    <h5><p class="fs-5">Video introductorio</p></h5>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/c03UDhalVD4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

    `;
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


}
})