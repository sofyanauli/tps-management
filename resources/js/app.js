import './bootstrap';
import '../css/project-board.css';

// Ensure Alpine.js initialization happens after DOM is fully loaded and in a try-catch block
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            // Any existing Alpine.js initialization will happen here
            // The delay helps avoid race conditions with browser extensions
        } catch (error) {
            console.warn('Alpine.js initialization warning:', error);
        }
    }, 50);
});