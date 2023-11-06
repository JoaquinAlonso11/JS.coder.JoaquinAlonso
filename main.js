const resultContainer = document.getElementById("resultContainer");

const categoriasSeguro = {
  economica: 100,
  estandar: 150,
  premium: 200,
};

const aumentos = {
  menores25: 1.2,
  mayores65: 1.15,
};
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

  cuotasCall.addEventListener("input", function() {
    sessionStorage.setItem("cuotasCallValue", cuotasCall.value);
  });

  // Cargar los valores almacenados en el sessionStorage si existen
  ageInput.value = sessionStorage.getItem("ageInputValue");
  categoriaSelect.value = sessionStorage.getItem("categoriaSelectValue");
  cuotasCall.value = sessionStorage.getItem("cuotasCallValue");


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
    if (checkboxChecked) {
      const edad = obtenerEdad();
      if (edad !== null) {
        
        const comparacion = mostrarComparacion(edad);
        resultContainer.innerHTML += `<br><br><p><strong>Comparación de seguros:</strong></p><br>${comparacion}`;
      }
    }
  }); 


// Funcion para Obtener la edad
function obtenerEdad() {
  let edadInput = document.getElementById("age");
  while (true) {
    const edad = edadInput.value;
    if (edad === null) {
      return null;
    } else if(edad < 18) {
      return null;
    }
    if (!isNaN(edad)) { 
      return edad;
    }
  }
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
  return categoriasSeguro[categoria] || 0;
}

//Funcion para aplicar aumentos por edad
function aplicarAumento(edad, precioBase) {
  if (edad <= 25 && edad >= 18) {
    return Math.round(precioBase * aumentos.menores25); 
  } else if (edad >= 65) {
    return Math.round(precioBase * aumentos.mayores65);
  } else {
    return precioBase;
  }
}

// Función para calcular el precio final del seguro
function calcularPrecioFinal(categoria, edad) {
  const precioBase = categoriasSeguro[categoria] || 0;
  return aplicarAumento(edad, precioBase);
}



// Función para activar la comparación
function mostrarComparacion(edad) {
  const categorias = Object.keys(categoriasSeguro);
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
  if (cuotas === null) return;

  const precioFinal = calcularPrecioFinal(categoria, edad);

  if (precioFinal > 0) {
    // Ocultar el formulario
    const formularioSeguro = document.getElementById("formularioSeguro");
    formularioSeguro.style.display = "none";

    // Mostrar los resultados en el contenedor resultContainer
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `<strong><p>El precio del seguro es:</strong></p><br> U$D ${precioFinal} anuales<br><br>`;
    const valorCuota = (precioFinal / cuotas).toFixed(2);
    resultContainer.innerHTML += `<p><strong>Valor de la cuota:</strong></p><br> U$D ${valorCuota} (en ${cuotas} cuotas)<br><br>`;
    

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
    cuotasCall.value = sessionStorage.getItem("cuotasCallValue") || "";
    formularioSeguro.style.display = "flex";
    resultContainer.innerHTML = "";
  }else {
    event.preventDefault();
  }
  // Limpia los resultados en el contenedor resultContainer
  

  // Muestra nuevamente el formulario
  
});
  }
}

});





