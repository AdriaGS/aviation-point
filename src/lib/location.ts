import { checkNotNull } from './extensions/checkNotNull';

const IP_GEOLOCATION_API_KEY = checkNotNull(process.env.IP_GEOLOCATION_API_KEY);

export interface UserLocation {
  countryName: string;
  latitude: number;
  longitude: number;
}

export async function getUserLocation(): Promise<UserLocation> {
  const res = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_GEOLOCATION_API_KEY}`
  );
  const data = await res.json();
  return {
    countryName: data.country_name,
    latitude: parseFloat(data.latitude),
    longitude: parseFloat(data.longitude),
  };
}
