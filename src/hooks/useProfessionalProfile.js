import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../utils/axios';
import { API_ENDPOINTS } from '../config/api';
import { setCredentials } from '../store/slices/authSlice';
import { geocodeAddress } from '../utils/geocode';
import { requestCurrentPosition } from '../utils/geolocation';

export const useProfessionalProfile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const syncUser = useCallback(
    (updated) => {
      if (updated && token) {
        dispatch(setCredentials({ user: { ...user, ...updated }, token }));
      }
    },
    [dispatch, token, user]
  );

  const saveProfile = useCallback(
    async (payload) => {
      const res = await axiosInstance.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, payload);
      if (res.data.success) {
        syncUser(res.data.data);
      }
      return res.data;
    },
    [syncUser]
  );

  const resolveLocation = useCallback(async ({ address, useGps = false }) => {
    if (useGps) {
      return requestCurrentPosition();
    }
    if (address?.trim()) {
      const result = await geocodeAddress(address.trim());
      return {
        latitude: result.latitude,
        longitude: result.longitude,
        display_name: result.display_name,
      };
    }
    throw new Error('Enter a service area address or use your current location.');
  }, []);

  const loadProfile = useCallback(async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.USERS.PROFILE);
    return res.data?.data?.user || res.data?.data || null;
  }, []);

  const loadCategories = useCallback(async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.LIST);
    if (!res.data.success) return [];
    const data = res.data.data;
    if (Array.isArray(data)) return data;
    return data?.categories || [];
  }, []);

  return { user, saveProfile, resolveLocation, loadProfile, loadCategories };
};
