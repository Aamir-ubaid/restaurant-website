document.addEventListener('DOMContentLoaded', () => {
  // Fetch site data from JSON and populate home page
  fetch('site.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load site data');
      }
      return response.json();
    })
    .then(data => {
      const nameEl = document.getElementById('restaurant-name');
      const locationEl = document.getElementById('restaurant-location');
      const emailEl = document.getElementById('contact-email');
      const phoneEl = document.getElementById('contact-phone');
      const bookingEl = document.getElementById('booking-info');
      const aboutEl = document.getElementById('about-content');
      const footerNameEl = document.getElementById('restaurant-name-footer');

      if (nameEl) nameEl.textContent = data.restaurantName || nameEl.textContent;
      if (locationEl) locationEl.textContent = data.location || locationEl.textContent;
      if (emailEl) emailEl.textContent = data.contactEmail || emailEl.textContent;
      if (phoneEl) phoneEl.textContent = data.contactPhone || phoneEl.textContent;
      if (bookingEl) bookingEl.textContent = data.bookingInfo || bookingEl.textContent;
      if (footerNameEl) footerNameEl.textContent = data.restaurantName || footerNameEl.textContent;
      if (aboutEl) {
        // Convert line breaks to paragraphs for better formatting
        const aboutHtml = (data.about || '').replace(/\n/g, '<br>');
        aboutEl.innerHTML = aboutHtml;
      }
    })
    .catch(err => {
      console.warn('Error loading site data', err);
    });

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
