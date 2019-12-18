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

Podemos ver como hasta que no terminamos el proceso del `alert`, no comienza el renderizado del párrafo. Esto es porque JavaScript está basado en una cosa llamada **Event loop** que es el responsable de ejecutar los procesos. La particularidad del **Event loop** es que tiene un sólo hilo, por lo que si un proceso tarda mucho tiempo en concluir, acaba bloqueando la pila de procesos pendientes. 

Justo eso es lo que pasa en el trozo de código que tenemos más arriba. Básicamente todo proceso que necesite una interacción del usuario para terminarse.

Sin embargo, si tenemos procesos que no requieren de muchos recursos el **Event Loop** no se bloquea y funciona como se espera:

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

console.warn('Hemos terminado de procesar las apis.');
```

Aquí el orden de los logs es el siguiente:
```
A punto de pedir las APIS
Hemos terminado de procesar las apis.
Hemos recibido información de 1611 apis
```

`getApis` es un función que acepta otra función como parámetro, lo que conocemos normalmente como callback. Aquí podemos ver cómo funciona:

```ts
type Callback = (err: Error | null, data?: any) => void;

function getApis(cb: Callback): void {
	fs.readFile(
    path.resolve('src/apis.txt'), 
    {encoding: 'utf8'}, 
    (err, data) => {
      if (err) {
        return cb(err);
      }

      cb(null, JSON.parse(data));
    }
  );
}
```

`getApis` abre un archivo de texto de forma asíncrona y si no hay ningún error, convierte el contenido del archivo a un JSON. 
Este proceso funciona de manera diferente al anterior. La diferencia es que nosotros ejecutamos el código justo después del primer log, pero no significa que lo estemos ejecutando. Lo que realmente estamos haciendo es decirle a `getApis` que cuando haya hecho sus cosas y tenga la información que necesito, que se la pase al callback que le pasé por parámetro en forma de función anónima. En ese momento será cuando se procesará el callback y ejecutará nuestros logs y demás. 

> Esta forma de gestionar callbacks en el que siempre pasamos como primer parámetro el error, es un patrón llamado patrón Error-First. En caso de que no haya error pasamos un `null` como primer parámetro y el resto de parámetros que sean necesarios. 

Es como cuando te haces un tostada en la típica tostadora de palanca, preparas la tostada y bajas la palanca. Mientras tanto puedes revisar  Twitter, preparar café, lo que tú quieras. Una vez la tostada está hecha la palanca hace saltar la tostada haciéndote saber que la tostada está lista para hacer lo que necesites. Este momento sería cuando nosotros aplicaríamos el callback porque el proceso por el que estábamos esperando ha terminado: hacer una tostada. Por otro lado, también vemos como mientras la tostada se hace otras cosas pasan como el café calentándose, los tweets cargándose en tu movil. En JavaScript y el **Event loop** pasa lo mismo

![](https://media.giphy.com/media/l3q2Ty3RWark8VgIw/giphy.gif)