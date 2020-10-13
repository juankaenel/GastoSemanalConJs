//--------- Variables y Selectores ---------
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//--------- Eventos ---------
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    document.addEventListener('submit', agregarGasto);

}


//--------- Clases ---------
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        //console.log(this.gastos);
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto) => total + gasto.cantidad,0); //total =+ total+gasto, empieza en cero total. gasto equivale al item de cada iteración de gastos
        this.restante = this.presupuesto-gastado;
        console.log(this.restante);
    }
}

class UI {
    insertarPresupuesto(cantidad){ //cantidad viene a ser el objeto presupuesto
        //extraemos los valores
        const {presupuesto, restante} = cantidad;
        //añadimos al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje,tipo){
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');
        //le damos el formato segun el tipo
        if (tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }
        else{
            divMensaje.classList.add('alert-success')
        }
        //agregamos mensaje
        divMensaje.textContent= mensaje;
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //Quitamos dsp de un tiempo
        setTimeout(()=>{
            divMensaje.remove();
        },500);
    };
    agregarGastoListado(gastos){
        //limpio el gasto previo
        this.limpiarHTML();

        gastos.forEach(gasto=>{ //itera el array de gastos
            const {nombre, cantidad, id} = gasto;
            //creamos li
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id; //equivale a -> nuevoGasto.setAttribute('data-id',id); -> dataset = data, con .id me queda data-id
            console.log(nuevoGasto);
            //agregar el html del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span> `

            //botón para borrar gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.innerHTML = '&times';
            // btnBorrar.textContent = 'x';
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            nuevoGasto.appendChild(btnBorrar);
            //agregar al html
            gastoListado.appendChild(nuevoGasto);

        })
    }
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }
    limpiarHTML(){
        while(gastoListado.firstChild){ //mientras haya algo dentro de gastoListado
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
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

    ui.insertarPresupuesto(presupuesto);

}

function agregarGasto(e){
    e.preventDefault();
    //Leemos datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre=== '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios','error');
        return; //corto el ciclo hasta acá y no se ejecuta lo de abajo
    }
    else if(cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no válida','error');
        return; //corto el ciclo
    }
    else if(!isNaN(nombre)){
        ui.imprimirAlerta('Nombre inválido','error');
        return; //corto el ciclo
    }

    //Creamos un objeto con el gasto
    const gasto = {nombre, cantidad, id: Date.now()}; //copiamos el nombre y la cantidad en el objeto  gasto

    //Añado el gasto
    presupuesto.nuevoGasto(gasto);
    //mensaje de confirmación
    ui.imprimirAlerta('Gasto agregado correctamente');
    //Imprimir los gastos y actualizar restante
    const {gastos,restante} = presupuesto;

    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);

    formulario.reset(); //reseteamos el formulario


}
