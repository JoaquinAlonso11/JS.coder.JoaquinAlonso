const catEconomica = 100;
const catEstandar = 150;
const catPremium = 200;

const aumentoMenores25 = 1.2;

function obtenerEdad() {
  let edad;
  while (true) {
    edad = prompt("Ingresa tu edad:");
    if (edad === null) {
      alert("Operación cancelada por el usuario.");
      return null;
    }
    if (!isNaN(edad)) { // Verificar si es un valor numérico
      return edad;
    } else {
      alert("Debes ingresar un valor numérico.");
    }
  }
}

function obtenerCategoria() {
  const categoria = prompt("Ingresa la categoría de seguro (Economica, Estandar, Premium):");
  if (categoria === null) {
    alert("Operación cancelada por el usuario.");
    return null;
  }
  const categoriaEnMinusculas = categoria.toLowerCase();
  if (categoriaEnMinusculas === "economica" || categoriaEnMinusculas === "estandar" || categoriaEnMinusculas === "premium") {
    return categoriaEnMinusculas;
  } else {
    alert("Categoría de seguro no válida.");
    return null;
  }
  
}

function calcularPrecioBase(categoria) {
  switch (categoria) {
    case "economica":
      return catEconomica;
    case "estandar":
      return catEstandar;
    case "premium":
      return catPremium;
    default:
      return 0;
  }
}

function aplicarAumentoMenores25(edad, precioBase) {
  if (edad <= 25 && edad >= 18) {
    return precioBase * aumentoMenores25; 
  } else {
    return precioBase;
  }
}

function calcularSeguro() {
  const edad = obtenerEdad();
  if (edad === null) return;

  const categoria = obtenerCategoria();
  if (categoria === null) return;

  const precioBase = calcularPrecioBase(categoria);

  if (precioBase === 0) {
    alert("Categoría de seguro no válida.");
    return;
  }

  const precioFinal = aplicarAumentoMenores25(parseInt(edad), precioBase);

  if (precioFinal > 0) {
    alert(`El precio del seguro es: $${precioFinal} anuales`);
    alert(`Gracias por utilizar nuestro cotizador de seguros`);
  }
}

calcularSeguro();
