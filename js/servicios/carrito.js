class CarritoService {
    URL_CARRITO = 'https://61c0e6c233f24c0017823675.mockapi.io/carrito'//'https://5c8ef17a3e557700145e85c7.mockapi.io/carrito/'

    async guardarCarritoService(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()
