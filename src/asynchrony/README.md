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

<button>
    Haz click
</button>

<script>  
    const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
</script>  