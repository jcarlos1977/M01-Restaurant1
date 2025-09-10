

window.addEventListener('DOMContentLoaded', () => {
const header = document.querySelector('.sticky-header');
const mostrarBtn = document.getElementById('mostrar-header-btn');

// Ocultar el header y mostrar el botón flotante
function ocultarHeader() {
  header.classList.add('hidden-header');
  mostrarBtn.style.display = 'block';
}

// Mostrar el header y ocultar el botón flotante
window.mostrarHeader = function () {
  header.classList.remove('hidden-header');
  mostrarBtn.style.display = 'none';
};

// Asignar eventos a los botones que deben ocultar el header
document.getElementById('btn-menu').addEventListener('click', ocultarHeader);
document.getElementById('btn-tomadas').addEventListener('click', ocultarHeader);
document.getElementById('btn-cocina').addEventListener('click', ocultarHeader);
document.getElementById('btn-cerradas').addEventListener('click', ocultarHeader);

document.getElementById('btn-menu2').addEventListener('click', ocultarHeader);
document.getElementById('btn-tomadas2').addEventListener('click', ocultarHeader);
document.getElementById('btn-cocina2').addEventListener('click', ocultarHeader);
document.getElementById('btn-cerradas2').addEventListener('click', ocultarHeader);

// Al cargar la página, el botón flotante debe estar oculto
mostrarBtn.style.display = 'none';
});

