/**
 * PetMoji Gallery Module
 * Handles gallery functionality and user-generated content
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const galleryContainer = document.querySelector('#gallery .grid');
    
    // Load gallery items
    loadGalleryItems();
    
    // Function to load gallery items
    function loadGalleryItems() {
        // Clear existing gallery items
        galleryContainer.innerHTML = '';
        
        // Get user-generated content from localStorage
        const userGallery = JSON.parse(localStorage.getItem('petmoji-gallery')) || [];
        
        // Display only one row (3 items)
        const maxItems = 3;
        
        // Fill gallery with user-generated content or placeholders
        for (let i = 0; i < maxItems; i++) {
            if (i < userGallery.length) {
                // Create gallery item with user content
                const item = createGalleryItem(userGallery[i]);
                galleryContainer.appendChild(item);
            } else {
                // Create empty placeholder
                const placeholder = createPlaceholder();
                galleryContainer.appendChild(placeholder);
            }
        }
    }
    
    // Function to create a gallery item
    function createGalleryItem(itemData) {
        const item = document.createElement('div');
        item.className = 'gallery-item bg-white/50 rounded-lg overflow-hidden';
        
        item.innerHTML = `
            <div class="aspect-w-1 aspect-h-1">
                <img src="${itemData.imageUrl}" alt="Pet emotion translation" class="w-full h-full object-cover">
            </div>
            <div class="p-3">
                <p class="text-sm text-black/70">${itemData.petType} - ${itemData.emotion}</p>
                <p class="text-xs italic mb-1">"${itemData.text || ''}"</p>
                <p class="text-xs text-black/50">${formatDate(itemData.date)}</p>
            </div>
        `;
        
        return item;
    }
    
    // Function to create a placeholder
    function createPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = 'gallery-item bg-white/30 rounded-lg overflow-hidden flex items-center justify-center';
        
        placeholder.innerHTML = `
            <div class="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-black/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-sm text-black/50">Create your own</p>
            </div>
        `;
        
        return placeholder;
    }
    
    // Format date helper
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    }
    
    // Add function to save new item to gallery
    window.addToGallery = function(data) {
        try {
            // Get existing gallery items
            const userGallery = JSON.parse(localStorage.getItem('petmoji-gallery')) || [];
            
            // Add new item
            userGallery.unshift({
                imageUrl: data.styled,
                originalUrl: data.original,
                petType: data.petType,
                emotion: data.emotion,
                text: data.text,
                date: Date.now()
            });
            
            // Keep only the most recent 3 items
            const maxGallerySize = 3;
            if (userGallery.length > maxGallerySize) {
                userGallery.length = maxGallerySize;
            }
            
            // Save to localStorage
            localStorage.setItem('petmoji-gallery', JSON.stringify(userGallery));
            
            // Reload gallery
            loadGalleryItems();
            
            console.log(`Gallery updated: ${userGallery.length} items (max: ${maxGallerySize})`);
        } catch (error) {
            console.error('Error saving to gallery:', error);
            
            // If quota exceeded, try to clear and save only the new item
            if (error.name === 'QuotaExceededError') {
                try {
                    console.log('Storage quota exceeded, clearing old items');
                    
                    // Create a new gallery with just this item
                    const newGallery = [{
                        imageUrl: data.styled,
                        originalUrl: data.original,
                        petType: data.petType,
                        emotion: data.emotion,
                        text: data.text,
                        date: Date.now()
                    }];
                    
                    // Save to localStorage
                    localStorage.setItem('petmoji-gallery', JSON.stringify(newGallery));
                    
                    // Reload gallery
                    loadGalleryItems();
                    
                    console.log('Successfully saved new item after clearing gallery');
                } catch (retryError) {
                    console.error('Failed to save even after clearing gallery:', retryError);
                }
            }
        }
    };
});
