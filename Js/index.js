
function getDate() {
  const today = new Date();
  const date = today.toLocaleDateString('es-AR');
  const time = today.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return date + '-' + time;
}

function retornarCard() {

  const card = document.getElementById('card');
  card.innerHTML = `
  <div class="div-card">
    <div class="foto">
      <img src="././images/book.png" alt="Foto">
            <p id="datetime">${getDate()}</p>
    </div>
    <div class="details">
      <h3 id="title">¿Qué leíste hoy?</h3>
      <p id="review">Cuéntanos de tu libro</p>
    </div>
    <button id="publish">Crear publicación</button>
    <button id="cancel">Cancelar</button>
  </div>
`
}

function goCamara(){
  const camara = document.getElementById('publish');
  camara.addEventListener('click', () => {
    window.location.href = 'camara.html';
  })
}

retornarCard();
goCamara(); 




