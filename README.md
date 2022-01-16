eCommerce, SPA con js vanilla. utiliza handlebars y ajax

1. la informacion de la carta es pedida a mock api mediante ajax. Luego es renderizada, se utiliza handlebars para el html de cada carta. (ventajas:mantiene coloreado, separa logica js de html)

2. inicio alta contacto y nosotros no causan refresco, se conserva la habilidad de ir hacia atras y adelante en navegacion mediante add.eventListener y hashchange como trigger

3. En alta se agregan cartas a mock api mediante ajax. Se utiliza validacion mediante regexp

4. Al agregarse una carta, se agrega a la table y  se renderiza en inicio. 

5. el carrito se accede presionando el simbolo de carrito, apretar afuera o esperar cierto tiempo lo vuelve invisible

6. al presionar agregar a carrito se agrega 1 a la cantidad de productos en el carrito

8. posibilidad de añadir mas de una compra a la vez mediante botones - y + en cada carta. Si quiero comprar 10 cables, no tengo que presionar 10 veces el boton 
 


