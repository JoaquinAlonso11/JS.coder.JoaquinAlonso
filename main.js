const config = {
  dataUrl: "data.json",
  categoriasSeguro: {},
  aumentos: {},
  mensajes: {}
};

// Función para cargar datos desde data.json
async function cargarDatosDesdeJSON() {
  try {
    const response = await fetch(config.dataUrl);
    const data = await response.json();

    // Actualizar las propiedades con los datos obtenidos
    config.categoriasSeguro = data.categoriasSeguro;
    config.aumentos = data.aumentos;
  } catch (error) {
    console.error("Error al cargar datos desde data.json", error);
  }
}

// Llama a la función para cargar datos cuando se carga la página
document.addEventListener("DOMContentLoaded", cargarDatosDesdeJSON);

const resultContainer = document.getElementById("resultContainer");


// Variable global para rastrear el estado del checkbox
let checkboxChecked = false;
const compareCheckbox = document.getElementById("compare");

compareCheckbox.addEventListener("change", function() {
  checkboxChecked = compareCheckbox.checked;
  sessionStorage.setItem("checkboxState", checkboxChecked);
});

document.addEventListener("DOMContentLoaded", function() {
  // Obtener una referencia a todos los elementos de entrada que deseas rastrear
  const ageInput = document.getElementById("age");
  const categoriaSelect = document.getElementById("categoria");
  const cuotasCall = document.getElementById("cuotas");

  
  // Agrega manejadores de eventos para los cambios en los elementos de entrada
  ageInput.addEventListener("input", function() {
    sessionStorage.setItem("ageInputValue", ageInput.value);
  });

  categoriaSelect.addEventListener("change", function() {
    sessionStorage.setItem("categoriaSelectValue", categoriaSelect.value);
  });

  cuotasCall.addEventListener("change", function() {
    sessionStorage.setItem("cuotasCallValue", cuotasCall.value);
  });

  // Cargar los valores almacenados en el sessionStorage si existen
  ageInput.value = sessionStorage.getItem("ageInputValue");
  categoriaSelect.value = sessionStorage.getItem("categoriaSelectValue");
  let cuotasCallValue = sessionStorage.getItem("cuotasCallValue");
if (cuotasCallValue !== null) {
  cuotasCall.value = cuotasCallValue;
}


  const storedCheckboxState = sessionStorage.getItem("checkboxState");
  if (storedCheckboxState === "true") {
    compareCheckbox.checked = true;
    checkboxChecked = true;
  }
  // Agrega un controlador de eventos al botón de envío
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Evitar que la página se recargue
    

    calcularSeguro();
    const edad = obtenerEdad();
const categoria = obtenerCategoria();

if (edad === null) {
  Swal.fire({
    title: "Ingresa una edad valida",
    icon: "error"
  });
} else if (categoria === null) {
  Swal.fire({
    title: "Selecciona una categoria valida",
    icon: "error"
  });
} else {
  Swal.fire({
    title: "Exitos!",
    text: "Hemos cotizado un seguro a tu medida",
    icon: "success"
  });
  if (checkboxChecked) {
    const comparacion = mostrarComparacion(edad);
    resultContainer.innerHTML += `<br><br><p><strong>Comparación de seguros:</strong></p><br>${comparacion}`;
  }
}
  }); 


// Funcion para Obtener la edad
function obtenerEdad() {
  const edadInput = document.getElementById("age");
  const edad = parseInt(edadInput.value);

  if (isNaN(edad) || edad < 18 || edad > 110) {
    
    return null;
  }

  if (!edadInput.value.trim()) {
    
    return null;
  }

  return edad;
}

//Funcion para obtener la categoria del seguro
function obtenerCategoria() {
  const categorySelect = document.getElementById("categoria");
  const categoriaSeleccionada = categorySelect.value;

  if (categoriaSeleccionada) {
    return categoriaSeleccionada;
  } else {
    return null;
  }
}

// FUncion para calcular el precio base de cada categoria
function calcularPrecioBase(categoria) {
  return config.categoriasSeguro[categoria] || 0;
}

