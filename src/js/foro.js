import {auth, provider,db} from './fb.js'
import {getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

var bodys=document.getElementById('base1');
onAuthStateChanged(auth, (user) => {
if (user && location.pathname=='/foro.html'){
bodys.innerHTML=/*html*/`<!-- Button trigger modal -->
<div class="text-end pt-1">
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
+ Nueva publicación
</button>
</div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
`;
}else if(location.pathname=='/foro.html'){
    bodys.innerHTML=/*html*/`<div class="card bg-danger bg-opacity-75">
    <div class="card-header">
      Fallo de sesión
    </div>
    <div class="card-body">
      <h5 class="card-title">Aún no inicia sesión</h5>
      <p class="card-text">Debes iniciar sesión para poder acceder al contenido.</p>
    </div>
  </div>`;

}
})