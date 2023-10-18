const categoriasSeguro = {
  economica: 100,
  estandar: 150,
  premium: 200,
};

const aumentos = {
  menores25: 1.2,
  mayores65: 1.15,
};

// Funcion para Obtener la edad
function obtenerEdad() {
  let edad;
  while (true) {
    edad = prompt("Ingresa tu edad:");
    if (edad === null) {
      alert("Operación cancelada por el usuario.");
      return null;
    } else if(edad < 18) {
      alert("Debes ser mayor de 18 años para utilizar nuestros servicios");
    return null;
    }
    if (!isNaN(edad)) { 
      return edad;
    } else {
      alert("Debes ingresar un valor numérico.");
    }
  }
}
//Funcion para obtener la categoria del seguro
function obtenerCategoria() {
  let categoria;
  while (true) {
    categoria = prompt("Ingresa la categoría de seguro (Economica, Estandar, Premium):");
    if (categoria === null) {
      alert("Operación cancelada por el usuario.");
      return null;
    }
    const categoriaEnMinusculas = categoria.toLowerCase();
    const categoriaValida = categoriasSeguro[categoriaEnMinusculas];
    
    return categoriaValida !== undefined ? categoriaEnMinusculas : (alert("Categoría de seguro no válida."), null);
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

// Función para mostrar la comparación de seguros
function mostrarComparacion(edad) {
  const categorias = Object.keys(categoriasSeguro);
  const preciosComparados = categorias.map(categoria => ({
    categoria,
    precio: calcularPrecioFinal(categoria, edad)
  }));
  const comparacionString = preciosComparados.map(item => `Tarifa ${item.categoria}: U$D ${item.precio} anuales`).join('\n');
  alert(`Comparación de seguros para personas de ${edad} años:\n\n${comparacionString}`);
}
// Función para obtener la cantidad de cuotas
function obtenerCuotas() {
  let cuotas;
  while (true) {
    cuotas = prompt("Selecciona la cantidad de cuotas (entre 3 y 12):");
    if (cuotas === null) {
      alert("Operación cancelada por el usuario.");
      return null;
    }
    cuotas = parseInt(cuotas);
    if (cuotas >= 3 && cuotas <= 12) {
      return cuotas;
    } else {
      alert("Debes seleccionar entre 3 y 12 cuotas.");
    }
  }
}

// Función principal para calcular el seguro
function calcularSeguro() {
  const edad = obtenerEdad();
  if (edad === null) return;

  const categoria = obtenerCategoria();
  if (categoria === null) return;

  const precioFinal = calcularPrecioFinal(categoria, edad);

  if (precioFinal > 0) {
    alert(`El precio del seguro es: U$D ${precioFinal} anuales`);

    const financiar = confirm("¿Deseas financiar el seguro?");
    if (financiar) {
      const cuotas = obtenerCuotas();
      if (cuotas === null) return;

      const valorCuota = (precioFinal / cuotas).toFixed(2);
      alert(`Valor de la cuota: U$D ${valorCuota} (en ${cuotas} cuotas)`);
    }
    const comparar = confirm("¿Deseas comparar con otros seguros?");
    if (comparar) {
      mostrarComparacion(edad);
    }
    alert("Gracias por utilizar nuestro cotizador de seguros");
  }
}




calcularSeguro();


