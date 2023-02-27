import { auth, provider, db } from "./fb.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {
  getFirestore,
  query,
  orderBy,
  doc, deleteDoc, updateDoc, deleteField,
  setDoc,
  collection,
  getDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

var bodys = document.getElementById("base1");

onAuthStateChanged(auth, (user) => {

  if (user && location.pathname == "/formularios.html") {
    var docRef = doc(db, "datos-bebe", user.uid);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          var part2de1 = "";
          bodys.innerHTML = /*html*/ `
            <div class="text-end pt-1" >
              <a type="button" class="btn btn-primary" href="./info-bb.html">
                Terminar
              </a>
            </div>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Datos principales del bebé
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <!--formulario de datos generales del bebé-->
                    <form class="row g-3">
                      <div class="col-md-4">
                        <label for="validationNombre" class="form-label">Nombre(s) del bebé</label>
                        <input type="text" class="form-control" id="nombre_bebe" value="${docSnap.data().nombre
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="validationApellidos" class="form-label">Apellido paterno</label>
                  <input type="text" class="form-control" id="apellido_bebe" value="${docSnap.data().apellido1
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="validationApellidos2" class="form-label">Apellido materno</label>
                  <input type="text" class="form-control" id="apellido2_bebe" value="${docSnap.data().apellido2
            }" required>
              </div>
              <div class="col-md-2">
                <label for="validationEdad" class="form-label">Edad</label>
                <div class="input-group">
                  <input type="int" pattern="[0-9]+" title="Ingrese solo números" class="form-control" id="edad" value="${docSnap.data().edad
            }" required>
                  <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >Años</span>
                </div>
              </div>
              <div class="col-md-2">
                <label for="validationFechaNac" class="form-label">Fecha de Nacimiento</label>
                <input type="date" class="form-control" id="fecha_nacimiento" value="${docSnap.data().fecha
            }" required>
              </div>
              <div class="col-md-2">
                <label for="validationPeso" class="form-label">Peso</label>
                <div class="input-group">
                  <input type="text" pattern="[0-9]+([,\.][0-9]+)?" title="Ingrese solo números" class="form-control" id="peso" value="${docSnap.data().peso
            }" aria-describedby="inputGroupPrepend2" required>
              <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >Kg</span>
            </div>
          </div>
            <div class="col-md-2">
              <label for="validationEdad" class="form-label">Altura</label>
              <div class="input-group">
                <input type="int" pattern="[0-9]+([,\.][0-9]+)?"  title="Ingrese solo números" class="form-control" id="altura" value="${docSnap.data().altura
            }" required>
            <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2">Metros</span>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" id="btn1">Guardar</button>
        </div>
      </form> 
    </div>
  </div>
</div>
<!--Segunda pestaña de acordeon-->
<div class="accordion-item">
  <h2 class="accordion-header" id="headingTwo">
    <button class="accordion-button collapsed" type="button" id="mostrar_vacunas" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Historial de vacunación
    </button>
  </h2>
  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
    <!--lista iterable de vacunas-->
    <div id="lista_Vac" class="d-flex flex-wrap"></div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar nueva vacuna</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3">
              <div class="col-md-4">
                <label for="nombre_vacuna" class="form-label">Nombre/Tipo de vacuna</label>
                <input type="text" class="form-control" id="nombre_vacuna" required>
              </div>
              <div class="col-md-4">
                <label for="nombre_aplicador" class="form-label">Nombre de quien aplico la vacuna</label>
                <input type="text" class="form-control" id="nombre_aplicador" required>
              </div>
              <div class="col-md-4">
                <label for="lugar_aplicacion" class="form-label">Lugar donde se aplico la vacuna</label>
                <input type="text" class="form-control" id="lugar_aplicacion" required>
              </div>
              <div class="col-md-4">
                <label for="fecha_dosis" class="form-label">Fecha de dosis</label>
                <input type="date" class="form-control" id="fecha_dosis" required>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" id="btn2">Submit form</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-body">
      <div class="col-12">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar nueva vacuna</button>
      </div>
    </div>
  </div>
</div>
</div>`;
          /* 
          <!--Tercera pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Revisión pediatrica
          </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
          </div>
          </div>
          <!--Cuarta pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Datos de pediatra
          </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
          </div>
          </div>
          <!--Quinta pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingFive">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Medicamentos
          </button>
          </h2>
          <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
          </div>
          </div>
          <!--Sexta pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingSix">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          Guarderia
          </button>
          </h2>
          <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
          </div>
          </div>
          <!--Septima pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingSeven">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
          Alergias
          </button>
          </h2>
          <div id="collapseSeven" class="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
          </div>
          </div>
          <!--Octava pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingEight">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
          Control de sueño
          </button>
          </h2>
          <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
          </div>
          </div>
          <!--Novena pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingNine">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
          Contacto de emergencia
          </button>
          </h2>
          <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
          </div>
          </div>
          <!--Decima pestaña de acordeon-->
          <div class="accordion-item">
          <h2 class="accordion-header" id="headingTen">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
          Dummy
          </button>
          </h2>
          <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
          <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
                </div> */
          //console.log("Document data:", docSnap.data());
          /* Datos generales del bebé */
          var btn1 = document.getElementById("btn1");
          btn1.addEventListener("click", function (event) {
            event.preventDefault();
            setDoc(doc(db, "datos-bebe", user.uid), {
              nombre: document.getElementById("nombre_bebe").value,
              apellido1: document.getElementById("apellido_bebe").value,
              apellido2: document.getElementById("apellido2_bebe").value,
              edad: document.getElementById("edad").value,
              fecha: document.getElementById("fecha_nacimiento").value,
              peso: document.getElementById("peso").value,
              altura: document.getElementById("altura").value,
            });
          });
          /* Datos de vacunación Subcolección*/
          /**consulta */
          //Vacunas lista de ellas
          const userDocRef1 = doc(db, "datos-bebe", user.uid);
          const vacunasCollectionRef1 = collection(userDocRef1, "vacunas");
          const orderedVacunasCollectionRef = query(vacunasCollectionRef1, orderBy("fechaVacuna", "asc"));
          document.getElementById('mostrar_vacunas').addEventListener('click', function () {
            getDocs(orderedVacunasCollectionRef).then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById('lista_Vac').innerHTML += /*html*/`<div class="col"><div class="card bg-primary bg-opacity-75" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${doc.data().nombre}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${doc.data().fechaVacuna}</h6>
            <p class="card-text">Aplico ${doc.data().nombreAplicador} en ${doc.data().lugarAplicacion}</p>
            <input type="text" class="form-control" id="id_vac" value="${doc.id}" hidden>
            <button  class="btn btn-outline-danger" id="EliminaVac">Eliminar</button>
            <button class="btn btn-outline-danger" onclick="bye('${doc.id}','${user.uid}',)">s</button>


            </div>
            </div>
            </div>`;
              });
              var bye=(a,b)=>{
                alert(a);
              }
            }).catch((error) => {
              console.log("Error getting documents:", error);
            })
          });

          /**formulario */

          var btn2 = document.getElementById("btn2");
          var cuentaV = '';
          btn2.addEventListener("click", function (event) {
            event.preventDefault();
            const userDocRef = doc(db, "datos-bebe", user.uid);
            const vacunasCollectionRef = collection(userDocRef, "vacunas");
            getDocs(vacunasCollectionRef).then((querySnapshot) => {
              console.log("Number of vacunas:", querySnapshot.size);
              let conta = querySnapshot.size + 1;
              cuentaV = 'Vacuna ' + conta;
              setDoc(doc(db, "datos-bebe", user.uid, "vacunas", cuentaV), {
                nombre: document.getElementById('nombre_vacuna').value,
                nombreAplicador: document.getElementById('nombre_aplicador').value,
                fechaVacuna: document.getElementById('fecha_dosis').value,
                lugarAplicacion: document.getElementById('lugar_aplicacion').value,
              });
            }).catch((error) => {
              console.log("Error getting documents:", error);
            });
          });
          /* Datos  Revisión pediatrica Subcolección*/
          /* Datos  Pediatra*/
          /* Datos  Medicamentos Subcolección*/
          /* Datos  Guarderia*/
          /* Datos  alergias Subcoleccion*/
          /* Datos  control de sueño Subcolección con Subcolección*/
          /* Datos  contacto de emergencia*/
        } else {
          bodys.innerHTML = /*html*/ `
<div class="text-end pt-1" >
  <a type="button" class="btn btn-primary" href="./info-bb.html">
    Terminar
  </a>
</div>
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Datos principales del bebé
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <!--formulario de datos generales del bebé-->
        <form class="row g-3">
          <div class="col-md-4">
            <label for="validationNombre" class="form-label">Nombre(s) del bebé</label>
            <input type="text" class="form-control" id="nombre_bebe" required>
          </div>
          <div class="col-md-4">
            <label for="validationApellidos" class="form-label">Apellido paterno</label>
            <input type="text" class="form-control" id="apellido_bebe" required>
          </div>
          <div class="col-md-4">
            <label for="validationApellidos2" class="form-label">Apellido materno</label>
            <input type="text" class="form-control" id="apellido2_bebe" required>
          </div>
          <div class="col-md-2">
            <label for="validationEdad" class="form-label">Edad</label>
            <input type="int" pattern="[0-9]+" title="Ingrese solo números" class="form-control" id="edad" required>
          </div>
          <div class="col-md-2">
            <label for="validationFechaNac" class="form-label">Fecha de Nacimiento</label>
            <input type="date" class="form-control" id="fecha_nacimiento" required>
          </div>
          <div class="col-md-2">
            <label for="validationPeso" class="form-label">Peso</label>
            <div class="input-group">
              <input type="text" pattern="[0-9]+([,\.][0-9]+)?" title="Ingrese solo números" class="form-control" id="peso" aria-describedby="inputGroupPrepend2" required>
              <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >Kg</span>
            </div>
          </div>
          <div class="col-md-2">
            <label for="validationEdad" class="form-label">Altura</label>
            <div class="input-group">
              <input type="int" pattern="[0-9]+([,\.][0-9]+)?"  title="Ingrese solo números" class="form-control" id="altura" required>
              <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2">Metros</span>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit" id="btn1">Guardar</button>
          </div>
        </form> 
      </div>
    </div>
  </div>
</div>`;

          //formulario 1
          var nom = document.getElementById("nombre_bebe");
          nom.addEventListener("focus", () => {
            setDoc(doc(db, "datos-bebe", user.uid), {
              nombre: '',
            });
          });
          /* Datos generales del bebé */
          var btn1 = document.getElementById("btn1");
          btn1.addEventListener("click", () => {
            setDoc(doc(db, "datos-bebe", user.uid), {
              nombre: document.getElementById("nombre_bebe").value,
              apellido1: document.getElementById("apellido_bebe").value,
              apellido2: document.getElementById("apellido2_bebe").value,
              edad: document.getElementById("edad").value,
              fecha: document.getElementById("fecha_nacimiento").value,
              peso: document.getElementById("peso").value,
              altura: document.getElementById("altura").value,
            });
          });
          /* Datos de vacunación Subcolección*/
          /* Datos  Revisión pediatrica Subcolección*/
          /* Datos  Pediatra*/
          /* Datos  Medicamentos Subcolección*/
          /* Datos  Guarderia*/
          /* Datos  alergias*/
          /* Datos  control de sueño Subcolección con Subcolección*/
          /* Datos  contacto de emergencia*/
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else if (location.pathname == "/formularios.html") {
    bodys.innerHTML = /*html*/ `<div class="card bg-danger bg-opacity-75 text-center">
        <div class="card-header">
          Fallo de sesión
        </div>
        <div class="card-body">
          <h5 class="card-title">Aún no inicia sesión</h5>
          <p class="card-text">Debes iniciar sesión para poder acceder al contenido.</p>
        </div>
      </div>`;
  }
});

