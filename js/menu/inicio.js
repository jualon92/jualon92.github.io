
//crear 20 contadores

function despertarBotonCant(ele) {
    let contadorDisplay = 0;
    const btnAdd = ele.querySelector(".btn-sumar")
    const display = ele.querySelector(".internal-clock")
    const btnSust = ele.querySelector(".btn-sustraer");
    const nombre = ele.querySelector(".card__heading")

    btnAdd.addEventListener("click", function (ev) {
        ev.preventDefault() //evitar que form cause un refresh, podria hacerse en el for each
        contadorDisplay++
        display.innerHTML = contadorDisplay;
        console.log(nombre.innerHTML + ": " + contadorDisplay)
    })

    btnSust.addEventListener("click", function (ev) {
        ev.preventDefault()
        if (contadorDisplay <= 1) {
            display.innerHTML = 0;
        } else {
            contadorDisplay = contadorDisplay - 1
            display.innerHTML = contadorDisplay;

        }
        console.log(nombre.innerHTML + ": " + contadorDisplay)
    })
}


function despertarBotonesCant(cartasPlaceholders) {
    cartasPlaceholders.forEach(despertarBotonCant)
}



async function renderPlantillaListado(listado) { //paso como parametro lista filtrada al detectar busqueda

    let plantillaHbs = await fetch('plantillas/inicio.hbs').then(r => r.text()) // obtener plantilla
    var template = Handlebars.compile(plantillaHbs);
    // execute the compiled template and print the output to the console
    //let html = template({ productos: productos, validos: !algunCampoNoValido() })
    //let html = template({ listado : listado.filter(prod => prod.nombre.includes('f')) })
    Handlebars.registerHelper('instanciar', function () {
        let b = 0
        return b
    });
    let html = template({ listado })
    document.getElementsByClassName('cards-container')[0].innerHTML = html
    despertarBotonesCant(document.querySelectorAll(".card-placeholder"))

}






function agregarCarrito(e, id, ref) { // 
    e.preventDefault()
    let contadorDisplay = ref.parentNode.parentNode.querySelector(".internal-clock").innerHTML
    console.log(contadorDisplay) // rever mejor manera

    //ref.classList.toggle('card--seleccionada')/
    let producto = productoController.productos.find(producto => producto.id == id) // que producto es
    if (contadorDisplay) { // si se tiene cantidad en display
        carritoController.agregarAlCarritoSuma(producto, contadorDisplay)
    } else{
        carritoController.agregarAlCarrito(producto) //para que dos funciones? podria detectar que no hay cantidad y sumar de a uno.   No utilizo display = sumar de a 1, utilizo display = sumar de contador.
    }

}



function getContadorActual(ref) {
    let contador = ref.getDomParent().querySelector("internal-clock").text
    return contador
}


async function initInicio() {
    console.warn('initInicio()')

    var productos = await productoController.obtenerProductos()
    await renderPlantillaListado(productos)

    document.querySelector('.section-cards__header p').innerHTML = `Se encontraron ${productos.length} productos`

    const botonBusqueda = document.querySelector(".search-bar__form-submit")

    botonBusqueda.addEventListener("click", (ev) => {
        ev.preventDefault()
        const contenidoABuscar = document.querySelector(".search-bar__form-search").value.toUpperCase()
        console.log("valor ingresado: " + contenidoABuscar)
        console.log("hola")
        console.log(productos)
        if (contenidoABuscar){  //busqueda vacia 
            
            const listaFiltrada = productos.filter(prod => prod.nombre.toUpperCase().includes(contenidoABuscar))
            console.log(listaFiltrada)
             renderPlantillaListado(listaFiltrada)

            document.querySelector('.section-cards__header p').innerHTML = `Se encontraron ${listaFiltrada.length} productos`
        }else{ //nada en la barra de busqueda, o la barra de busqueda contenido fue borrado, muestra todo de nuevo
             renderPlantillaListado(productos)

        }


    })

}

