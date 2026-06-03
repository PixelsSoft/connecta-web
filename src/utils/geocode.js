import axiosInstance from './axios';
import { API_ENDPOINTS } from '../config/api';

/**
 * Geocode a street address via the API (Nominatim / Switzerland-biased).
 * @returns {Promise<{latitude: number, longitude: number, display_name: string}>}
 */
export const geocodeAddress = async (address) => {
  const response = await axiosInstance.get(API_ENDPOINTS.GEOCODE, {
    params: { address },
  });

  if (!response.data.success) {
    throw new Error(response.data.message || 'Geocoding failed');
  }

  return response.data.data;
};
