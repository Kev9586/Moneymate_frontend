import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  // Default to true. This will be the value on the server and the initial client render.
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Guard against running this code on the server.
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Set the initial status once the component mounts on the client.
    updateOnlineStatus();

    // Add event listeners for online/offline events.
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Cleanup function to remove event listeners when the component unmounts.
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  return isOnline;
};