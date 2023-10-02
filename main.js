
// Función para calcular el precio del seguro
function calcularSeguro(edad, categoria) {
    let precioBase;
  
    // Determinar el precio base según la categoría
    switch (categoria) {
      case "Economica":
        precioBase = 100;
        break;
      case "Estandar":
        precioBase = 150;
        break;
      case "Premium":
        precioBase = 200;
        break;
      default:
        alert("Categoría de seguro no válida.");
        return 0;
    }
  
    // Aplicar un aumento si el usuario es menor de 25 años
    if (edad <= 25 && edad >= 18) {
      precioBase *= 1.2; // Incremento del 20%
    } else if (edad < 18) {
        alert("Debes ser mayor de edad para contratar un seguro");
        return 0;
    }
    
    return precioBase;
  }
  
  // Ciclo para solicitar datos y calcular el seguro
  while (true) {
    const edad = parseInt(prompt("Ingresa tu edad:"));
    const categoria = prompt("Ingresa la categoría de seguro (Economica, Estandar, Premium):");
  
    // Calcular el precio del seguro
    const precioSeguro = calcularSeguro(edad, categoria);


  
    if (precioSeguro > 0) {
        alert(`El precio del seguro es: $${precioSeguro} anuales`);
        alert(`Gracias por utilizar nuestro cotizador de seguros`);
      break; 
    }
  }
  

  
