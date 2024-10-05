const title = "¿Qué leíste hoy?";
const reviewPlaceholder = "Ingresa una reseña de tu libro";

function getDate(){
const today = new Date();
const date = today.toLocaleDateString('es-AR');
const time = today.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

return date + '-' + time;
}

function retornarCard(){
const card = document.getElementById('card');
card.innerHTML = `
  <div class="div-card">
    <div class="foto">
      <img src="././images/book.png" alt="Foto" id="mainImage">
      <p id="datetime">${getDate()}</p>
      <label for="inputFile" id='subirFoto'><img src="./images/camera.png" alt="Subir Foto"></label>
      <input type="file" id="inputFile" multiple accept="image/*">
    </div>
    <div class="details">
      <h3 id="title">${title}</h3>
      <p id="review">${reviewPlaceholder}</p>
      <textarea id="userReview" rows="4" cols="30" placeholder="Escribe tu reseña aquí..."></textarea>
    </div>
    <button id="publish">Publicar</button>
    <button id="cancel">Cancelar</button>
  </div>
`;
}
retornarCard();

const inputFiles = document.getElementById('inputFile');
const mainImage = document.getElementById('mainImage');
const userReview = document.getElementById('userReview');
const review = document.getElementById('review');
const publishButton = document.getElementById('publish');

inputFiles.addEventListener('change', () => {
  const files = inputFiles.files;
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = (event) => {
      mainImage.src = event.target.result;
    };
    reader.readAsDataURL(files[0]);
  }
});

publishButton.addEventListener('click', () => {
  review.innerText = userReview.value;
});

userReview.addEventListener('input', () => {
  review.innerText = userReview.value;
});
