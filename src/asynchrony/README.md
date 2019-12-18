# Asincronía en JS

Para comprender cuán asíncrono es JavaScript, debemos comenzar comprendiendo cuán síncrono es.

La mayoría de las personas cuando aprenden a programar aprenden de una manera síncrona, todos los procesos se ejectutan en el orden en el que están escritos. Un ejemplo de esto en JS sería el siguiente. 

```js
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  alert('You clicked me!');

  const pElem = document.createElement('p');
  pElem.textContent = "Tuve que esperar por el maldito Alert";
  document.body.appendChild(pElem);
});
```

![](./sync.gif)

Podemos ver como hasta que no terminamos el proceso del `alert`, no comienza el renderizado del párrafo. Esto es porque JavaScript está basado en una cosa llamada *Event loop* que es el responsable de ejecutar los procesos. La particularidad del *Event loop* es que tiene un sólo hilo, por lo que si un proceso tarda mucho tiempo en concluir, acaba bloqueando la pila de procesos pendientes. 

Justo eso es lo que pasa en el trozo de código que tenemos más arriba. Básicamente todo proceso que necesite una interacción del usuario para terminarse.

Sin embargo, si tenemos procesos que no requieren de muchos recursos el *Event Loop* no se bloquea y funciona como se espera:

```ts
function second(): void {
	console.log('Hola desde la segunda función');
}

function first(): void {
	console.log('Comenzamos!');
	second();
	console.log('El dulce final');
}

first();
```

Este snipped devuelve:
```
Comenzamos!
Hola desde la segunda función
El dulce final
```

Por otro lado, tendríamos operaciones asíncronas como la siguiente:

```ts
console.log('A punto de pedir las APIS');

getApis((err: Error | null, data?: object) => {
  if (err) {
    console.error('Algo fue mal:', err.toString());
    throw err;
  }

  if (typeof data === 'object') {
    console.log(
      'Hemos recibido información de',
      Object.values(data).length,
      'apis'
    );

    return;
  }

  console.log('Algo que no contemplamos ha pasado');
});

console.log('Hemos terminado de procesar las apis.');
```

Aquí el orden de los logs es el siguiente:
```
A punto de pedir las APIS
Hemos terminado de procesar las apis.
Hemos recibido información de 1611 apis
```

`getApis` es un función que acepta otra función como parámetro, lo que conocemos normalmente como callback.