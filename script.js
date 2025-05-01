document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.main-content h1');
    const letters = logo.querySelectorAll('span');
    const maxDistance = 150; // Max distance for effects
    // const shakeDistance = 30; // Removed shake effect
    // const maxScale = 1.15; // Removed scaling effect

    // Define colors
    const colorStart = { r: 0, g: 170, b: 255 }; // New Neon Blue (#00aaff)
    const colorEnd = { r: 138, g: 43, b: 226 };   // Purple (#8a2be2)

    // let isMouseDown = false; // Removed mouse button tracking

    // Function to interpolate between two colors
    function lerpColor(color1, color2, factor) {
        const r = Math.round(color1.r + (color2.r - color1.r) * factor);
        const g = Math.round(color1.g + (color2.g - color1.g) * factor);
        const b = Math.round(color1.b + (color2.b - color1.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Function to calculate scale based on distance (Removed - no longer scaling on click)
    // function calculateScale(distance) { ... }

    // Removed mousedown listener
    // logo.addEventListener('mousedown', () => { ... });

    // Removed mouseup listener
    // window.addEventListener('mouseup', () => { ... });

    logo.addEventListener('mousemove', (e) => {
        const logoRect = logo.getBoundingClientRect();
        const mouseX = e.clientX - logoRect.left;
        const mouseY = e.clientY - logoRect.top;

        letters.forEach(letter => {
            const letterRect = letter.getBoundingClientRect();
            const letterCenterX = (letterRect.left - logoRect.left) + letterRect.width / 2;
            const letterCenterY = (letterRect.top - logoRect.top) + letterRect.height / 2;

            const dx = mouseX - letterCenterX;
            const dy = mouseY - letterCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // --- Color Interpolation (Always active on hover) ---
            const colorFactor = Math.max(0, 1 - (distance / maxDistance));
            letter.style.color = lerpColor(colorStart, colorEnd, colorFactor);

            // --- Scaling (Removed - was active only when mouse is down) ---
            // if (isMouseDown) { ... } else { ... }

            // --- Shake Effect (Removed) ---
            // if (distance < shakeDistance && !letter.classList.contains('shake')) { ... }
        });
    });

    // Reset color when mouse leaves the logo area
    logo.addEventListener('mouseleave', () => {
        // isMouseDown = false; // Removed mouse state reset
        letters.forEach(letter => {
            letter.style.color = `rgb(${colorStart.r}, ${colorStart.g}, ${colorStart.b})`;
            // letter.style.transform = 'scale(1)'; // Removed scale reset
            // letter.classList.remove('shake'); // Removed shake class removal
        });
    });
}); 