//Funcion para aplicar aumentos por edad
function aplicarAumento(edad, precioBase) {
  if (edad <= 25 && edad >= 18) {
    return Math.round(precioBase * config.aumentos.menores25); 
  } else if (edad >= 65) {
    return Math.round(precioBase * config.aumentos.mayores65);
  } else {
    return precioBase;
  }
}

// Función para calcular el precio final del seguro
function calcularPrecioFinal(categoria, edad) {
  const precioBase = config.categoriasSeguro[categoria] || 0;
  return aplicarAumento(edad, precioBase);
}



// Función para activar la comparación
function mostrarComparacion(edad) {
  const categorias = Object.keys(config.categoriasSeguro);
  const preciosComparados = categorias.map(categoria => ({
    categoria,
    precio: calcularPrecioFinal(categoria, edad)
  }));
  const comparacionString = preciosComparados.map(item => `Tarifa ${item.categoria}: U$D ${item.precio} anuales<br>`).join('\n');
  
  return comparacionString; // Devuelve la cadena de comparación
}
// Agrega un controlador de eventos al checkbox
compareCheckbox.addEventListener("click", function() {
  const edad = obtenerEdad();
  
  if(compareCheckbox.checked && edad !== null) {
    
    comparacion = mostrarComparacion(edad);
    
  }
});

// Función para obtener la cantidad de cuotas
function obtenerCuotas() {
  const cuotasCall = document.getElementById("cuotas");
  const cuotasSeleccionadas = cuotasCall.value;

  if (cuotasSeleccionadas) {
    return parseInt(cuotasSeleccionadas);
  } else {
    return null;
  }
}

// Función principal para calcular el seguro
function calcularSeguro() {
  const edad = obtenerEdad();
  if (edad === null) return;

  const categoria = obtenerCategoria();
  if (categoria === null) return;

  const cuotas = obtenerCuotas();
  if (cuotas === null) {
    return; 
  }

  const precioFinal = calcularPrecioFinal(categoria, edad);

  if (precioFinal > 0) {
    // Ocultar el formulario
    const formularioSeguro = document.getElementById("formularioSeguro");
    formularioSeguro.style.display = "none";

    // Mostrar los resultados en el contenedor resultContainer
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `<strong><p>El precio del seguro es:</strong></p><br> U$D ${precioFinal} anuales<br><br>`;
    const valorCuota = (precioFinal / cuotas).toFixed(2);
    resultContainer.innerHTML += `<p><strong>Valor de la cuota:</strong></p><br> U$D ${valorCuota} (cuotas:${cuotas})<br><br>`;
    

    // Obtener la cadena de comparación

    resultContainer.innerHTML += "<br><br><strong>Gracias por utilizar nuestro cotizador de seguros</strong><br><br>";

    // Agrega el botón "Volver Atrás"
resultContainer.innerHTML += "<button id='volverAtras'>Volver Atrás</button>";

// Agrega un controlador de eventos al botón "Volver Atrás"
resultContainer.addEventListener("click", function(event) {
  const target = event.target;
  if (target.id === "volverAtras") {
    const formularioSeguro = document.getElementById("formularioSeguro");
    // Restablecer los valores del formulario desde el sessionStorage
    const ageInput = formularioSeguro.querySelector("#age");
    const categoriaSelect = formularioSeguro.querySelector("#categoria");
    const cuotasCall = formularioSeguro.querySelector("#cuotas");

    ageInput.value = sessionStorage.getItem("ageInputValue") || "";
    categoriaSelect.value = sessionStorage.getItem("categoriaSelectValue") || "";
    cuotasCall.value = sessionStorage.getItem("cuotasCallValue") || "1";
    formularioSeguro.style.display = "flex";
    resultContainer.innerHTML = "";
  }else {
    event.preventDefault();
  }
});
// Función para borrar el sessionStorage
const borrarSessionStorage = () => {
  sessionStorage.clear();
  
  window.location.reload();
};

// Click para llamar a la función de borrar el sessionStorage
document.getElementById('borrarSessionStorage').addEventListener('click', (event) => {
  event.preventDefault(); // Evita que el enlace redireccione
  let timerInterval;
Swal.fire({
  title: "Estamos borrando tus datos!",
  html: "Cambios efectivos en <b></b> millissegundos.",
  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
    borrarSessionStorage();
  }
});
  
});
  }
}


});






