// Elementos del DOM
const contenedor = document.getElementById("contenedor-productos");
const btnAgregar = document.getElementById("btn-agregar");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputImagen = document.getElementById("imagen");

// Productos predeterminados Blue Lock
let productos = [
  { id: 1, nombre: "Reo peluche", precio: 850, imagen: "img/1.jpeg" },
  { id: 2, nombre: "Sae peluche", precio: 250, imagen: "img/2.jpeg" },
  { id: 3, nombre: "Póster Blue Lock", precio: 1200, imagen: "img/3.jpeg" },
  { id: 4, nombre: "Llavero Bachira", precio: 600, imagen: "img/4.jpeg" },
  { id: 5, nombre: "Figura Nagi", precio: 180, imagen: "img/5.jpeg" },
  { id: 6, nombre: "Playera Kaiser", precio: 340, imagen: "img/6.jpeg" },
  { id: 7, nombre: "Peluches Blue Lock", precio: 720, imagen: "img/7.jpeg" },
  { id: 8, nombre: "Figura Sae Itoshi", precio: 210, imagen: "img/8.jpeg" },
  { id: 9, nombre: "Pack de figuras", precio: 160, imagen: "img/9.jpeg" },
  { id: 10, nombre: "Lapiceros Blue Lock", precio: 130, imagen: "img/10.jpeg" },
  { id: 11, nombre: "Lapicera Blue Lock", precio: 300, imagen: "img/11.jpeg" },
  { id: 12, nombre: "Pin Nagi Seishiro", precio: 280, imagen: "img/12.jpeg" },
  { id: 13, nombre: "Figura Bachira", precio: 400, imagen: "img/13.jpeg" },
  { id: 14, nombre: "Taza Nagi", precio: 190, imagen: "img/14.jpeg" },
  { id: 15, nombre: "Pack Chigiri", precio: 220, imagen: "img/15.jpeg" },
  { id: 16, nombre: "Anillos", precio: 350, imagen: "img/16.jpeg" },
  { id: 17, nombre: "Uñas Kaiser", precio: 90, imagen: "img/17.jpeg" },
  { id: 18, nombre: "Pulsera Nagi", precio: 110, imagen: "img/18.jpeg" },
  { id: 19, nombre: "Collar Blue Lock", precio: 170, imagen: "img/19.jpeg" },
  { id: 20, nombre: "Llaveros Blue Lock", precio: 270, imagen: "img/20.jpeg" }
];

// Guardar productos en localStorage
function guardarEnLocal() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Mostrar productos en la página
function mostrarProductos() {
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    // Usar placeholder si no hay imagen
    const imgSrc = producto.imagen || "https://via.placeholder.com/200x180?text=Sin+Imagen";

    div.innerHTML = `
      <img src="${imgSrc}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="btn-eliminar">Eliminar</button>
    `;

    // Botón eliminar
    div.querySelector(".btn-eliminar").addEventListener("click", () => {
      productos.splice(index, 1);
      guardarEnLocal();
      mostrarProductos();
    });

    contenedor.appendChild(div);
  });
}

// Convertir imagen a Base64
function convertirABase64(archivo, callback) {
  const lector = new FileReader();
  lector.onload = () => callback(lector.result);
  lector.readAsDataURL(archivo);
}

// Agregar producto desde formulario
btnAgregar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  const precio = inputPrecio.value.trim();
  const archivo = inputImagen.files[0];

  if (!nombre || !precio || !archivo) {
    alert("⚠️ Por favor completa todos los campos.");
    return;
  }

  convertirABase64(archivo, (base64) => {
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      precio: Number(precio),
      imagen: base64
    };

    productos.push(nuevoProducto);
    guardarEnLocal();
    mostrarProductos();

    inputNombre.value = "";
    inputPrecio.value = "";
    inputImagen.value = "";
  });
});

// Cargar productos desde localStorage o usar predeterminados
function cargarProductos() {
  let guardados = [];
  try {
    guardados = JSON.parse(localStorage.getItem("productos")) || [];
  } catch (e) {
    guardados = [];
  }

  if (guardados.length === 0) {
    // Primera carga: usar productos predeterminados
    productos = [...productos]; // copia predeterminados
    guardarEnLocal();           // guardar en localStorage
  } else {
    productos = guardados;      // usar datos guardados
  }

  mostrarProductos();
}

// Inicializar
cargarProductos();
