function leerProductoActualizado(r) { //no anda.
    return {
        nombre: r,
        precio: "this.inputs[1].value",
        stock: "this.inputs[2].value",
        marca: "this.inputs[3].value",
        categoria: "this.inputs[4].value",
        foto: "this.inputs[5].value",
        detalles: "this.inputs[6].value",
        envio: "this.inputs[7].checked",
    }
}

class ProductoController extends ProductoModel {

    constructor() {
        super()
        this.guardarProducto = this.guardarProducto.bind(this) //rever
    }

    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }

    async guardarProducto(producto) { // guarda y renderiza. rever, mala practica?
        let productoGuardado = await productoService.guardarProductoService(producto) //guarda en api
        console.log(productoGuardado) 

        this.productos.push(productoGuardado) //guarda en arr

        renderTablaAlta(null, this.productos) //luego de pushear al array, renderiza nueva tabla de productos en api
    }

    
    async actualizarProducto(id,ref) {
        let target = ref.parentElement.parentElement.querySelector(".primerSel")  //rever si no se puede hacer por handlebars acceder al padre de html con ../
        console.log(ref)
        if (ref.classList.contains("inactive")){   //si esta inactivo, activar
        console.log('actualizarProducto', id)
        console.log(ref) 
        console.log(target.innerHTML)
        target.innerHTML = `<input type="text" id="fname" name="fname"><br><br>`
        console.log(target.innerHTML)
        ref.classList.replace("inactive", "active")
        //lectura
 
        }else{
            ref.classList.replace("active", "inactive")
            console.log(target.querySelector("input").value)
            console.log(leerProductoActualizado(target.querySelector("input").value))
            let productoNuevo = leerProductoActualizado((target.querySelector("input").value))


            let productoActualizado= await productoService.actualizarProductoService(id,productoNuevo)
            console.log(productoActualizado)
            console.log("enviado")
            
          let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
        this.productos.splice(index,1,productoActualizado)

          renderTablaAlta(null, this.productos)
        } 

         
        
        /*
        //producto nuevo
        let productoActualizado = await productoService.actualizarProductoService(id,producto)
        console.log(productoActualizado)

        //
        let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
        this.productos.splice(index,1,productoActualizado)

        renderTablaAlta(null, this.productos) 
        /*
        let producto = formularioAlta.leerProductoIngresado()
        formularioAlta.limpiarFormulario()

        let productoActualizado = await productoService.actualizarProductoService(id,producto)
        console.log(productoActualizado)

        let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
        this.productos.splice(index,1,productoActualizado)

        renderTablaAlta(null, this.productos)*/

         
    }

    async borrarProducto(id) {
        console.log('borrarProducto', id)

        let productoBorrado = await productoService.borrarProductoService(id)
        
        let index = this.productos.findIndex(producto => producto.id == productoBorrado.id)
        console.log('indice', index)
        this.productos.splice(index,1)

        renderTablaAlta(null, this.productos)
    }
}

 


const productoController = new ProductoController()