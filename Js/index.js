const apiUrl = 'https://6703cf14ab8a8f892731bb24.mockapi.io/Images';
const imageSrc = '././images/book.png';
const reviewText = 'Crea una nueva publicación';

function getDate() {
  const today = new Date();
  const date = today.toLocaleDateString('es-AR');
  const time = today.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

  return date + ' - ' + time;
}

function retornarCard() {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = `
    <div class="div-card">
      <div class="foto">
        <img src="${imageSrc}" alt="Foto">
        <p id="datetime">${getDate()}</p>
      </div>
      <div class="details">
        <h3 id="title">¿Qué leíste hoy?</h3>
        <p id="review">${reviewText}</p>
      </div>
      <button class="publish-btn"><img src="./images/camera.png" alt="Subir Foto"></button>
    </div>
  `;
  goCamara();
}

function goCamara() {
  const publishButtons = document.querySelectorAll('.publish-btn');
  publishButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (navigator.onLine) {
        window.location.href = 'camara.html';
      } else {
        button.disabled = true;
      }
    });
  });
}

function loadPosts() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(posts => {
      posts.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

      const cardContainer = document.getElementById('cardContainer');
      cardContainer.innerHTML = '';

      if (posts.length === 0) {
        retornarCard();
      } else {
        posts.forEach(post => {
          const cardHTML = `
            <div class="div-card">
              <div class="foto">
                <img src="${post.image}" alt="Foto">
                <p id="datetime">${post.datetime}</p>
              </div>
              <div class="details">
                <h3 id="title">${post.title}</h3>
                <p id="review">${post.review}</p>
                <button class="publish-btn"><img src="./images/camera.png" alt="Subir Foto"></button>
              </div>
            </div>
          `;
          cardContainer.innerHTML += cardHTML;
        });
      }
      goCamara();
    })
    .catch(error => {
      console.error('Error al cargar los posts:', error);
      retornarCard();
    });
}


retornarCard();
loadPosts();



