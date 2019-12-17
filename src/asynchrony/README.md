# Asincronía en JS

Para comprender cuán asíncrono es JavaScript, debemos comenzar comprendiendo cuán síncrono es.

La mayoría de las personas cuando aprenden a programar aprenden de una manera síncrona, todos los procesos se ejectutan en el orden en el que están escritos. Un ejemplo de esto en JS sería el siguiente. 

```js
const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  alert('You clicked me!');

  const pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

<iframe
     src="https://codesandbox.io/embed/sync-bw3fi?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="sync"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>