//--------- Variables y Selectores ---------
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//--------- Eventos ---------
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


//--------- Clases ---------
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {

}

//Instancia
const ui = new UI();
let presupuesto;

//--------- Funciones ---------
function preguntarPresupuesto() {

    const presupuestoUsuario = prompt('¿Cuál es el presupuesto?');
    //console.log(presupuestoUsuario);

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) { //Si está vacio,es null, o no es un NaN, o es un num negativo-> recargar el prompt
        window.location.reload();
    }
    //validar presupuesto
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

}