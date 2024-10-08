const reviewPlaceholder = "Ingresa una reseña de tu libro:";
const defaultImageSrc = "././images/camera.png";
const apiUrl = 'https://6703cf14ab8a8f892731bb24.mockapi.io/Images';

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
        <input type="file" id="inputFile" multiple accept=".png, .jpg, .gif, .bmp" capture='user'> 
      </div>
      <div class="details">
        <h3 id="title">¿Qué leíste hoy?</h3>
        <p id="review">${userReviewText}</p>
        <textarea id="userReview" placeholder="Escribe tu reseña aquí..."></textarea>
      </div>
      <button id="publish">Publicar</button>
      <button id="cancel">Cancelar</button>
    </div>
  `;
}

function crearCard(imageSrc, userReviewText) {
  const card = document.getElementById('card');
  card.innerHTML = retornarCardHTML(imageSrc, userReviewText);

  const inputCamera = document.getElementById('inputFile');
  const mainImage = document.getElementById('mainImage');
  const userReview = document.getElementById('userReview');
  const review = document.getElementById('review');
  const publishButton = document.getElementById('publish');
  const cancelButton = document.getElementById('cancel');

  inputCamera.addEventListener('change', () => {
    const files = inputCamera.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        mainImage.src = event.target.result;
      };
      reader.readAsDataURL(files[0]);
    }
  });

  mainImage.addEventListener('dblclick', () => {
    inputCamera.click();
  });

  publishButton.addEventListener('click', () => {
    if (navigator.onLine) {
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.src = mainImage.src;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const base64Image = canvas.toDataURL('image/webp');

        const postData = {
          title: 'Hoy leí:',
          review: userReview.value,
          image: base64Image,
          datetime: `${getDate()}`
        };

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
          .then(response => response.json())
          .then(data => {
            if (data) {
              alert('¡Gracias por tu publicación querido lector! Serás redirigido al sitio. ');
              window.location.href = 'index.html';
            } else {
              alert('Error al publicar :(');
            }
          })
          .catch(error => {
            console.error(error);
          });
      };
    } else {
      publishButton.disabled = true;
      return alert('Comprueba tu conexión a internet y vuelve a intentarlo.');
    }
  });

  cancelButton.addEventListener('click', () => {
    crearCard(defaultImageSrc, reviewPlaceholder);
  });

  userReview.addEventListener('input', () => {
    review.innerText = userReview.value;
  });
}

crearCard(defaultImageSrc, reviewPlaceholder);