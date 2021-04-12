// Variables
const btnCalcular = document.querySelector("#calcular");
const btnLimpiar = document.querySelector("#limpiar");
const divMensaje = document.querySelector("#mensaje");

// Clases

class Conversion{
    constructor(valor, unidad1, unidad2){
        this.valor = Number(valor);
        this.unidad1 = unidad1;
        this.unidad2 = unidad2;
        this.resultado = 0;
    }

    // Devuelve un número de acuerdo a las unidades seleccionadas por el usuario
    devuelveOpcion(){
        // Si unidad1 es mCi
        if(this.unidad1 == "mCi" && this.unidad2 == "mCi") return 0;
        if(this.unidad1 == "mCi" && this.unidad2 == "MBq") return 1;
        if(this.unidad1 == "mCi" && this.unidad2 == "dpm") return 2;

        // Si unidad1 es MBq
        if(this.unidad1 == "MBq" && this.unidad2 == "mCi") return 3;
        if(this.unidad1 == "MBq" && this.unidad2 == "MBq") return 4;
        if(this.unidad1 == "MBq" && this.unidad2 == "dpm") return 5;

        // Si unidad1 es dpm
        if(this.unidad1 == "dpm" && this.unidad2 == "mCi") return 6;
        if(this.unidad1 == "dpm" && this.unidad2 == "MBq") return 7;
        if(this.unidad1 == "dpm" && this.unidad2 == "dpm") return 8;

        return -1;
    }

    // Calcula el resultado de la conversión
    calcularConversion(opcion){

        switch(opcion){
            case 0:
                this.resultado = this.valor;
                break;
            case 1:
                this.resultado = (this.valor * 37).toFixed(2);
                break;
            case 2:
                this.resultado = (this.valor * (2.22 * Math.pow(10, 9))).toExponential(2);
                break
            case 3:
                this.resultado = (this.valor / 37).toFixed(2);
                break;
            case 4:
                this.resultado = this.valor;
                break;
            case 5:
                this.resultado =  (this.valor * (6 * Math.pow(10, 7))).toExponential(2);
                break;
            case 6:
                this.resultado = (this.valor / (2.22 * Math.pow(10, 9))).toExponential(2);
                break;
            case 7:
                this.resultado = this.valor / (6 * Math.pow(10, 7)).toExponential(2);
                break;
            case 8:
                this.resultado = this.valor;
                break;
            
        }

        return true;

    }

}

class Interfaz{
    // Recibe un mensaje y su tipo y lo muestra en pantalla
    mostrarMensaje(mensaje, tipo){

        if(tipo === "negativo"){
            divMensaje.classList.remove("correcto");
            divMensaje.classList.add("negativo");
        } else {
            divMensaje.classList.remove("negativo");
            divMensaje.classList.add("correcto");
        }

        divMensaje.innerHTML = `
        <p> ${mensaje} </p>
        `;
        divMensaje.style.display = "block";

        setTimeout(function(){
            divMensaje.style.display = "none";
        }, 2000);
        
    }

    // Recibe una instacia de Conversión y muestra el resultado de la conversión en pantalla.
    mostrarResultado(conversion){

        const resultado = document.querySelector("#resultado");

        setTimeout(function(){
            const divResultado = document.createElement("div");
            divResultado.innerHTML = `
            <h3> Resultado: </h3>
            <p> ${conversion.valor} ${conversion.unidad1} = ${conversion.resultado} ${conversion.unidad2} </p>
        `;
            resultado.appendChild(divResultado);
        }, 2000);

        
    }

}

// Event Listeners

document.addEventListener("DOMContentLoaded", inicioApp);

btnCalcular.addEventListener("click", convertirUnidades);

btnLimpiar.addEventListener("click", limpiarFormulario);

// Funciones

function inicioApp(){
    const valor = document.querySelector("#valor");
    valor.value = 0;
    divMensaje.style.display = "none";
}

function convertirUnidades(e){

    e.preventDefault();
    
    const valor = document.querySelector("#valor").value;
    const unidad1 = document.querySelector("#u1").value;
    const unidad2 = document.querySelector("#u2").value;
    const divResultado = document.querySelector("#resultado div");

    const conversion = new Conversion(valor, unidad1, unidad2);
    const interfaz = new Interfaz();

    if(divResultado != null){
        divResultado.remove();
    }
    

    if(valor >= 0){
        let opcion = conversion.devuelveOpcion();
        conversion.calcularConversion(opcion);
        const spinner = document.querySelector("#spinner");

        interfaz.mostrarMensaje("Calculando...", "correcto");
        spinner.style.display = "block";
        setTimeout(function(){
            spinner.style.display = "none";
        }, 2000);
        interfaz.mostrarResultado(conversion);

    } else{
        interfaz.mostrarMensaje("El valor de Actividad no puede ser negativo", "negativo");
    }

    

}

function limpiarFormulario(e){

    e.preventDefault();

    const formulario = document.querySelector("#formulario");
    const valor = document.querySelector("#valor");
    const divResultado = document.querySelector("#resultado div");

    formulario.reset();
    valor.value = 0;
    if(divResultado != null){
        divResultado.remove();
    }

}

