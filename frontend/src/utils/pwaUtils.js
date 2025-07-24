// PWA Utility Functions for Good Transfer

/**
 * Check if app is running as PWA (installed)
 */
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
};

/**
 * Check if device supports PWA installation
 */
export const canInstallPWA = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

/**
 * Register service worker
 */
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
      return null;
    }
  }
  return null;
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

/**
 * Show local notification
 */
export const showNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    const defaultOptions = {
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      image: '/icon-512x512.png',
      vibrate: [100, 50, 100],
      tag: 'good-transfer',
      ...options
    };
    
    return new Notification(title, defaultOptions);
  }
  return null;
};

/**
 * Store form data offline for sync later
 */
export const storeFormOffline = async (formData) => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('contact-forms-offline');
      
      // Create a fake request for storing form data
      const request = new Request('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Offline-Storage': Date.now().toString()
        },
        body: JSON.stringify(formData)
      });
      
      const response = new Response(JSON.stringify(formData), {
        headers: { 'Content-Type': 'application/json' }
      });
      
      await cache.put(request, response);
      console.log('Form stored offline');
      return true;
    } catch (error) {
      console.error('Failed to store form offline:', error);
      return false;
    }
  }
  return false;
};

/**
 * Get stored offline forms
 */
export const getOfflineForms = async () => {
  if ('caches' in window) {
    try {
      const cache = await caches.open('contact-forms-offline');
      const requests = await cache.keys();
      
      const forms = [];
      for (const request of requests) {
        const response = await cache.match(request);
        const data = await response.json();
        forms.push(data);
      }
      
      return forms;
    } catch (error) {
      console.error('Failed to get offline forms:', error);
      return [];
    }
  }
  return [];
};

/**
 * Clear offline forms after successful sync
 */
export const clearOfflineForms = async () => {
  if ('caches' in window) {
    try {
      await caches.delete('contact-forms-offline');
      console.log('Offline forms cleared');
      return true;
    } catch (error) {
      console.error('Failed to clear offline forms:', error);
      return false;
    }
  }
  return false;
};

/**
 * Add to home screen prompt handler
 */
export const handleAddToHomeScreen = () => {
  // This will be handled by the PWAInstaller component
  const event = new CustomEvent('show-install-prompt');
  window.dispatchEvent(event);
};

/**
 * Share API for PWA
 */
export const shareContent = async (shareData) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Good Transfer - Transferencias USA a Venezuela',
        text: 'Transfiere dinero con las mejores tasas del mercado',
        url: window.location.href,
        ...shareData
      });
      return true;
    } catch (error) {
      console.log('Error sharing:', error);
      return false;
    }
  } else {
    // Fallback to clipboard
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        return true;
      } catch (error) {
        console.log('Error copying to clipboard:', error);
        return false;
      }
    }
  }
  return false;
};

/**
 * Update app badge (for PWA)
 */
export const updateAppBadge = (count = 0) => {
  if ('setAppBadge' in navigator) {
    if (count > 0) {
      navigator.setAppBadge(count);
    } else {
      navigator.clearAppBadge();
    }
  }
};

/**
 * Get network status
 */
export const getNetworkStatus = () => {
  return {
    online: navigator.onLine,
    connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection,
    effectiveType: navigator.connection?.effectiveType || 'unknown'
  };
};

/**
 * Handle URL parameters for PWA shortcuts
 */
export const handlePWAShortcuts = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get('action');
  
  switch (action) {
    case 'whatsapp':
      // Scroll to contact section and highlight WhatsApp
      setTimeout(() => {
        const contactSection = document.querySelector('[data-section="contact"]');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Highlight WhatsApp buttons
        const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
        whatsappButtons.forEach(button => {
          button.style.animation = 'pulse 1s infinite';
        });
      }, 1000);
      break;
      
    case 'quote':
      // Scroll to quote form
      setTimeout(() => {
        const quoteForm = document.querySelector('form');
        if (quoteForm) {
          quoteForm.scrollIntoView({ behavior: 'smooth' });
          const firstInput = quoteForm.querySelector('input');
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 1000);
      break;
      
    default:
      break;
  }
};