document.addEventListener('DOMContentLoaded', () => {
  // Helper to set footer year and restaurant name from site data
  function loadSiteData() {
    fetch('site.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load site data');
        return response.json();
      })
      .then(data => {
        const yearEls = document.querySelectorAll('#year-menu');
        yearEls.forEach(el => {
          el.textContent = new Date().getFullYear();
        });
        const nameEls = document.querySelectorAll('#restaurant-name-footer-menu');
        nameEls.forEach(el => {
          el.textContent = data.restaurantName || el.textContent;
        });
      })
      .catch(err => {
        console.warn('Error loading site data', err);
      });
  }

  function renderMenu() {
    fetch('menu.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load menu');
        return response.json();
      })
      .then(data => {
        const items = data.items || [];
        const categories = {};
        // Group items by category
        items.forEach(item => {
          if (!categories[item.category]) categories[item.category] = [];
          categories[item.category].push(item);
        });
        const section = document.getElementById('menu-section');
        if (!section) return;

        // Clear existing content
        section.innerHTML = '';
        // For each category, create section
        Object.keys(categories).sort().forEach(category => {
          const catDiv = document.createElement('div');
          catDiv.className = 'category';
          const heading = document.createElement('h3');
          heading.textContent = category;
          catDiv.appendChild(heading);
          const itemsWrapper = document.createElement('div');
          itemsWrapper.className = 'menu-items';
          categories[category].forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-item';
            // image
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            card.appendChild(img);
            // content wrapper
            const content = document.createElement('div');
            content.className = 'item-content';
            const title = document.createElement('div');
            title.className = 'item-title';
            title.textContent = item.name;
            const ingredients = document.createElement('div');
            ingredients.className = 'item-ingredients';
            ingredients.textContent = item.ingredients;
            const price = document.createElement('div');
            price.className = 'item-price';
            const priceVal = parseFloat(item.price);
            // Format price with euro sign and 2 decimals
            price.textContent = '€' + (isNaN(priceVal) ? item.price : priceVal.toFixed(2));
            content.appendChild(title);
            content.appendChild(ingredients);
            content.appendChild(price);
            card.appendChild(content);
            itemsWrapper.appendChild(card);
          });
          catDiv.appendChild(itemsWrapper);
          section.appendChild(catDiv);
        });
      })
      .catch(err => {
        console.error('Error loading menu data', err);
      });
  }

  loadSiteData();
  renderMenu();
});
