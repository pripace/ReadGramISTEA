const reviewPlaceholder = "Ingresa una reseña de tu libro";
const defaultImageSrc = "././images/book.png";

function getDate() {
  const today = new Date();
  const date = today.toLocaleDateString('es-AR');
  const time = today.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  return `${date} - ${time}`;
}

function retornarCardHTML(imageSrc, userReviewText) {
  return `
    <div class="div-card">
      <div class="foto">
        <img src="${imageSrc}" alt="Foto" id="mainImage">
        <p id="datetime">${getDate()}</p>
        <label for="inputFile" id='subirFoto'><img src="./images/camera.png" alt="Subir Foto"></label>
        <input type="file" id="inputFile" multiple accept="image/*">
      </div>
      <div class="details">
        <h3 id="title">¿Qué leíste hoy?</h3>
        <p id="review">${userReviewText}</p>
        <textarea id="userReview" rows="4" cols="30" placeholder="Escribe tu reseña aquí..."></textarea>
      </div>
      <button id="publish">Publicar</button>
      <button id="cancel">Cancelar</button>
    </div>
  `;
}

function crearCard(imageSrc, userReviewText) {
  const card = document.getElementById('card');
  card.innerHTML = retornarCardHTML(imageSrc, userReviewText);

  const inputFiles = document.getElementById('inputFile');
  const mainImage = document.getElementById('mainImage');
  const userReview = document.getElementById('userReview');
  const review = document.getElementById('review');
  const publishButton = document.getElementById('publish');
  const cancelButton = document.getElementById('cancel');

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
    crearCard(mainImage.src, userReview.value);
  });

  cancelButton.addEventListener('click', () => {
    crearCard(defaultImageSrc, reviewPlaceholder);
  });

  userReview.addEventListener('input', () => {
    review.innerText = userReview.value;
  });
}

crearCard(defaultImageSrc, reviewPlaceholder);

