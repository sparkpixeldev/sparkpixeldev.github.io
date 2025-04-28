document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.main-content h1');
    const letters = logo.querySelectorAll('span');
    const maxDistance = 150; // Max distance (pixels) for color change effect
    const shakeDistance = 30; // Distance (pixels) to trigger shake

    // Define colors
    const colorStart = { r: 0, g: 255, b: 255 }; // Neon Blue (#00ffff)
    const colorEnd = { r: 138, g: 43, b: 226 };   // Purple (#8a2be2)

    // Function to interpolate between two colors
    function lerpColor(color1, color2, factor) {
        const r = Math.round(color1.r + (color2.r - color1.r) * factor);
        const g = Math.round(color1.g + (color2.g - color1.g) * factor);
        const b = Math.round(color1.b + (color2.b - color1.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    logo.addEventListener('mousemove', (e) => {
        const logoRect = logo.getBoundingClientRect();
        // Adjust mouse coordinates to be relative to the logo container
        const mouseX = e.clientX - logoRect.left;
        const mouseY = e.clientY - logoRect.top;

        letters.forEach(letter => {
            const letterRect = letter.getBoundingClientRect();
            // Calculate letter center relative to the logo container
            const letterCenterX = (letterRect.left - logoRect.left) + letterRect.width / 2;
            const letterCenterY = (letterRect.top - logoRect.top) + letterRect.height / 2;

            const dx = mouseX - letterCenterX;
            const dy = mouseY - letterCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Calculate interpolation factor (0 = far, 1 = close)
            const colorFactor = Math.max(0, 1 - (distance / maxDistance));

            // Apply interpolated color
            letter.style.color = lerpColor(colorStart, colorEnd, colorFactor);

            // Trigger shake if close enough and not already shaking
            if (distance < shakeDistance && !letter.classList.contains('shake')) {
                letter.classList.add('shake');
                setTimeout(() => {
                    letter.classList.remove('shake');
                }, 400); // Duration matches CSS animation
            }
        });
    });

    // Reset color and remove shake when mouse leaves the logo area
    logo.addEventListener('mouseleave', () => {
        letters.forEach(letter => {
            // Reset color to default neon blue
            letter.style.color = `rgb(${colorStart.r}, ${colorStart.g}, ${colorStart.b})`;
            // Ensure shake class is removed if mouse leaves quickly
            letter.classList.remove('shake');
        });
    });
}); 