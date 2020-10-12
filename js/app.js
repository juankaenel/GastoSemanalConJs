//--------- Variables y Selectores ---------
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//--------- Eventos ---------
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto());
}


//--------- Clases ---------



//--------- Funciones ---------
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cuál es el presupuesto?');
    console.log(presupuestoUsuario);


    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){ //Si está vacio,es null, o no es un NaN, o es un num negativo-> recargar el prompt
        window.location.reload();
    }
}