/* ============================================
   VelocityVault Product Management
   Category filtering for 25+ BMX bikes
   ============================================ */

// Category filtering for products page
document.addEventListener('DOMContentLoaded', () => {
    // Get all filter checkboxes
    const categoryFilters = document.querySelectorAll('.category-filter');
    const productItems = document.querySelectorAll('.product-item');

    if (categoryFilters.length === 0 || productItems.length === 0) return;

    // Filter function
    function filterProducts() {
        const selectedCategories = Array.from(categoryFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let visibleCount = 0;

        // Hide/show category headers
        const categoryHeaders = document.querySelectorAll('.col-12 h3');
        categoryHeaders.forEach(header => {
            header.parentElement.style.display = 'none';
        });

        productItems.forEach(item => {
            const itemCategory = item.dataset.category;

            if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
                item.style.display = '';
                visibleCount++;

                // Show the category header for this product
                const prevSibling = item.parentElement.querySelector(`.col-12 h3`);
                if (prevSibling) {
                    prevSibling.parentElement.style.display = '';
                }
            } else {
                item.style.display = 'none';
            }
        });

        // Update count if element exists
        const resultCount = document.getElementById('result-count');
        if (resultCount) {
            resultCount.textContent = `${visibleCount} Product${visibleCount !== 1 ? 's' : ''}`;
        }

        console.log(`VelocityVault: Showing ${visibleCount} bikes`);
    }

    // Attach event listeners
    categoryFilters.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Initial filter
    filterProducts();
});
