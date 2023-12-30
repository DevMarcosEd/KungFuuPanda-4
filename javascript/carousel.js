// Variáveis globais
let isDragging = false; // Indica se o usuário está arrastando o carrossel
let startPosition; // A posição inicial do mouse durante o arrasto
let translateValue = 0; // Valor de translação para mover o carrossel
let currentIndex = 0; // Índice do slide atual


// Função para exibir um slide específico
function showSlide(index) {
  // Obtém o elemento do carrossel e todos os slides
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.slide');
  const slideWidth = slides[0].offsetWidth; // Largura de um slide

  // Garante que o índice esteja dentro dos limites dos slides
  const newIndex = (index + slides.length) % slides.length;

  // Calcula o valor de translação com base no índice
  translateValue = -newIndex * slideWidth;

  // Adiciona uma transição suave ao movimento do carrossel
  carousel.style.transition = 'transform 0.3s ease-in-out';
  carousel.style.transform = `translateX(${translateValue}px)`;

  // Atualiza o índice atual
  currentIndex = newIndex;
}

// Função chamada quando o usuário inicia o arrasto
function handleDragStart(e) {
  isDragging = true;
  startPosition = e.clientX;
  
console.log(startPosition)

  // Remove a transição durante o arrasto para evitar rigidez
  document.querySelector('.carousel').style.transition = 'none';
}

// Função chamada durante o arrasto do mouse
function handleDragMove(e) {
  if (!isDragging) return;

  const distance = e.clientX - startPosition;
  translateValue += distance;

  // Atualiza a posição do carrossel durante o arrasto
  document.querySelector('.carousel').style.transform = `translateX(${translateValue}px)`;

  startPosition = e.clientX;
}

function handleDragEnd() {
    isDragging = false;
  
    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].offsetWidth;
  
    // Calcula o novo índice com base na posição final de translação
    let newIndex = Math.round(-translateValue / slideWidth);
  
    // Adiciona a transição de volta após o arrasto
    document.querySelector('.carousel').style.transition = 'transform 0.3s ease-in-out';
  
    // Se o novo índice for maior ou igual ao número de slides, ajusta para o primeiro slide
    if (newIndex >= slides.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      // Se o novo índice for negativo, ajusta para o último slide
      newIndex = slides.length - 1;
    }
  
    // Exibe o slide correspondente ao novo índice
    showSlide(newIndex);
  }
  
// Adiciona event listeners para os eventos de arrasto
document.querySelector('.carousel').addEventListener('mousedown', handleDragStart);
document.addEventListener('mousemove', handleDragMove);
document.addEventListener('mouseup', handleDragEnd);

// Função para navegar para o próximo slide
function nextSlide() {
  currentIndex -= 1;
  showSlide(currentIndex);
}

// Função para navegar para o slide anterior
function prevSlide() {
  currentIndex += 1;
  showSlide(currentIndex);
}

// Adiciona listeners para os botões de navegação
document.querySelector('.prev-button').addEventListener('click', prevSlide);
document.querySelector('.next-button').addEventListener('click', nextSlide);

// Exibe o primeiro slide ao carregar a página
showSlide(0);
