import './style.css'
import logoBatoi from './assets/logoBatoi.png'
import * as functions from './functions.js'

document.querySelector('#app').innerHTML = `
<div>
  <img src="${logoBatoi}" />
  <h1>BatoiBooks</h1>
  <p>Abre la consola para ver el resultado</p>
</div>
`