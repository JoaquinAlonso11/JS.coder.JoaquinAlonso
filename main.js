//comentario de linea

/*comentario 
de
bloque
*/


/* let numeroUno = 3;
let numeroDos = 5;
let resultadoSuma = numeroUno + numeroDos;

console.log(resultadoSuma);
*/
/*
let nombre = "Juan";
let saludo = "Hola";

let saludoCompleto = saludo + " " + nombre;

console.log(saludoCompleto);


let nombre = prompt("ingrese su nombre");
alert("gracias"+ " " + nombre);

*/

// let numeroUno = parseInt(prompt("Ingresa el numero 1"));
// let numeroDos = parseInt(prompt("Ingresa el numero 2"));

// alert(numeroUno + numeroDos);


// let edad = parseInt(prompt("Ingresa aqui tu edad"));

// if (edad >= 10 && edad <= 50){
//     alert("Puedes utilizar nuestro producto");
// } else {
//     alert("Rango de edad no soportado");
// }


// let saludo = prompt("Que dices al llegar a algun lugar?");

// if (saludo.toLowerCase() === "hola") {
//     alert("Bienvenido, puedes pasar!");
// } else {
//     alert("Aprende modales primero");
// }

// let dinero = prompt("Cual es tu gasto diario en pesos?");

// if (dinero >= 1000) {
//     alert("Debes gastar menos")
// }else {
//     alert("Estas dentro del presupuesto")
// }

// let edad = parseInt(prompt("cuantos anos tenes?"));
// if (edad >= 18 && edad <= 149) {
//     alert("Bienvenido")

// }else {
//     alert("Edad no valida");
// }



// let cagadas = prompt("Cuantas veces defecas al dia(Escribe `ESC` para salir)");
// let numeroCagadas;

// while (cagadas !== "ESC" && cagadas !== null) {
//     numeroCagadas = parseInt(cagadas);
//     switch (numeroCagadas) {
//         case 1:
//         alert("Intenta ir mas");
//         break;

//         case 2:
//             alert("Esta muy bien");
//             break;
        
//         case 3:
//             alert("Esta muy bien");
//             break;

//         case 4:
//             alert("un poco mucho");
//             break;
        
//         case 5:
//             alert("Estas en el limite, controlate");
//             break;

//         default:
//             alert("Sos humano?");
//             break;
//     }
//     cagadas = prompt("Cuantas veces defecas al dia(Escribe `ESC` para salir)");
// }


// let marca = prompt("Ingrese la marca del vehiculo");
// let modelo = prompt("Ingrese el modelo del vehiculo");
// let cilindrada = prompt("Ingrese la cilindrada del vehiculo");
// let precio = prompt("Ingrese el precio del vehiculo");

// const automovil = {
//     marca,
//     modelo,
//     cilindrada,
//     precio,
// };

// alert(`Marca: ${automovil.marca} Modelo: ${automovil.modelo} Cilindrada: ${automovil.cilindrada} Precio: ${automovil.precio}`);





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
    if (edad <= 25 >= 18) {
      precioBase *= 1.2; // Incremento del 20%
    } else if (edad < 18) {
        alert("Debes ser mayor para contratar un seguro");
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
      break; // Salir del ciclo si se obtiene un resultado válido
    }
  }
  

  
