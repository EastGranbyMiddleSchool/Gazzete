document.addEventListener('DOMContentLoaded', () => {

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

  // === Read More Button ===
  const readMoreButtons = document.querySelectorAll('.read-more');
  readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'article.html';
    });
  });

  // === Fun Facts Button ===
  const funBtn = document.getElementById('fun-btn');
  if(funBtn) {
    funBtn.addEventListener('click', () => {
      window.location.href = 'facts.html';
    });
  }

  // === View Full Calendar Button ===
  const calendarBtn = document.getElementById('view-calendar-btn');
  if(calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      window.location.href = 'calendar.html';
    });
  }

  // === Poll ===
  const pollButtons = document.querySelectorAll('.poll-btn');
  const pollResult = document.getElementById('poll-result');

  if(pollResult) {
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

    updatePoll();
  }

  // === Join Team / Submit Your Idea Modal ===
  const openBtn = document.getElementById('open-join-btn');
  const modal = document.getElementById('join-modal');
  const closeBtn = modal.querySelector('.close');
  const form = document.getElementById('join-form');
  const message = document.getElementById('form-message');

  openBtn.addEventListener('click', () => modal.style.display = 'block');
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = 'https://script.google.com/macros/s/AKfycbzx5Rie5AI_MSVkE37BNbL_5yGhXQb1ftOdMr_S7cOJqH-FP_LXXJ9tvARNpG2lRQD-5Q/exec';

    const formData = new FormData(form);
    const data = new URLSearchParams();
    formData.forEach((value, key) => data.append(key, value));

    try {
      const response = await fetch(url, { method: 'POST', body: data });
      const result = await response.json();
      message.textContent = result.result === 'success'
        ? 'Thank you! Your idea has been submitted 🎉'
        : 'Error submitting form. Please try again.';
      if (result.result === 'success') form.reset();
    } catch (error) {
      message.textContent = 'Error submitting form. Please try again.';
      console.error(error);
    }
  });

  // === News Carousel Autoscroll (по одній картці, центрована) ===
  const slideContainer = document.querySelector('.news-slide');
  const slides = document.querySelectorAll('.news-card');
  if(slideContainer && slides.length > 0) {
    let index = 0;

    function showSlide(i) {
      const slideWidth = slides[0].clientWidth;
      slideContainer.style.transform = `translateX(${-i * slideWidth}px)`;
    }

    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 3500); // кожні 3.5 сек

    // Початкове відображення
    showSlide(index);
  }

});
