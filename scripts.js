function toggleMenu() {
  const menu = document.getElementById("menu");
  const isOpen = menu.classList.contains("show");

  if (isOpen) {
    menu.classList.remove("show");

    // Optional: wait for animation before hiding
    setTimeout(() => {
      menu.style.visibility = "hidden";
      menu.style.pointerEvents = "none";
    }, 300); // Match your CSS transition time
  } else {
    menu.classList.add("show");
    menu.style.visibility = "visible";
    menu.style.pointerEvents = "auto";
  }
}


  function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(btn => {
      if (btn.textContent.toLowerCase().includes(tabId)) {
        btn.classList.add('active');
      }
    });

    if (window.innerWidth <= 768) {
  document.getElementById("menu").classList.remove("show");
  // Smooth scroll to the header area
  const header = document.querySelector("header");
  if (header) {
    header.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

  }

  // Contact form handler
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-button');

  form?.addEventListener('submit', async function (event) {
    event.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "✅ Thank you! Your message has been sent. We’ll be in touch with you shortly.";
        status.style.color = "#324c5f";
        form.reset();
      } else {
        status.textContent = "❌ Oops! There was a problem. Please try again.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "❌ Error connecting to server.";
      status.style.color = "red";
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send";
  });

  // Slideshow
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    console.log("Total slides found:", slides.length);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 3000);


  document.addEventListener("click", function (event) {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");

  // If menu is open and click is outside both menu and hamburger, close it
  if (
    menu.classList.contains("show") &&
    !menu.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    menu.classList.remove("show");

    // Optional: if you’re using visibility/pointer-events
    setTimeout(() => {
      menu.style.visibility = "hidden";
      menu.style.pointerEvents = "none";
    }, 400);
  }
});


document.querySelector('#contact-menu a[href="#contact"]').addEventListener('click', function (e) {
  e.preventDefault();

  showTab('contact'); // <-- Important: activates the tab

  // Scroll to the section after tab activation
  setTimeout(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
});


  const toggleBtn = document.getElementById('contact-toggle');
  const menu = document.getElementById('contact-menu');
  const widget = document.getElementById('contact-widget');
  const icon = toggleBtn.querySelector('.icon')

  // Toggle menu on button click
 toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent outside click handler from closing immediately

  const isVisible = menu.style.display === 'block';

  menu.style.display = isVisible ? 'none' : 'block';
  icon.textContent = isVisible ? '💬' : '✖'; // Toggle icon
});

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!widget.contains(e.target)) {
      menu.style.display = 'none';
      icon.textContent = '💬'; // Reset icon when menu is closed
    }
  });

  // Close menu on focus change (e.g., tabbing away)
  document.addEventListener('focusin', (e) => {
    if (!widget.contains(e.target)) {
      menu.style.display = 'none';
      icon.textContent = '💬';
    }
  });

  // Close menu when any menu item is clicked
  document.querySelectorAll('#contact-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.style.display = 'none';
      icon.textContent = '💬';
    });
  });
