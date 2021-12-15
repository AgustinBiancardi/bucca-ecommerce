if (!localStorage.getItem("carrito")) {
  localStorage.setItem("carrito", JSON.stringify([]))
}

class Producto {
  constructor(nombre, precio, stock, id, carrito) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
    this.carrito = carrito;
  }

  sumaIVA() {
    return this.precio * 1.21;
  }

  venderProducto(cantidadAComprar, descuento) {
    if (this.disponibilidadStock(cantidadAComprar)) {
      let precioFinal = this.sumaIVA();
      this.stock = this.stock - cantidadAComprar;
      return `Resumen de la compra: \n Producto: ${this.nombre
        } \n Cantidad: ${cantidadAComprar} \n Precio Unidad: ${this.precio
        } \n IVA Unidad: ${this.precio * 0.21
        } \n Descuento: ${descuento}% \n Precio Total: ${parseInt(
          precioFinal * cantidadAComprar
        )} \n Precio Final: ${parseInt(
          this.descuentoProducto(precioFinal * cantidadAComprar, descuento)
        )}`;
    } else {
      return (
        "No contamos con la cantidad de productos requerida. Stock disponible: " +
        this.stock
      );
    }
  }

  disponibilidadStock(cantidadAComprar) {
    if (cantidadAComprar <= Number(this.stock)) {
      return true;
    } else {
      return false;
    }
  }

  descuentoProducto(precio, descuento) {
    return precio - precio * (descuento / 100);
  }
}

const productos = [];
productos.push(new Producto("agua Mineral", 90, "5", 1, 0));
productos.push(new Producto("fideos", 70, "10", 2, 0));
productos.push(new Producto("galletitas de agua", 35, "3", 3, 0));
productos.push(new Producto("queso rallado", 50, "7", 4, 0));
productos.push(new Producto("arroz", 35, "15", 5, 0));
productos.push(new Producto("harina", 20, "20", 6, 0));
productos.push(new Producto("jamon", 15, "9", 7, 0));
productos.push(new Producto("jugo de naranja", 40, "10", 8, 0));
productos.push(new Producto("coca Cola", 90, "5", 9, 0));
productos.push(new Producto("galletitas oreo", 70, "10", 10, 0));
productos.push(new Producto("galletitas pepitos", 60, "3", 11, 0));
productos.push(new Producto("aceite", 50, "7", 12, 0));

let nuevoArrayProductos = productos;
$(".btnComprar").on("click", agregarAlCarrito)

if (document.getElementById("buscarProducto")) {
  document.getElementById("buscarProducto").addEventListener("click", buscarProducto)
}

function buscarProducto() {
  let nombreProducto = document.querySelector("#nombre-producto").value;

  const productosEncontrados = nuevoArrayProductos.filter((producto) =>
    producto.nombre.includes(nombreProducto.toLowerCase())
  );

  if (productosEncontrados.length) {
    mostrarProductos(productosEncontrados);
  } else {
    alert("No se encontró el producto. Volvé a intentarlo");
    mostrarProductos(productos);
  }
}

function resetearProductos() {
  let listaDeProductos = document.querySelector("#productos");
  document.body.removeChild(listaDeProductos);

  let nuevaListaProductos = document.createElement("div");
  nuevaListaProductos.id = "productos";
  document.body.appendChild(nuevaListaProductos);
}

function mostrarProductos(productosEncontrados) {
  resetearProductos();
  let contenedorDeProductos = document.getElementById("productos");
  for (let producto of productosEncontrados) {
    let nombreImagen = producto.nombre.toLowerCase().split(" ").join("-");
    let contenedor = document.createElement("article");
    contenedor.innerHTML = `
        <article class="producto transicion>
            <input value= "${producto.id}" type="hidden">
            <img src="imagenes/${nombreImagen}.jpg">
            <span>$${producto.precio}</span>
            <h3> ${producto.nombre} </h3>
            <button class = "btnComprar" id="${producto.id}">Comprar</button>
            <p style="display: none;" id="oculto${producto.id}">El producto se agregó al carrito!</p>
        </article>
        `;
    contenedorDeProductos.appendChild(contenedor);
  }
  $(".btnComprar").on("click", agregarAlCarrito)
}