// firebase Configation
const firebaseConfig = {
apiKey: "AIzaSyBcWtL3B5aNVpEV0ahXSaP3pK00lEbb6rM",
authDomain: "restauranteapp-ad17d.firebaseapp.com",
projectId: "restauranteapp-ad17d",
storageBucket: "restauranteapp-ad17d.firebasestorage.app",
messagingSenderId: "132764157748",
appId: "1:132764157748:web:8e0d891c0747ecd681c761"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//Funcion modificada para la orden flotante del encabezado
function generarNumeroOrden() {
limpiarEncabezado(); // Limpia encabezado
limpiarModal();      // Limpia modal

const usadas = new Set((tomadas || []).map(o => o.orden));
let nuevoNumero;
let intentos = 0;

do {
nuevoNumero = Math.floor(Math.random() * 9000) + 1000;
intentos++;
if (intentos > 10000) {
alert("Demasiados intentos. No se pudo generar un número único.");
return;
}
} while (usadas.has(nuevoNumero.toString()));

// Asignar al input del encabezado
document.getElementById("numeroOrdenGlobal").value = nuevoNumero;

// Asignar al input del modal
document.getElementById("modalOrdenInput").value = nuevoNumero;

// Mostrar el modal
document.getElementById("modalOverlay").style.display = "flex";
}



// Función para cerrar el modal
function cerrarModalOrden() {
const modal = document.getElementById("modalOverlay");
if (modal) {
modal.style.display = "none";
} else {
console.warn("No se encontró el modal con id 'modalOverlay'");
}
}



function copiarDatosAlHeader() {
document.getElementById("nombreClienteGlobal").value = document.getElementById("modalCliente").value;
document.getElementById("numeroMesaGlobal").value = document.getElementById("modalMesa").value;
document.getElementById("numeroOrdenGlobal").value = document.getElementById("modalOrdenInput").value;
document.getElementById("nombreMeseroGlobal").value = document.getElementById("modalMesero").value;

cerrarModalOrden();
}


function cerrarModal() {
document.getElementById("modalOrden").parentElement.parentElement.style.display = "none";
}

function limpiarEncabezado() {
document.getElementById("nombreClienteGlobal").value = "";
document.getElementById("numeroMesaGlobal").value = "";
document.getElementById("numeroOrdenGlobal").value = "";
document.getElementById("nombreMeseroGlobal").value = "";
}

function limpiarModal() {
document.getElementById("modalCliente").value = "";
document.getElementById("modalMesa").value = "";
document.getElementById("modalMesero").value = "";
document.getElementById("modalOrdenInput").value = ""; // Aunque se sobreescribe, mejor dejarlo limpio
}




//New lines para contador de ordenes

function listenToCocinaCountRealtime(userId) {
const docRef = firebase.firestore().collection("ordenesEstado").doc(userId);
const contadorElemento = document.getElementById("contador-en-cocina");

docRef.onSnapshot((doc) => {
if (doc.exists) {
const data = doc.data();
const cocinaActual = data.enCocina || [];
contadorElemento.textContent = `👨‍🍳 Cantidad de Ordenes En cocina: ${cocinaActual.length}`;
} else {
contadorElemento.textContent = "👨‍🍳 En cocina: 0";
}
});

}


let menuData = [
{ nombre: "Huevos Divorciados Regulares", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos Divorciados Con Mole", precio: 6.99, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos Estrellados Regulares", precio: 5.50, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos Estrellados Speciales", precio: 6.50, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos a la Mexicana", precio: 6.75, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Chorizo", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Jamon", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Salchicha", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Tozino", precio: 6.0, familia: "Desayunos" },/*Modifide*/

{ nombre: "Tacos al Pastor", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Asada", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Pollo", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Tripa", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Cabeza", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Chorizo", precio: 1.25, familia: "Tacos" },/*Modifide*/

{ nombre: "Sopes de Asada", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Pollo Desebrado", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Pollo Asado", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes al Pastos", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Tinga", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Chorizo", precio: 3.50, familia: "Sopes" },/*Modifide*/

{ nombre: "Burrito de Asada", precio: 6.85, familia: "Burritos" },/*Modifide*/
{ nombre: "Burrito de Pollo", precio: 6.85, familia: "Burritos" },/*Modifide*/
{ nombre: "Burrito al Pastor", precio: 6.85, familia: "Burritos" },/*Modifide*/           
{ nombre: "Wet Burrito Green ", precio: 7.75, familia: "Burritos" },/*Modifide*/
{ nombre: "Wet Burrito Red", precio: 7.75, familia: "Burritos" },/*Modifide*/      

{ nombre: "Caldo de Pollo", precio: 9.20, familia: "Caldos" },/*Modifide*/
{ nombre: "Caldo de Res", precio: 9.20, familia: "Caldos" },/*Modifide*/
{ nombre: "Pozole", precio: 9.20, familia: "Caldos" },/*Modifide*/
{ nombre: "Menudo", precio: 9.20, familia: "Caldos" },/*Modifide*/

{ nombre: "Enchiladas", precio: 7.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Enchiladas con Mole", precio: 8.50, familia: "Platillos" },/*Modifide*/ 
{ nombre: "Flautas", precio: 7.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Pipian", precio: 8.50, familia: "Platillos" },/*Modifide*/
{ nombre: "Mole", precio: 8.50, familia: "Platillos" },/*Modifide*/
{ nombre: "Pechuga Asada", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Pechuga Empanizada", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Costillas en Salsa Roja", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Costillas en Salsa Verde", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Arranchera con Chile Relleno", precio: 11.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Lomo Enchilado", precio: 7.99, familia: "Platillos" },/*Modifide*/
{ nombre: "Carne Asada", precio: 9.99, familia: "Platillos" },/*Modifide*/
{ nombre: "Tostada", precio: 3.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Chile Relleno", precio: 7.99, familia: "Platillos" },/*Modifide*/
{ nombre: "Ranchera con Chile Relleno", precio: 7.99, familia: "Platillos" },/*Modifide*/

{ nombre: "Quesadillas", precio: 3.95, familia: "Platillos" },/*Modifide*/      
{ nombre: "Quesadillas Con Carne", precio: 5.75, familia: "Platillos" },/*Modifide*/
{ nombre: "Quesadillas Con Carne Fri Y Arroz", precio: 7.50, familia: "Platillos" },/*Modifide*/

{ nombre: "Chilaquiles Simples", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Huevos Estrellados", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Pollo", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Huevos Revueltos", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Ranchera", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Asada", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/      

{ nombre: "Tortas de Milanesa", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Pierna", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Jamon", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Carne Asada", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Ranchera", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Pechuga Asada", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Pechuga Empanizada", precio: 6.0, familia: "Tortas" },/*Modifide*/

{ nombre: "Cubanas de Pierna", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/
{ nombre: "Cubanas de Jamon", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/
{ nombre: "Cubanas de Milanesa", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/
{ nombre: "Cubanas de Asada", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/

{ nombre: "Cemitas de Milanesa", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Pierna", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Jamon", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Asada", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Ranchera", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Pollo Asado", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Pollo Empanizado", precio: 7.50, familia: "Cemitas" },/*Modifide*/


{ nombre: "Agua de Orchata", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Jamaica", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Tamarindo", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Piña", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Limon", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Soda de Botella", precio: 1.50, familia: "Bebidas" },/*Modifide*/
{ nombre: "Soda de Lata", precio: 1.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Fresa", precio: 3.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Platano", precio: 3.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Mango", precio: 3.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Piña", precio: 3.0, familia: "Bebidas" },/*Modifide*/

{ nombre: "Chamango", precio: 3.50, familia: "Antojitos" },/*Modifide*/
{ nombre: "Fruta Chica", precio: 3.0, familia: "Antojitos" },/*Modifide*/
{ nombre: "Fruta Grande", precio: 5.0, familia: "Antojitos" },/*Modifide*/    
{ nombre: "Tostilocos", precio: 5.0, familia: "Antojitos" },/*Modifide*/
{ nombre: "Bionico Chico", precio: 4.0, familia: "Antojitos" },/*Modifide*/   
{ nombre: "Bionico Grande", precio: 5.0, familia: "Antojitos" }/*Modifide*/ 

]; // Esto se llena al cargar tu menú, por ejemplo desde Firebase o un archivo JSON

const productos = [

{ nombre: "Huevos Divorciados Regulares", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos Divorciados Con Mole", precio: 6.99, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos Estrellados Regulares", precio: 5.50, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos Estrellados Speciales", precio: 6.50, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos a la Mexicana", precio: 6.75, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Chorizo", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Jamon", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Salchicha", precio: 6.0, familia: "Desayunos" },/*Modifide*/
{ nombre: "Huevos con Tozino", precio: 6.0, familia: "Desayunos" },/*Modifide*/

{ nombre: "Tacos al Pastor", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Asada", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Pollo", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Tripa", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Cabeza", precio: 1.25, familia: "Tacos" },/*Modifide*/
{ nombre: "Tacos de Chorizo", precio: 1.25, familia: "Tacos" },/*Modifide*/

{ nombre: "Sopes de Asada", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Pollo Desebrado", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Pollo Asado", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes al Pastos", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Tinga", precio: 3.50, familia: "Sopes" },/*Modifide*/
{ nombre: "Sopes Chorizo", precio: 3.50, familia: "Sopes" },/*Modifide*/

{ nombre: "Burrito de Asada", precio: 6.85, familia: "Burritos" },/*Modifide*/
{ nombre: "Burrito de Pollo", precio: 6.85, familia: "Burritos" },/*Modifide*/
{ nombre: "Burrito al Pastor", precio: 6.85, familia: "Burritos" },/*Modifide*/           
{ nombre: "Wet Burrito Green", precio: 7.75, familia: "Burritos" },/*Modifide*/
{ nombre: "Wet Burrito Red", precio: 7.75, familia: "Burritos" },/*Modifide*/      

{ nombre: "Caldo de Pollo", precio: 9.20, familia: "Caldos" },/*Modifide*/
{ nombre: "Caldo de Res", precio: 9.20, familia: "Caldos" },/*Modifide*/
{ nombre: "Pozole", precio: 9.20, familia: "Caldos" },/*Modifide*/
{ nombre: "Menudo", precio: 9.20, familia: "Caldos" },/*Modifide*/

{ nombre: "Enchiladas", precio: 7.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Enchiladas con Mole", precio: 8.50, familia: "Platillos" },/*Modifide*/ 
{ nombre: "Flautas", precio: 7.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Pipian", precio: 8.50, familia: "Platillos" },/*Modifide*/
{ nombre: "Mole", precio: 8.50, familia: "Platillos" },/*Modifide*/
{ nombre: "Pechuga Asada", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Pechuga Empanizada", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Costillas en Salsa Roja", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Costillas en Salsa Verde", precio: 8.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Arranchera con Chile Relleno", precio: 11.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Lomo Enchilado", precio: 7.99, familia: "Platillos" },/*Modifide*/
{ nombre: "Carne Asada", precio: 9.99, familia: "Platillos" },/*Modifide*/
{ nombre: "Tostada", precio: 3.0, familia: "Platillos" },/*Modifide*/
{ nombre: "Chile Relleno", precio: 7.99, familia: "Platillos" },/*Modifide*/
{ nombre: "Ranchera con Chile Relleno", precio: 7.99, familia: "Platillos" },/*Modifide*/

{ nombre: "Quesadillas", precio: 3.95, familia: "Platillos" },/*Modifide*/      
{ nombre: "Quesadillas Con Carne", precio: 5.75, familia: "Platillos" },/*Modifide*/
{ nombre: "Quesadillas Con Carne Fri Y Arroz", precio: 7.50, familia: "Platillos" },/*Modifide*/

{ nombre: "Chilaquiles Simples", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Huevos Estrellados", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Pollo", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Huevos Revueltos", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Ranchera", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/
{ nombre: "Chilaquiles con Asada", precio: 6.0, familia: "Chilaquiles" },/*Modifide*/      

{ nombre: "Tortas de Milanesa", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Pierna", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Jamon", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Carne Asada", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Ranchera", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Pechuga Asada", precio: 6.0, familia: "Tortas" },/*Modifide*/
{ nombre: "Tortas de Pechuga Empanizada", precio: 6.0, familia: "Tortas" },/*Modifide*/

{ nombre: "Cubanas de Pierna", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/
{ nombre: "Cubanas de Jamon", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/
{ nombre: "Cubanas de Milanesa", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/
{ nombre: "Cubanas de Asada", precio: 6.0, familia: "Tortas Cubanas" },/*Modifide*/

{ nombre: "Cemitas de Milanesa", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Pierna", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Jamon", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Asada", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Ranchera", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Pollo Asado", precio: 7.50, familia: "Cemitas" },/*Modifide*/
{ nombre: "Cemitas de Pollo Empanizado", precio: 7.50, familia: "Cemitas" },/*Modifide*/


{ nombre: "Agua de Orchata", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Jamaica", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Tamarindo", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Piña", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Agua de Limon", precio: 2.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Soda de Botella", precio: 1.50, familia: "Bebidas" },/*Modifide*/
{ nombre: "Soda de Lata", precio: 1.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Fresa", precio: 3.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Platano", precio: 3.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Mango", precio: 3.0, familia: "Bebidas" },/*Modifide*/
{ nombre: "Smoothies / Piña", precio: 3.0, familia: "Bebidas" },/*Modifide*/

{ nombre: "Chamango", precio: 3.50, familia: "Antojitos" },/*Modifide*/
{ nombre: "Fruta Chica", precio: 3.0, familia: "Antojitos" },/*Modifide*/
{ nombre: "Fruta Grande", precio: 5.0, familia: "Antojitos" },/*Modifide*/    
{ nombre: "Tostilocos", precio: 5.0, familia: "Antojitos" },/*Modifide*/
{ nombre: "Bionico Chico", precio: 4.0, familia: "Antojitos" },/*Modifide*/   
{ nombre: "Bionico Grande", precio: 5.0, familia: "Antojitos" }/*Modifide*/ 

];


const itemOptions = {

"Sopes de Asada": ["Con todo:", "No Frijol","No Queso", "No Crema", "No lechuga", "Salsa verde", "Salsa roja"],
"Sopes Pollo Desebrado": ["Con todo:", "No Frijol","No Queso", "No Crema", "No lechuga", "Salsa verde", "Salsa roja"],
"Sopes Pollo Asado": ["Con todo:", "No Frijol","No Queso", "No Crema", "No lechuga", "Salsa verde", "Salsa roja"],
"Sopes al Pastos": ["Con todo:", "No Frijol","No Queso", "No Crema", "No lechuga", "Salsa verde", "Salsa roja"],
"Sopes Tinga": ["Con todo:", "No Frijol","No Queso", "No Crema", "No lechuga", "Salsa verde", "Salsa roja"],
"Sopes Chorizo": ["Con todo:", "No Frijol","No Queso", "No Crema", "No lechuga", "Salsa verde", "Salsa roja"],

"Tacos al Pastor": ["Con todo:", "No cebolla","No Cilantro", "Salsa verde", "Salsa roja"],
"Tacos de Asada": ["Con todo:", "No cebolla","No Cilantro", "Salsa verde", "Salsa roja"],
"Tacos de Pollo": ["Con todo:", "No cebolla","No Cilantro", "Salsa verde", "Salsa roja"],
"Tacos de Tripa": ["Con todo:", "No cebolla","No Cilantro", "Salsa verde", "Salsa roja"],
"Tacos de Cabeza": ["Con todo:", "No cebolla","No Cilantro", "Salsa verde", "Salsa roja"],
"Tacos de Chorizo": ["Con todo:", "No cebolla","No Cilantro", "Salsa verde", "Salsa roja"], 

"Burrito de Asada": ["Con todo:", "No Frijoles","No Crema", "No Queso","Salsa verde", "Salsa roja"],
"Burrito de Pollo": ["Con todo:", "No Frijoles","No Crema", "No Queso","Salsa verde", "Salsa roja"],
"Burrito al Pastor": ["Con todo:", "No Frijoles","No Crema", "No Queso","Salsa verde", "Salsa roja"],
"Wet Burrito Green": ["Con todo:", "No Frijoles","No Crema", "No Queso","Salsa verde", "Salsa roja"],
"Wet Burrito Red": ["Con todo:", "No Frijoles","No Crema", "No Queso","Salsa verde", "Salsa roja"],

"Caldo de Pollo": ["Con todo:", "No cebolla", "No Cilantro", "Salsa verde", "Salsa roja"],
"Caldo de Res": ["Con todo:", "No cebolla", "No Cilantro", "Salsa verde", "Salsa roja"],
"Pozole": ["Con todo:", "No cebolla", "No repollo", "No jitomate" , "Salsa verde", "Salsa roja"],
"Menudo": ["Con todo:", "No cebolla", "No repollo", "No jitomate", "Salsa verde", "Salsa roja"],


"Enchiladas": ["Con todo:", "No crema", "No lechuga", "No jitomate", "Rojas", "Verdes"],
"Enchiladas con Mole": ["Con todo:", "No crema", "No lechuga", "No jitomate", "Rojas", "Verdes"],
"Flautas": ["Con todo:", "No crema", "No lechuga", "No jitomate", "Salsa roja", "Salsa verde"],
"Pipian": ["Con todo:", "De pierna y Muslo", "Costillas", "Pollo desebrado"],
"Mole": ["Con todo:", "De pierna y Muslo", "Costillas", "Pollo desebrado"],
"Pechuga Asada": ["Con todo:", "No arroz", "No frijoles", "No jitomate", "No pepinillo"],
"Pechuga Empanizada": ["Con todo:", "No arroz", "No frijoles", "No jitomate", "No pepinillo"],
"Costillas en Salsa Roja": ["Con todo:", "No Arroz", "No Frijoles"],
"Costillas en Salsa Verde": ["Con todo:", "No Arroz", "No Frijoles"],
"Ranchera con Chile Relleno": ["Con todo:", "No Arroz", "No Frijoles"],
"Lomo Enchilado": ["Con todo:", "No arroz", "No frijoles", "No jitomate", "No pepinillo","No naranja"],
"Carne Asada": ["Con todo:", "No arroaz", "No frijoles", "No puer de papa"],
"Tostada": ["Con todo:", "No crema", "No queso", "De pollo", "De Asada", "De tinga", "De al pastor", "Salsa roja", "Salsa verde"],
"Chile Relleno": ["Con todo:", "No Arroz", "No Frijoles"],
"Arranchera con Chile Relleno": ["Con todo:", "No Arroz", "No Frijoles"],


"Quesadillas": ["Con todo:", "Salsa roja", "Salsa verde", "Tortilla de arina", "Tortilla de maiz"],   
"Quesadillas Con Carne": ["Con todo:", "De pollo", "De Asada", "De tinga", "De al pastor", "Salsa roja", "Salsa verde", "Tortilla de arina", "Tortilla de maiz"], 
"Quesadillas Con Carne Fri Y Arroz": ["Con todo:", "De pollo", "De Asada", "De tinga", "De al pastor", "Salsa roja", "Salsa verde", "Tortilla de arina", "Tortilla de maiz"], 

"Chilaquiles Simples": ["Con todo:", "No crema", "No queso", "No Frijoles", "No arroz", "Rojos", "Verdes"],
"Chilaquiles con Huevos Estrellados": ["Con todo:", "No crema", "No queso", "No Frijoles", "No arroz", "Rojos", "Verdes"],
"Chilaquiles con Pollo": ["Con todo:", "No crema", "No queso", "No Frijoles", "No arroz", "Rojos", "Verdes"],
"Chilaquiles con Huevos Revueltos": ["Con todo:", "No crema", "No queso", "No Frijoles", "No arroz", "Rojos", "Verdes"],
"Chilaquiles con Ranchera": ["Con todo:", "No crema", "No queso", "No Frijoles", "No arroz", "Rojos", "Verdes"],
"Chilaquiles con Asada": ["Con todo:", "No crema", "No queso", "No Frijoles", "No arroz", "Rojos", "Verdes"],

"Tortas de Milanesa": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño"],
"Tortas de Pierna": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño"],
"Tortas de Jamon": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño"],
"Tortas de Carne Asada": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño"],
"Tortas de Ranchera": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño"],
"Tortas de Pechuga Asada":["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño"],
"Tortas de Pechuga Empanizada": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño"],

"Cubanas de Pierna": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño", "No queso fresco"],
"Cubanas de Jamon": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño", "No queso fresco"],
"Cubanas de Milanesa": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño", "No queso fresco"],
"Cubanas de Asada": ["Con todo:", "No frijol","No lechuga", "No jitomate", "No cebolla", "No aguacate", "No jalapeño", "No queso fresco"],

"Cemitas de Milanesa": ["Con todo:", "No Aguacate", "No Chipotle", "No cebolla", "No quesilo"],
"Cemitas de Pierna": ["Con todo:", "No Aguacate", "No Chipotle", "No cebolla", "No quesilo"],
"Cemitas de Jamon": ["Con todo:", "No Aguacate", "No Chipotle", "No cebolla", "No quesilo"],
"Cemitas de Asada": ["Con todo:", "No Aguacate", "No Chipotle", "No cebolla", "No quesilo"],
"Cemitas de Ranchera": ["Con todo:", "No Aguacate", "No Chipotle", "No cebolla", "No quesilo"],
"Cemitas de Pollo Asado": ["Con todo:", "No Aguacate", "No Chipotle", "No cebolla", "No quesilo"],
"Cemitas de Pollo Empanizado": ["Con todo:", "No Aguacate", "No Chipotle", "No cebolla", "No quesilo"],

"Huevos Divorciados Regulares": ["Con todo:", "No arroz", "No frijoles", "Medios", "Bien cocinados"],
"Huevos Divorciados Con Mole": ["Con todo:", "No arroz", "No frijoles", "Medios", "Bien cocinados"],
"Huevos Estrellados Regulares": ["Con todo:", "No arroz", "No frijoles"],
"Huevos Estrellados Speciales": ["Con todo:", "No arroz", "No frijoles", "No jamon", "No tocino", "No salchicha", "No chorizo"],
"Huevos a la Mexicana": ["Con todo:", "No cilantro", "No cebolla", "No tomate"],
"Huevos con Chorizo": ["Con todo:", "No arroz", "No frijoles"],
"Huevos con Jamon": ["Con todo:", "No arroz", "No frijoles"],
"Huevos con Salchicha": ["Con todo:", "No arroz", "No frijoles"],
"Huevos con Tozino": ["Con todo:", "No arroz", "No frijoles"],

"Agua de Orchata": ["Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Agua de Jamaica": ["Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Agua de Tamarindo": ["Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Agua de Piña": ["Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Agua de Limon": ["Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Soda de Botella": ["Fanta","Pepsi","Coca","Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Soda de Lata": ["Fanta","Pepsi","Coca","Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Smoothies / Fresa": ["Fanta","Pepsi","Coca","Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Smoothies / Platano": ["Fanta","Pepsi","Coca","Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Smoothies / Mango": ["Fanta","Pepsi","Coca","Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],
"Smoothies / Piña": ["Fanta","Pepsi","Coca","Con hielo", "Sin hielo", "Tamaño chico", "Tamaño grande"],

"Chamango": ["Con todo:", "No mango","No chamoy","No hielo","No limon", "No chile en polvo", "No pulpa de mando"],
"Fruta Chica": ["Con todo:", "No pico de gallo","No mango","No piña","No pepino", "No jicama", "No no sandia"],
"Fruta Grande": ["Con todo:", "No pico de gallo","No mango","No piña","No pepino", "No jicama", "No no sandia"],
"Tostilocos": ["Con todo:", "No repollo","No limon","No chile en polvo","No mango", "No sandia", "No valentina", "No chamoy"],
"Bionico Chico": ["Con todo:", "No platano","No manzana","No melon","No papaya", "No fresa"],
"Bionico Grande": ["Con todo:", "No platano","No manzana","No melon","No papaya", "No fresa"]



};

firebase.firestore()
.collection("ordenesEstado")
.doc("default_user")
.onSnapshot((doc) => {
if (doc.exists) {
const data = doc.data();
tomadas = data.tomadas || []; //Esto permite que no se borren cuando agan refres pero se miran en otro dispositivo
enCocina = (data.enCocina || []).map((orden) => ({
...orden,
start: new Date(orden.start) // Convertir siempre a objeto Date
}));
cerradas = (data.cerradas || []).map(o => ({
...o,
fecha: o.fecha ? new Date(o.fecha) : null,
fin: o.fin ? new Date(o.fin) : null
}));

seqCerradas = data.seqCerradas || 0;
//renderAll(); // vuelve a renderizar
}
});



let tomadas = [], enCocina = [], cerradas = [], seqCerradas = 0;
const $ = id => document.getElementById(id);
const secciones = [$("menu-section"), $("tomadas-section"), $("cocina-section"), $("cerradas-section")];
const countCocina = $("count-cocina");
const modal = $("modal"), modalTitle = $("modal-title"), opcionesContainer = $("opciones-container");
const form = $("order-form");
let productoSeleccionado = null;

// Aqui va el nuevo testo
// Observa

firebase.auth().onAuthStateChanged((user) => {
if (user) {
const userId = user.uid;
const docRef = firebase.firestore().collection("ordenesEstado").doc(userId);
//New lines para contador de ordenes
listenToCocinaCountRealtime(user.uid);

docRef.onSnapshot((doc) => {
if (doc.exists) {
const data = doc.data();

// Actualizar variables globales
tomadas = data.tomadas || []; //Esto permite que no se borren cuando agan refres pero se miran en otro dispositivo
enCocina = (data.enCocina || []).map(o => ({
...o,
start: o.start ? new Date(o.start) : null
}));
cerradas = (data.cerradas || []).map(o => ({
...o,
fecha: o.fecha ? new Date(o.fecha) : null
}));

seqCerradas = data.seqCerradas || 1;

// Re-renderizar UI
renderTomadas(); //Esto permite que no se borren cuando agan refres pero se miran en otro dispositivo
renderCocina();
renderCerradas();

console.log("Datos sincronizados desde Firestore.");
} else {
console.log("Documento no existe aún.");
}
});
} else {
console.log("Usuario no autenticado.");
}
});


function saveData() {
const userId = firebase.auth().currentUser?.uid || "default_user";
const docRef = firebase.firestore().collection("ordenesEstado").doc(userId);

// Convertir todas las fechas a cadenas ISO
const dataToSave = {
tomadas: tomadas, //Esto permite que no se borren cuando agan refres pero se miran en otro dispositivo
enCocina: enCocina.map(o => ({
...o,
start: (o.start instanceof Date) ? o.start.toISOString() : o.start
})),
cerradas: cerradas,
seqCerradas: seqCerradas
};

docRef.set(dataToSave)
.then(() => {
console.log("Datos guardados en Firestore.");
})
.catch((error) => {
console.error("Error guardando en Firestore:", error);
});
}


function loadData() {
const userId = firebase.auth().currentUser?.uid || "default_user";
const docRef = firebase.firestore().collection("ordenesEstado").doc(userId);

docRef.get().then((doc) => {
if (doc.exists) {
const data = doc.data();
tomadas = data.tomadas || [];
enCocina = data.enCocina || [];
cerradas = (data.cerradas || []).map(o => ({
...o,
fecha: o.fecha ? new Date(o.fecha) : null
}));

seqCerradas = data.seqCerradas || 0;
console.log("Datos cargados desde Firestore.");
} else {
console.log("No hay datos previos en Firestore.");
}
}).catch((error) => {
console.error("Error cargando desde Firestore:", error);
});
}


function switchSection(index) {
const mensajes = [
"📋 Aquí puedes ver los platillos disponibles para ordenar. " ,
"📝 Órdenes que han sido tomadas y están pendientes de enviarse a cocina.",
"👨‍🍳 Órdenes que están siendo preparadas actualmente por la cocina.",
"📦 Historial de órdenes finalizadas, puedes imprimir o cancelar."
];

const colores = [
"#2a9d8f", // Menú - fondo oscuro
"#e9c46a", // Tomadas - fondo claro
"#f4a261", // Cocina - fondo claro
"#264653"  // Cerradas - fondo oscuro
];

const colorTexto = [ "white", "blue", "purple", "white" ];

secciones.forEach((sec, i) => sec.classList.toggle("hidden", i !== index));
const mensajeEl = $("seccion-mensaje");
mensajeEl.textContent = mensajes[index];
mensajeEl.style.backgroundColor = colores[index];
mensajeEl.style.color = colorTexto[index];  // 👈 cambia el color según la sección
mensajeEl.style.fontSize = "32px";
mensajeEl.style.padding = "12px 24px";
mensajeEl.style.borderRadius = "12px";
mensajeEl.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
mensajeEl.style.margin = "10px auto";
mensajeEl.style.textAlign = "center";
mensajeEl.style.fontWeight = "bold";
mensajeEl.style.maxWidth = "90%";
}


$("btn-menu").onclick = () => { renderMenu();switchSection(0) };
$("btn-tomadas").onclick = () => { renderTomadas(); switchSection(1); };
$("btn-cocina").onclick = () => { renderCocina(); switchSection(2); };
$("btn-cerradas").onclick = () => { renderCerradas(); switchSection(3); };

$("btn-menu2").onclick = () => { renderMenu();switchSection(0) };
$("btn-tomadas2").onclick = () => { renderTomadas(); switchSection(1); };
$("btn-cocina2").onclick = () => { renderCocina(); switchSection(2); };
$("btn-cerradas2").onclick = () => { renderCerradas(); switchSection(3); };


function renderMenu() {
// Limpiar columnas
[1, 2].forEach(num => {
document.querySelector(`.columna-${num}`).innerHTML = "";
});

const familiasPorColumna = {
"Desayunos": 1,
"Tacos": 1,
"Sopes": 1,
"Burritos": 1,
"Bebidas": 1,
"Antojitos": 1,
"Chilaquiles": 2,
"Platillos": 2,
"Caldos": 2,
"Tortas": 2,
"Tortas Cubanas": 2,
"Cemitas": 2,
};

const esTactil = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Agrupar productos por familia
const productosPorFamilia = {};
productos.forEach(prod => {
if (!productosPorFamilia[prod.familia]) {
productosPorFamilia[prod.familia] = [];
}
productosPorFamilia[prod.familia].push(prod);
});

// Crear encabezados por familia
Object.keys(productosPorFamilia).forEach(familia => {
const colNum = familiasPorColumna[familia] || 1;
const columna = document.querySelector(`.columna-${colNum}`);

const header = document.createElement("h3");
header.dataset.fam = familia;
header.textContent = familia;
header.style.cursor = "pointer";
columna.appendChild(header);

const container = document.createElement("div");
container.classList.add("productos-container");
container.style.display = "none"; // Oculto por defecto
columna.appendChild(container);

productosPorFamilia[familia].forEach(prod => {
const pEl = document.createElement("p");
pEl.textContent = `${prod.nombre} - $${prod.precio.toFixed(2)}`;
if (esTactil) {
pEl.addEventListener('dblclick', () => openModal(prod));
} else {
pEl.addEventListener('dblclick', () => openModal(prod));
}
container.appendChild(pEl);
});

// Mostrar/ocultar productos al hacer clic en el encabezado
header.addEventListener("click", () => {
container.style.display = container.style.display === "none" ? "block" : "none";
});
});
}




function openModal(p, opcionesSeleccionadas = []) {
productoSeleccionado = p;

const nombreCliente = document.getElementById("nombreClienteGlobal")?.value || "";
const numeroMesa = document.getElementById("numeroMesaGlobal")?.value || "";
const numeroOrden = document.getElementById("numeroOrdenGlobal")?.value || "";
const nombreMesero = document.getElementById("nombreMeseroGlobal")?.value || "";


const opciones = itemOptions[p.nombre] || [];

const form = document.getElementById("order-form");

form.innerHTML = `
<h2 id="modal-title" style="font-size: 40px; font-weight:bold; color: purple">${p.nombre}</h2>

<label style="font-size: 50px; font-weight:bold;">Cantidad: &nbsp;<input type="number" id="cantidad" min="1" style="background-color: #eeefe9; font-size: 40px; font-weight:bold; width: 65%; padding: 5px;" value="1" required />
</label><br>

<label style="font-size: 50px; font-weight:bold;">Opciones:</label>
<div id="opciones-container" style="margin-bottom: 20px; font-size: 40px;"></div>

<label style="font-size: 50px; font-weight:bold;">Notas extra:<br>
<textarea id="nota" style="background-color: #eeefe9; font-size: 35px; font-weight:bold; width: 97%; height: 100px;" placeholder=""></textarea>
</label><br><br>

<label style="font-size: 50px; font-weight:bold;"> #Mesa:
<input type="text" id="mesa" style=" margin-left: 21px; background-color: #eeefe9; text-align: center; font-size: 40px; width: 14%; height: 60px; padding: 10px;" value="${numeroMesa}"/>
</label>

<label style="font-size: 50px; font-weight:bold;">Cliente:
<input type="text" id="cliente" style="margin-left: 14px; background-color: #eeefe9; text-align: center; font-size: 30px; width: 21%; height: 60px; padding: 10px;" value="${nombreCliente}"/>
</label><br><br>

<label style="font-size: 50px; font-weight:bold;">#Orden:
<input type="text" id="orden" style="background-color: #eeefe9; text-align: center; font-size: 30px; width: 14%; height: 60px; padding: 10px;" value="${numeroOrden}"/>
</label>

<label style="font-size: 50px; font-weight:bold;">Mesero:
<input type="text" id="mesero" style="background-color: #eeefe9; text-align: center; font-size: 30px; width: 21%; height: 60px; padding: 10px;" value="${nombreMesero}"/>
</label><br><br>

<div style="display: flex; justify-content: flex-start; gap: 20px; margin-top: 10px;">
<button type="button" id="cancelarOrden" style="background-color: red; font-size: 80px;">Cancelar</button>
<button type="submit" id="enviarOrden" style="background-color: green; font-size: 80px;">Salvar</button>
</div>
`;

// ✅ Mostrar checkboxes y marcar los seleccionados
const opcionesContainer = document.getElementById("opciones-container");
opciones.forEach(opt => {
const label = document.createElement("label");
label.style.display = "block";
const isChecked = opcionesSeleccionadas.includes(opt) ? "checked" : "";
//label.innerHTML = `<input type="checkbox" value="${opt}" ${isChecked}> ${opt}`; / Old check box desig
label.innerHTML = `<input type="checkbox" value="${opt}" ${isChecked} style="width: 40px; height: 40px; margin-right: 8px;"> <span style="font-size: 50px;">${opt}</span>`;
opcionesContainer.appendChild(label);
});

// Mostrar modal
document.getElementById("modal").classList.remove("hidden");

document.getElementById("cancelarOrden").onclick = () => {
modal.classList.add("hidden");
};



}   


$("modal-close").onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", e => {
if (e.target === modal) e.stopPropagation();
});

let filtroOrdenActual = "";

function aplicarDatosGlobalesAFiltradas() {
const nombre = document.getElementById("nombreClienteGlobal").value.trim();
const mesa = document.getElementById("numeroMesaGlobal").value.trim();
const ordenGlobal = document.getElementById("numeroOrdenGlobal").value.trim();
const mesero = document.getElementById("nombreMeseroGlobal").value.trim();
const filtro = filtroOrdenActual.toLowerCase().trim();


if (!nombre && !mesa && !ordenGlobal && !mesero) {
alert("Por favor completa al menos un campo del encabezado para aplicar.");
return;
}

// Filtramos igual que renderTomadas lo hace
const filtroLimpio = filtro.toLowerCase().trim();
let modificadas = 0;

tomadas.forEach(o => {
const coincide = filtroLimpio === "" || (o.orden && o.orden.toLowerCase().includes(filtroLimpio));
if (coincide) {
if (nombre) o.cliente = nombre;
if (mesa) o.mesa = mesa;
if (mesero) o.mesero = mesero;
if (ordenGlobal) o.orden = ordenGlobal;

modificadas++;
}
});

saveData();
renderTomadas(filtro);
alert(`✅ Se aplicaron los datos del encabezado a ${modificadas} orden(es) filtrada(s).`);
}




function filtrarPorOrden() {
const valor = document.getElementById("filtroOrdenInput").value;
filtroOrdenActual = valor.trim(); // Guardamos el valor globalmente
renderTomadas(filtroOrdenActual);
}



function renderTomadas(filtro = "") {
const cont = $("tomadas-section");
cont.innerHTML = "";

// Pass fijo para esta terminal
const passTerminal = "M01"; // 🔹 Cambia esto en la otra app a "M01"

// Normalizar el filtro de número de orden
const filtroLimpio = filtro.toLowerCase().trim();

// Encabezado con Input Pass
const headerActions = document.createElement("div");
headerActions.innerHTML = `
<div style="margin: 15px 0px; display: gap: 20px; align-items: center;">
<input type="text" id="passTerminal" value="${passTerminal}" readonly
style="padding: 42px 20px; font-size: 18px; width: 35px; border: 2px solid #ccc; border-radius: 8px; background-color: #f5f5f5;" />

<input type="text" id="filtroOrdenInput" placeholder="🔎 Número de orden..." value="${filtroLimpio}"
style="padding: 42px 20px; font-size: 18px; width: 60px; border: 2px solid #ccc; border-radius: 8px;" />

<button onclick="filtrarPorOrden()" 
style="padding: 42px 15px; font-size: 18px; width: 130px; background-color: #4285F4; color: white; border: none; border-radius: 8px; cursor: pointer;">
🔍 Buscar
</button>

<button onclick="renderTomadas()" 
style="padding: 42px 10px; font-size: 18px; width: 240px; background-color: #34A853; color: white; border: none; border-radius: 8px; cursor: pointer;">
📋 Mostrar todas
</button>

<button onclick="aplicarDatosGlobalesAFiltradas()" 
style="padding: 42px 10px; font-size: 18px; width: 220px; background-color: #FBBC05; color: black; border: none; border-radius: 8px; cursor: pointer;">
📝 Aplicar encabezado
</button>
</div>
`;
cont.appendChild(headerActions);

tomadas
.filter(orden => {
// Filtrar por pass
const coincidePass = orden.pass === passTerminal;
if (!coincidePass) return false;

// Filtrar por número de orden si hay filtro
return filtroLimpio === "" || (orden.orden && orden.orden.toLowerCase().includes(filtroLimpio));
})
.forEach(orden => {
const card = document.createElement("div");
card.className = "card";
card.innerHTML = `
<div class="cantidad-producto">
<strong>
<span class="label">#:</span> <span class="valor">${orden.orden}</span> -
<span class="label">Mesero:</span> <span class="valor">${orden.mesero}</span> -
<span class="label">Mesa:</span> <span class="valor">${orden.mesa}</span> -
<span class="label">Cliente:</span> <span class="valor">${orden.cliente}</span>
</strong>
</div>




<div style="display: inline-block; background-color: purple; color: white; padding: 10px 12px; border-radius: 6px; margin: 0; font-size: 30px;"><strong>Qty: [ ${orden.cantidad || 1} ] ${orden.producto}</strong></div><br>

<div>
${(orden.opciones || []).map(op => `
<span style="background-color:#d1fae5; color:#065f46; padding:6px 12px; margin:4px; display:inline-block; border-radius:8px; font-size:28px; font-weight:bold;">
  ${op}
</span>`).join("")}
</div><br>

<div style="margin-top:12px; background:#fef3c7; padding:10px 12px; border-radius:6px; color:#92400e; font-size:28px;">
<h1 style="margin:0; font-size:28px;"><strong>Notas: <br> ${orden.nota}</strong></div><br>

<button class="edit">✏️ Editar</button>

<button class="cancel" style="background-color: red; color: white;">
<span style="background-color: white; border-radius: 50%; padding: 4px;">❌</span> Cancelar
</button>
<button class="to-cocina">📝➡️🍳Enviar a cocina</button>
`;

// resto de los eventos (igual que antes)...
card.querySelector(".cancel").onclick = () => {
tomadas = tomadas.filter(o => o.id !== orden.id);
saveData();
renderTomadas(filtro);
};

card.querySelector(".to-cocina").onclick = () => {
const missingFields = [];
if (!orden.orden) missingFields.push("Número de orden");
if (!orden.mesero) missingFields.push("Nombre del mesero");
if (!orden.mesa) missingFields.push("Número de mesa");
if (!orden.cliente) missingFields.push("Nombre del cliente");

if (missingFields.length > 0) {
alert("Por favor completa los siguientes campos:\n\n" + missingFields.join("\n"));
return;
}

const producto = productos.find(p => p.nombre === orden.producto);
if (producto && producto.familia === "Bebidas") {
const platillo = menuData.find(p => p.nombre === orden.producto);
const precio = platillo ? platillo.precio : 0;
const cantidad = orden.cantidad || 1;
seqCerradas++;
cerradas.push({
...orden,
fin: new Date().toISOString(),
seq: seqCerradas,
cantidad,
precio,
total: cantidad * precio
});
tomadas = tomadas.filter(o => o.id !== orden.id);
saveData();
renderTomadas(filtro);
renderCerradas();
} else {
enCocina.push({ ...orden, start: new Date(), working: false });
tomadas = tomadas.filter(o => o.id !== orden.id);
saveData();
renderTomadas(filtro);
renderCocina();
updateCountCocina();
}
};

card.querySelector(".edit").onclick = () => {
openModal({ nombre: orden.producto }, orden.opciones || []);
form.mesero.value = orden.mesero;
form.mesa.value = orden.mesa;
form.cliente.value = orden.cliente;
form.nota.value = orden.nota;
form.cantidad.value = orden.cantidad;
tomadas = tomadas.filter(o => o.id !== orden.id);
saveData();
renderTomadas(filtro);
form.orden.value = orden.orden;


};

card.onclick = () => {
const filtroInput = document.getElementById("filtroOrdenInput");
filtroInput.value = orden.orden;
filtroOrdenActual = orden.orden;
renderTomadas(orden.orden);
};

cont.appendChild(card);
});
}



function renderCocina() {
const cont = $("cocina-section");
cont.innerHTML = "";

enCocina.forEach((orden, i) => {
const startTime = (orden.start instanceof Date) ? orden.start : new Date(orden.start);
const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
const elapsedMinutes = Math.floor(elapsedSeconds / 60);
const card = document.createElement("div");

// 🔁 Asegurar estado inicial
if (!orden.estado) orden.estado = "pendiente";

card.className = "card";
if (orden.estado === "proceso") card.classList.add("proceso");
if (orden.estado === "lista") card.classList.add("lista");

const opcionesHTML = (orden.opciones || []).map(op => `
<span style="background-color:#d1fae5; color:#065f46; padding:6px 12px; margin:4px; display:inline-block; border-radius:8px; font-size:28px; font-weight:bold;">
${op}
</span>`).join("");


const notaHTML = orden.nota
? `<div style="margin-top:10px; background:#fef3c7; padding:10px 12px; border-radius:6px; color:#92400e; font-size:28px;">
<h1 style="margin:0; font-size:28px;">Nota:</h1>
${orden.nota}
</div>`
: "";


card.innerHTML = `

<strong>
<span class="label2">#:</span> <span class="valor2">${orden.orden}</span> 
<span class="label2">Mesero:</span> <span class="valor2">${orden.mesero}</span> 
<span class="label2">Mesa:</span> <span class="valor2">${orden.mesa}</span> 
<span class="label2">Cliente:</span> <span class="valor2">${orden.cliente}</span>
</strong><br><br>

<strong>
<span class="label2">Hora:</span> <span class="valor2">${startTime.toLocaleTimeString()}</span> 
<span class="label2">Minutos:</span> <span class="valor2">${elapsedMinutes}</span>

</strong><br><br>



<h1 style="display: inline-block; background-color: purple; color: white; padding: 10px 12px; border-radius: 6px; margin: 0;  font-size: 35px;">
${orden.cantidad || 1} ${orden.producto}
</h1>

<div style="margin:8px 0;">
<h1 style="margin:0; font-size:30px;">Opciones:</h1>
<div style="font-size:16px;">${opcionesHTML || "—"}</div>
</div>

${notaHTML}        



</div>



<div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 10px;">
<button class="start" style="background-color: #28a745; color: white; font-size: 20px; font-weight: bold; padding: 10px 10px; border: none; border-radius: 8px; cursor: pointer;">
🟢 Comenzar orden
</button>

<button class="done" style="background-color: #007bff; color: white; font-size: 20px; font-weight: bold; padding: 10px 10px; border: none; border-radius: 8px; cursor: pointer;">
✅ Orden lista
</button>

<button class="to-cerradas" style="background-color: #6f42c1; color: white; font-size: 20px; font-weight: bold; padding: 10px 10px; border: none; border-radius: 8px; cursor: pointer;">
📦📤🔒Cerrar orden
</button>

<button class="edit" style="background-color: #ffc107; color: black; font-size: 20px; font-weight: bold; padding: 10px 10px; border: none; border-radius: 8px; cursor: pointer;">
✏️ Editar
</button>

<button class="cancel" style="background-color: red; color: white; font-size: 20px;">
<span style="background-color: white; border-radius: 50%; padding: 4px;">❌</span> Cancelar
</button>


</div>

`;

// Botones funcionales
card.querySelector(".start").onclick = () => {
orden.estado = "proceso";
saveData();
renderCocina();
};

card.querySelector(".done").onclick = () => {
orden.estado = "lista";
saveData();
renderCocina();
};

card.querySelector(".edit").onclick = () => {
openModal({ nombre: orden.producto }, orden.opciones || []);
form.mesero.value = orden.mesero;
form.mesa.value = orden.mesa;
form.cliente.value = orden.cliente;
form.nota.value = orden.nota;
form.orden.value = orden.orden;
form.cantidad.value = orden.cantidad || 1;
form.dataset.editandoDesdeCocina = orden.id;
};

card.querySelector(".cancel").onclick = () => {
enCocina.splice(i, 1);
saveData();
renderCocina();
updateCountCocina();
};

card.querySelector(".to-cerradas").onclick = () => {
const platillo = menuData.find(p => p.nombre === orden.producto);
const precio = platillo ? platillo.precio : 0;
const cantidad = orden.cantidad || 1;

seqCerradas++;
cerradas.push({
...orden,
cantidad: cantidad,
precio: precio,
total: cantidad * precio,
fin: new Date().toISOString(),
seq: seqCerradas
});

enCocina.splice(i, 1);
saveData();
renderCocina();
renderCerradas();
updateCountCocina();
};


cont.appendChild(card);
});
}

// ⏱️ Temporizador para actualizar cocina cada 5 segundos
if (window.cocinaTimer) clearInterval(window.cocinaTimer);
window.cocinaTimer = setInterval(() => {
const cocinaVisible = !document.getElementById("cocina-section").classList.contains("hidden");
if (cocinaVisible) renderCocina();
}, 1000);


function updateCountCocina(count) {
const countElem = document.getElementById("contadorCocina");
if (countElem) {
countElem.textContent = count;
} else {
//console.warn("Elemento 'contadorCocina' no existe.");
}
}


// Funcion modicada
//Ojo aqui
//Test 0 antes del print
//Test 1 antes del print

function renderCerradas() {

const cont = $("cerradas-section");
cont.innerHTML = "";
const ordenadas = [...cerradas].sort((a, b) => b.seq - a.seq); // Por línea descendente
ordenadas.forEach(o => {
const card = document.createElement("div");
card.className = "card";
card.innerHTML = `
<div style="font-size: 18px; line-height: 1.6; margin-bottom: 20px;">
<div style="font-size: 22px; font-weight: bold; color: #333;">
🔢 Línea #${o.seq} — Número de Orden: ${o.orden || "—"}
</div>

<div>Mesero: <strong>${o.mesero}</strong></div>

<div>Mesa: <strong>${o.mesa}</strong> — Cliente: <strong>${o.cliente}</strong></div>
<div>Platillo: <strong>${o.producto}</strong></div>

<div>
Cantidad: <strong>${o.cantidad}</strong> — 
Precio: <strong>$${o.precio?.toFixed(2)}</strong>
</div>

${
(() => {
const subtotal = (o.total || 0);
const tax = subtotal * 0.095;
const totalConTax = subtotal + tax;
return `
<div>
  Subtotal: <strong>$${subtotal.toFixed(2)}</strong> — 
  Tax (9.5%): <strong>$${tax.toFixed(2)}</strong> — 
  Total con Tax: <strong>$${totalConTax.toFixed(2)}</strong>
</div>
`;
})()
}

<div>Cerrada: <strong>${new Date(o.fin).toLocaleString()}</strong></div>

<div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px;">
<button class="cancel" style="background-color: #dc3545; color: white; font-size: 18px; font-weight: bold; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer;">
❌ Cancelar
</button>
<button class="print" style="background-color: #17a2b8; color: white; font-size: 18px; font-weight: bold; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer;">
🖨️ Imprimir
</button>
<button class="print-orden" style="background-color: #007bff; color: white; font-size: 18px; font-weight: bold; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer;">
🧾 Imprimir esta orden completa
</button>
<button onclick="reiniciarNumeracion()" style="background-color: #6f42c1; color: white; font-size: 18px; font-weight: bold; padding: 10px 16px; border: none; border-radius: 8px; cursor: pointer;">
🔄 Reiniciar numeración
</button>
</div>
</div>


`;

card.querySelector(".cancel").onclick = () => {
cerradas = cerradas.filter(c => c.seq !== o.seq);
saveData(); renderCerradas();
};

card.querySelector(".print").onclick = () => {
const desde = prompt("Desde #?");
const hasta = prompt("Hasta #?");
const lista = cerradas.filter(c => c.seq >= desde && c.seq <= hasta);
const doc = window.open("");

doc.document.write("<h1>Órdenes cerradas</h1>");

let totalGeneralConTax = 0;

// Contador de órdenes por mesero
const conteoMeseros = {};

lista.forEach(c => {
const subtotal = c.precio * c.cantidad;
const tax = subtotal * 0.095;
const totalConTax = subtotal + tax;
totalGeneralConTax += totalConTax;

// Contar órdenes por mesero
if (!conteoMeseros[c.mesero]) {
conteoMeseros[c.mesero] = 0;
}
conteoMeseros[c.mesero]++;

doc.document.write(`<p>
Line#: ${c.seq} — Qty: ${c.cantidad} - ${c.producto} <br>
Subtotal: $${subtotal.toFixed(2)} — Tax (9.5%): $${tax.toFixed(2)} — Total: $${totalConTax.toFixed(2)}<br>
Mesa ${c.mesa} — Nombre: ${c.cliente} — Fecha: ${new Date(c.fin).toLocaleString()}<br>
Mesero ${c.mesero}<br>
</p><hr>`);
});

// Mostrar resumen de órdenes por mesero
doc.document.write("<h3>Resumen de órdenes por mesero:</h3>");
for (const mesero in conteoMeseros) {
doc.document.write(`<p><strong>${mesero}:</strong> ${conteoMeseros[mesero]} órdenes</p>`);
}

doc.document.write(`<h3>Total general con tax: $${totalGeneralConTax.toFixed(2)}</h3>`);
doc.print();
};

// NUEVO BOTÓN: Imprimir todos los platillos de esta orden
card.querySelector(".print-orden").onclick = () => {
const lista = cerradas.filter(c => c.orden === o.orden);
const doc = window.open("");

doc.document.write(`<h1>Orden completa: ${o.orden}</h1>`);
doc.document.write(`<h3>Cliente: ${o.cliente} - Mesa: ${o.mesa}</h3>`);

let totalOrdenConTax = 0;

const nombreMesero = lista.length > 0 ? lista[0].mesero : "Desconocido";

lista.forEach(c => {
const subtotal = c.precio * c.cantidad;
const tax = subtotal * 0.095;
const totalConTax = subtotal + tax;
totalOrdenConTax += totalConTax;

doc.document.write(`<p>
Qty: ${c.cantidad} - ${c.producto} <br>
Subtotal: $${subtotal.toFixed(2)} — Tax (9.5%): $${tax.toFixed(2)} — Total: $${totalConTax.toFixed(2)}<br>
Fecha: ${new Date(c.fin).toLocaleString()}<br>

</p><hr>`);
});


doc.document.write(`<p><strong>Mesero:</strong> ${nombreMesero}</p>`);
doc.document.write(`<h3>Total de esta orden con tax: $${totalOrdenConTax.toFixed(2)}</h3>`);
doc.print();
};


cont.appendChild(card);
});
}

document.addEventListener("submit", function(e) {
if (e.target.id === "order-form") {
e.preventDefault();

const cantidad = parseInt(document.getElementById("cantidad").value);
const mesa = document.getElementById("mesa").value.trim();
const cliente = document.getElementById("cliente").value.trim();
const nota = document.getElementById("nota").value.trim();
const orden = document.getElementById("orden").value.trim();
const mesero = document.getElementById("mesero").value.trim();
const passMesa = document.getElementById("passMesa").value.trim(); // <-- NUEVO

const opciones = Array.from(document.querySelectorAll("#opciones-container input:checked"))
.map(el => el.value);

const idExistente = form.dataset.editandoDesdeCocina;

const nuevaOrden = {
producto: productoSeleccionado.nombre,
orden,
mesero,
cantidad,
mesa,
cliente,
nota,
opciones,
pass: passMesa, // <-- NUEVO CAMPO
id: idExistente ? parseInt(idExistente) : Date.now(),
start: new Date()
};

// Si venía de cocina, eliminarla primero
if (idExistente) {
const idx = enCocina.findIndex(o => o.id === parseInt(idExistente));
if (idx !== -1) {
enCocina[idx] = {
...nuevaOrden,
start: enCocina[idx].start,
working: enCocina[idx].working
};
saveData();
renderCocina();
updateCountCocina();
}
delete form.dataset.editandoDesdeCocina;
} else {
tomadas.push(nuevaOrden);
saveData();
renderTomadas();
}

document.getElementById("modal").classList.add("hidden");
alert("✅ Orden enviada correctamente");
}
});


document.getElementById("cambiar-modo").onclick = function () {
const confirmar = confirm("¿Deseas cambiar de modo de visualización?");
if (confirmar) {
localStorage.removeItem("modo"); // borra la preferencia guardada
location.reload(); // recarga la página para volver a preguntar
}
};

document.getElementById("cambiar-modo2").onclick = function () {
const confirmar = confirm("¿Deseas cambiar de modo de visualización?");
if (confirmar) {
localStorage.removeItem("modo"); // borra la preferencia guardada
location.reload(); // recarga la página para volver a preguntar
}
};


function seleccionarModo(modo) {
localStorage.setItem("modoApp", modo);
document.body.classList.add(modo === "movil" ? "modo-movil" : "modo-escritorio");
document.getElementById("modo-selector").style.display = "none";
iniciarApp();
}
// Si ya hay modo guardado, cargar automáticamente
const modoGuardado = localStorage.getItem("modoApp");
if (modoGuardado) {
document.getElementById("modo-selector").style.display = "none";
document.body.classList.add(modoGuardado === "movil" ? "modo-movil" : "modo-escritorio");
iniciarApp();
}

function iniciarApp() {
// 👇 Detectar o pedir el modo de visualización
let modo = localStorage.getItem("modo");

if (!modo) {
const usarMovil = confirm("¿Deseas usar el modo móvil?");
modo = usarMovil ? "movil" : "escritorio";
localStorage.setItem("modo", modo);
}

if (modo === "movil") {
document.body.classList.add("modo-movil");
} else {
document.body.classList.remove("modo-movil");
}

// ✅ Tu lógica original de iniciar la app
loadData();
renderMenu();
updateCountCocina();


$("btn-menu").onclick = () => { renderMenu(); switchSection(0); };
$("btn-tomadas").onclick = () => { renderTomadas(); switchSection(1); };
$("btn-cocina").onclick = () => { renderCocina(); switchSection(2); };
$("btn-cerradas").onclick = () => { renderCerradas(); switchSection(3); };

$("btn-menu2").onclick = () => { renderMenu(); switchSection(0); };
$("btn-tomadas2").onclick = () => { renderTomadas(); switchSection(1); };
$("btn-cocina2").onclick = () => { renderCocina(); switchSection(2); };
$("btn-cerradas2").onclick = () => { renderCerradas(); switchSection(3); };



$("modal-close").onclick = () => modal.classList.add("hidden");

modal.addEventListener("click", e => {
if (e.target === modal) e.stopPropagation();
});

}
iniciarApp();

function login() {
const email = document.getElementById("login-email").value;
const password = document.getElementById("login-password").value;

auth.signInWithEmailAndPassword(email, password)
.then(() => {
document.getElementById("login-container").style.display = "none";
document.getElementById("logout-btn").style.display = "block";
})
.catch(error => {
document.getElementById("login-error").textContent = error.message;
});
}

function logout() {
auth.signOut().then(() => {
// 🔒 Oculta login y muestra login container
document.getElementById("login-container").style.display = "flex";
document.getElementById("logout-btn").style.display = "none";

// 🔄 Cierra el sidebar si está abierto
document.getElementById("mySidenav").style.width = "0";
document.getElementById("mySidenav2").style.width = "0"; // si tienes otro sidebar

// 🧹 Limpia clases visuales
document.body.classList.remove("modo-movil", "modo-escritorio");

// 🧹 Limpia preferencias guardadas
localStorage.removeItem("modo");
localStorage.removeItem("modoApp");

// ✅ Opcional: limpiar contenido principal
const mainForm = document.getElementById("main-form");
if (mainForm) mainForm.style.display = "none";
});
}



// ⏳ Detectar si ya hay sesión activa
auth.onAuthStateChanged(user => {
if (user) {
document.getElementById("login-container").style.display = "none";
document.getElementById("logout-btn").style.display = "block";
iniciarApp(); // solo iniciar si hay sesión
} else {
document.getElementById("login-container").style.display = "flex";
document.getElementById("logout-btn").style.display = "none";
}
});

//WebSocket start

// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
(function () {
function refreshCSS() {
var sheets = [].slice.call(document.getElementsByTagName("link"));
var head = document.getElementsByTagName("head")[0];
for (var i = 0; i < sheets.length; ++i) {
var elem = sheets[i];
var parent = elem.parentElement || head;
parent.removeChild(elem);
var rel = elem.rel;
if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
}
parent.appendChild(elem);
}
}
var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
var address = protocol + window.location.host + window.location.pathname + '/ws';
var socket = new WebSocket(address);
socket.onmessage = function (msg) {
if (msg.data == 'reload') window.location.reload();
else if (msg.data == 'refreshcss') refreshCSS();
};
if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
console.log('Live reload enabled.');
sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
}
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}

// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
(function () {
function refreshCSS() {
var sheets = [].slice.call(document.getElementsByTagName("link"));
var head = document.getElementsByTagName("head")[0];
for (var i = 0; i < sheets.length; ++i) {
var elem = sheets[i];
var parent = elem.parentElement || head;
parent.removeChild(elem);
var rel = elem.rel;
if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
}
parent.appendChild(elem);
}
}
var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
var address = protocol + window.location.host + window.location.pathname + '/ws';
var socket = new WebSocket(address);
socket.onmessage = function (msg) {
if (msg.data == 'reload') window.location.reload();
else if (msg.data == 'refreshcss') refreshCSS();
};
if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
console.log('Live reload enabled.');
sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
}
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
function reiniciarNumeracion() {
if (confirm("¿Seguro que deseas reiniciar el contador de órdenes cerradas?")) {
seqCerradas = 0;
localStorage.setItem("seqCerradas", seqCerradas);
alert("✅ Contador reiniciado.");
}
}

// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
(function () {
function refreshCSS() {
var sheets = [].slice.call(document.getElementsByTagName("link"));
var head = document.getElementsByTagName("head")[0];
for (var i = 0; i < sheets.length; ++i) {
var elem = sheets[i];
var parent = elem.parentElement || head;
parent.removeChild(elem);
var rel = elem.rel;
if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
}
parent.appendChild(elem);
}
}
var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
var address = protocol + window.location.host + window.location.pathname + '/ws';
var socket = new WebSocket(address);
socket.onmessage = function (msg) {
if (msg.data == 'reload') window.location.reload();
else if (msg.data == 'refreshcss') refreshCSS();
};
if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
console.log('Live reload enabled.');
sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
}
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}

// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
(function () {
function refreshCSS() {
var sheets = [].slice.call(document.getElementsByTagName("link"));
var head = document.getElementsByTagName("head")[0];
for (var i = 0; i < sheets.length; ++i) {
var elem = sheets[i];
var parent = elem.parentElement || head;
parent.removeChild(elem);
var rel = elem.rel;
if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
}
parent.appendChild(elem);
}
}
var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
var address = protocol + window.location.host + window.location.pathname + '/ws';
var socket = new WebSocket(address);
socket.onmessage = function (msg) {
if (msg.data == 'reload') window.location.reload();
else if (msg.data == 'refreshcss') refreshCSS();
};
if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
console.log('Live reload enabled.');
sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
}
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}

// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
(function () {
function refreshCSS() {
var sheets = [].slice.call(document.getElementsByTagName("link"));
var head = document.getElementsByTagName("head")[0];
for (var i = 0; i < sheets.length; ++i) {
var elem = sheets[i];
var parent = elem.parentElement || head;
parent.removeChild(elem);
var rel = elem.rel;
if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
}
parent.appendChild(elem);
}
}
var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
var address = protocol + window.location.host + window.location.pathname + '/ws';
var socket = new WebSocket(address);
socket.onmessage = function (msg) {
if (msg.data == 'reload') window.location.reload();
else if (msg.data == 'refreshcss') refreshCSS();
};
if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
console.log('Live reload enabled.');
sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
}
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}

document.addEventListener("DOMContentLoaded", () => {
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
logoutBtn.addEventListener("click", () => {
firebase.auth().signOut().then(() => {
console.log("Sesión cerrada.");
window.location.href = "login.html"; // Redirige a la pantalla de login
}).catch((error) => {
console.error("Error al cerrar sesión:", error);
});
});
} else {
//console.warn("No se encontró el botón de logout en el DOM.");
}
});

function toggleMarquesina() {
const texto = document.getElementById("texto-marquesina");
const btn = event.target;

texto.classList.toggle("paused");
btn.textContent = texto.classList.contains("paused")
? "Activar Texto Animado"
: "Desactivar Texto Animado";
}

function lanzarEstrellas() {
const container = document.querySelector(".marquesina-container");

setInterval(() => {
const estrella = document.createElement("div");
estrella.className = "estrella";
estrella.textContent = "💎 🪩";

// Posición horizontal aleatoria
estrella.style.left = Math.random() * container.offsetWidth + "px";

// Duración aleatoria
estrella.style.animationDuration = (2 + Math.random() * 2) + "s";

container.appendChild(estrella);

// Eliminar después de la animación
setTimeout(() => {
estrella.remove();
}, 4000);
}, 300); // Cada 300ms aparece una estrella
}

lanzarEstrellas();

function openNav() {
document.getElementById("mySidenav").style.width = "20%";
}

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
}

function openNav2() {
document.getElementById("mySidenav2").style.width = "80%";
}

function closeNav2() {
document.getElementById("mySidenav2").style.width = "0";
}


/*
Emojis que puedes usar para efectos visuales
Categoría	Emojis sugeridos	Ideal para...
✨ Estrellas y magia	⭐ ✨ 🌟 💫 🪄	Fantasía, celebraciones
❤️ Amor y ternura	❤️ 💖 💘 💝 💗	Romántico, afectivo
🎉 Fiesta y alegría	🎉 🎊 🪅 🎈 🥳	Eventos, cumpleaños, festejos
🌸 Naturaleza	🌸 🌼 🍃 🍂 🍁	Primavera, otoño, relajación
🐾 Animales	🐶 🐱 🐰 🐥 🐾	Infantil, divertido
🔥 Elementos	🔥 💧 🌪️ 🌈 ⚡	Acción, energía, clima
💎 Objetos brillantes	💎 🪩 🧿 🧸 🪙	Lujo, juguetón, místico
🍬 Dulces y comida	🍭 🍬 🍫 🍩 🍪	Temas dulces, infantiles
🧠 Creatividad	🧠 🪐 🎨 🧵 🧩	Arte, ciencia, imaginación

*/

