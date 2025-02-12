import { useEffect, useState } from 'react';

export default function useLocationHandler() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        setError('Location request timed out');
      }, 10000); // 10-second timeout

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          setLocation(position);
        },
        (err) => {
          clearTimeout(timeoutId);
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
    }
  }, []);

  return { location, error };
}
