class FormularioAlta {
    inputs = null
    form = null
    button = null
    camposValidos= [false,false,false,false,false,false,false]
    regExpValidar = [ //mejorar regex
        /^.+$/, //regexp nombre
        /^[0-9]+$/, //regexp precio, estaria bueno que no incluya 0
        /^[0-9]+$/, //regexp stock
        /^.+$/, //regexp marca
        /^.+$/, //regexp categoria
        /^.+$/, //regexp detalles
        /^.+$/, //regexp foto
    ]

    constructor(renderTablaAlta, guardarProducto) {
        this.inputs = document.querySelectorAll('main form input')
        this.form = document.querySelector('main form')
        this.button = document.querySelector('.form-alta__p') 
    
        this.button.disabled = true
    
        //console.log(inputs)
        this.inputs.forEach((input,index) => {
            if(input.type != 'checkbox') {
                input.addEventListener('input', () => { //input value has been changed
                    this.validar(input.value, this.regExpValidar[index], index )
                    if(renderTablaAlta) renderTablaAlta( !this.algunCampoNoValido(), productoController.productos )  //rever
                })
            }
        })
        

        //al submit
        this.form.addEventListener('submit', e => { 
            e.preventDefault()
            console.log("leyendo")
            let producto = this.leerProductoIngresado()
             this.limpiarFormulario()
            console.log("limpiando")

             if(guardarProducto) guardarProducto(producto) // guarda en api y renderiza, mejor serian dos funciones, rever
         //   console.log("cargo exitosa")
        })
    }
    
    setCustomValidityJS = function(mensaje, index) {
        let divs = document.querySelectorAll('.notificacion')
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje? 'inline' : 'none'
    }

    algunCampoNoValido() {
        let valido = 
            this.camposValidos[0] &&
            this.camposValidos[1] &&
            this.camposValidos[2] &&
            this.camposValidos[3] &&
            this.camposValidos[4] &&
            this.camposValidos[5] &&
            this.camposValidos[6]
        
        return !valido
    }

    validar(valor, validador, index) {
        //console.log(valor,index)

        if(!validador.test(valor)) {
            this.setCustomValidityJS('Este campo no es válido',index)
            this.camposValidos[index] = false
            this.button.disabled = true
            return null
        }

        this.camposValidos[index] = true
        this.button.disabled = this.algunCampoNoValido()

        this.setCustomValidityJS('',index)
        return valor
    }

    leerProductoIngresado() { //no anda.
        return {
            nombre: this.inputs[0].value,
            precio: this.inputs[1].value,
            stock: this.inputs[2].value,
            marca: this.inputs[3].value,
            categoria: this.inputs[4].value,
            foto: this.inputs[5].value,
            detalles: this.inputs[6].value,
            envio: this.inputs[7].checked,
        }
    }

    limpiarFormulario() {
        //borro todos los input
        this.inputs.forEach(input => {
            if (input.type == 'checkbox') {
                input.checked = false
            } else if (input.value !== "Enviar" && input.value !== "Borrar") { //rever, refactor
                input.value = ''
            }
        })
    
        this.button.disabled = true
        this.camposValidos = [false,false,false,false,false,false,false]
    }
}
 

/* ------------------------------------------------------------ */
/*      render helper                                           */
/* ------------------------------------------------------------ */

function renderTablaAlta(hayValidos, productos) {

    const xhr = new XMLHttpRequest
    xhr.open('get','plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            let plantillaHbs = xhr.response

            var template = Handlebars.compile(plantillaHbs);
            let html = template({ productos, hayValidos })
            document.getElementById('listado-productos').innerHTML = html            
        }
    })
    xhr.send()
}

/* ------------------------------------------------------------ */
/*      Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------------ */

let formularioAlta = null

async function initAlta() {
    console.warn('initAlta()')
    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto) 

    //render tabla inicial desde api
    let productosIniciales = await productoController.obtenerProductos() // pide productos api
    renderTablaAlta(null, productosIniciales)
}