function ordenarProductos(opcion) {
  let productosOrdenados;
  if (opcion === "menor") {
    productosOrdenados = nuevoArrayProductos.sort(function (a, b) {
      return a.precio - b.precio;
    });
  } else {
    productosOrdenados = nuevoArrayProductos.sort(function (a, b) {
      return b.precio - a.precio;
    });
  }
  mostrarProductos(productosOrdenados);
}

$(".verCarrito").click(function (e) {
  e.preventDefault();
  window.location.href = "carrito.html";
});

let carrito = [];

const URLGET = "./data/productos.json";


function agregarAlCarrito(e) {
  const { id } = e.target

  let productoAComprar = productos.find(producto => producto.id == id);
  carrito = JSON.parse(localStorage.getItem("carrito"))
  carrito.push(productoAComprar)
  localStorage.setItem("carrito", JSON.stringify(carrito))
  $(`#oculto${productoAComprar.id}`).slideDown(500).delay(500).slideUp(500);
}

let obtenerProductos = JSON.parse(localStorage.getItem("carrito"));
let carritoFinal = []
total = 0;

if (obtenerProductos.length !== 0) {

  for (let producto of obtenerProductos) {
    if (repetido = carritoFinal.find(elemento => elemento.id == producto.id)) {
      repetido.carrito++
    } else {
      producto.carrito++
      carritoFinal.push(producto)
    }
  }

  for (const producto of carritoFinal) {
    let nombreImagen = producto.nombre.toLowerCase().split(" ").join("-");
    total += parseFloat(producto.precio * producto.carrito);
    $("#carritoProductos").append(`
        <article class="producto" id = "${producto.nombre}">
        <img src="Imagenes/${nombreImagen}.jpg">
        <h3> ${producto.nombre} </h3>
        <p class = "${producto.nombre}carrito">X ${producto.carrito}</p>
        <button id="${producto.id}" class="btnEliminar">Eliminar</button>
        </article>
        `);

    $("#carritoPrecioProductos").append(`
          <span name="${producto.nombre}" style="display: inline;">Precio ${producto.nombre}: $ <p style="display: inline;" class="${producto.nombre} precio" >${producto.precio * producto.carrito}</p></span> <br> <br>
          `
    );
  }
  $(".btnEliminar").on("click", eliminarProductoStock)
  $("#carritoPrecioProductos").append(`

      <span style="display: inline;" class = "precioFinal"> Precio total: $ <p id="precioFinal" class = "precio" style="display: inline;">${total}</p></span>
      `);

} else {
  $("#alerta").append(`No hay productos seleccionados, vuelve al inicio para agregar productos!`)
}

function eliminarProductoStock(e) {
  const { id } = e.target

  productoAEliminar = carritoFinal.find(producto => producto.id == id);
  
  let precioFinal = document.getElementById("precioFinal")
  let carritoSeleccionado = document.getElementById(`${productoAEliminar.nombre}`)
  let precioSeleccionado = document.getElementsByClassName(`${productoAEliminar.nombre}`)
  let precioABorrar = document.getElementsByName(`${productoAEliminar.nombre}`)

  if (productoAEliminar.carrito == 1) {

    carritoProductos.removeChild(carritoSeleccionado);
    
    let resultado = Number(precioFinal.innerText) - Number(precioSeleccionado[0].innerText)
    if (resultado == 0) {
      let precioFinalModificar = document.getElementsByClassName("precioFinal")
      precioFinalModificar[0].innerText = ""
      document.getElementById('alerta').innerText = "No hay productos seleccionados, vuelve al inicio para agregar productos!"
    } else {
      precioFinal.innerText = resultado
    }

    let obtengoProductos = JSON.parse(localStorage.getItem("carrito"))

    let nuevoCarrito = []
    obtengoProductos.forEach(product => {
      if (product.nombre !== productoAEliminar.nombre) {
        nuevoCarrito.push(product)
      }
    });
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito))

    carritoPrecioProductos.removeChild(precioABorrar[0])
  }else{
    let repes = document.getElementsByClassName(`${productoAEliminar.nombre}carrito`)
    productoAEliminar.carrito --
    repes[0].innerText = `X ${productoAEliminar.carrito}`
    precioSeleccionado[0].innerText = productoAEliminar.precio * productoAEliminar.carrito
    precioFinal.innerText = Number(precioFinal.innerText) - Number(productoAEliminar.precio)
  }
}