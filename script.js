// === IntersectionObserver для плавного появлення секцій ===
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));


// === Read More Button - редірект на article.html ===
const readMoreButtons = document.querySelectorAll('.read-more');
readMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'article.html';
  });
});


// === Fun Facts Button - редірект на facts.html ===
const funBtn = document.getElementById('fun-btn');
if(funBtn) {
  funBtn.addEventListener('click', () => {
    window.location.href = 'facts.html';
  });
}


// === News Carousel ===
const slideContainer = document.querySelector('.news-slide');
const slides = document.querySelectorAll('.news-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const totalSlides = slides.length;

function showSlide(i) {
    const slideWidth = slides[0].clientWidth;
    slideContainer.style.transform = `translateX(${-i * slideWidth}px)`;
}

if(prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
      index = (index - 1 + totalSlides) % totalSlides;
      showSlide(index);
  });

  nextBtn.addEventListener('click', () => {
      index = (index + 1) % totalSlides;
      showSlide(index);
  });

  // Автоперелистування кожні 5 секунд
  setInterval(() => {
      index = (index + 1) % totalSlides;
      showSlide(index);
  }, 5000);

  // Показати початковий слайд
  showSlide(index);
}


// === View Full Calendar Button ===
const calendarBtn = document.getElementById('view-calendar-btn');
if(calendarBtn) {
  calendarBtn.addEventListener('click', () => {
    window.location.href = 'calendar.html';
  });
}


// ===== Upcoming Events Cards =====
const upcomingContainer = document.querySelector('#upcoming-events .events-container');

const pollButtons = document.querySelectorAll('.poll-btn');
const pollResult = document.getElementById('poll-result');

let pollData = JSON.parse(localStorage.getItem('pollData')) || { Tea: 0, Coffee: 0 };

function updatePoll() {
  localStorage.setItem('pollData', JSON.stringify(pollData));

  pollResult.innerHTML = '';
  const totalVotes = Object.values(pollData).reduce((a,b) => a+b, 0) || 1;

  for (let choice in pollData) {
    const bar = document.createElement('div');
    bar.className = 'poll-bar';
    const percent = Math.round((pollData[choice]/totalVotes)*100);
    bar.style.width = `${percent}%`;
    bar.textContent = `${choice}: ${percent}%`;
    pollResult.appendChild(bar);
  }
}

pollButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const choice = btn.dataset.choice;
    pollData[choice]++;
    updatePoll();
  });
});

// Початкове відображення
updatePoll();
