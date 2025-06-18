document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    // Function to set the theme
    const setTheme = (theme) => {
        document.body.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    // Set the initial theme on page load
    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        // Optional: check user's system preference
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(userPrefersDark ? 'dark' : 'light');
    }

    // Add click event listener for the toggle button
    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });


    // --- Image Swapping ---
    // A single function to handle swapping for any image with a `data-altsrc`
    const setupImageSwap = (img) => {
        const altSrc = img.dataset.altsrc;

        if (altSrc) {
            // Preload the alternative image to prevent a flash on first click
            const altImage = new Image();
            altImage.src = altSrc;

            img.style.cursor = 'pointer'; // Add pointer cursor to indicate it's clickable

            img.addEventListener('click', function() {
                const currentSrc = this.src;
                // Swap the src with the value stored in the data attribute
                this.src = this.dataset.altsrc;
                // Update the data attribute to hold the other source for the next click
                this.dataset.altsrc = currentSrc;
            });
        }
    };

    // Find all images that should be swappable and apply the function
    const swappableImages = document.querySelectorAll('.headshot, .publication-image');
    swappableImages.forEach(setupImageSwap);

});