/**
 * Request browser geolocation (requires HTTPS or localhost).
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
const getPosition = (options) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      options
    );
  });

const tryWatchPosition = (options) =>
  new Promise((resolve, reject) => {
    let settled = false;
    const timeoutMs = (options.timeout || 25000) + 2000;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (settled) return;
        settled = true;
        navigator.geolocation.clearWatch(watchId);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        if (settled) return;
        settled = true;
        navigator.geolocation.clearWatch(watchId);
        reject(error);
      },
      { ...options, maximumAge: 0 }
    );

    setTimeout(() => {
      if (settled) return;
      settled = true;
      navigator.geolocation.clearWatch(watchId);
      reject(Object.assign(new Error('Watch timeout'), { code: 3 }));
    }, timeoutMs);
  });

const getOrigin = () =>
  typeof window !== 'undefined' ? window.location.origin : '';

const permissionBlockedHint = () => {
  const origin = getOrigin();
  let extra = '';
  if (origin.includes('127.0.0.1')) {
    extra =
      ' If you use 127.0.0.1, allow location for that URL or switch to http://localhost:5173.';
  }
  return `Allow location for ${origin || 'this site'} (lock icon → Location → Allow), then reload.${extra} Or use “Find address” below.`;
};

const gpsUnavailableHint = () =>
  'Location is allowed for this site, but your device could not return GPS coordinates. ' +
  'Turn on Windows Location (Settings → Privacy & security → Location → Location services ON). ' +
  'Open http://localhost:5173 in Chrome or Edge (full browser, not an embedded preview). ' +
  'Or use “Find address” below — it works without GPS.';

/** @returns {Promise<'granted'|'denied'|'prompt'|'unknown'>} */
export const getGeolocationPermissionState = async () => {
  if (!navigator.permissions?.query) {
    return 'unknown';
  }
  try {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    return status.state;
  } catch {
    return 'unknown';
  }
};

const buildErrorMessage = async (lastError) => {
  const code = lastError?.code;

  if (code === 1) {
    const permState = await getGeolocationPermissionState();
    if (permState === 'granted') {
      return gpsUnavailableHint();
    }
    return permissionBlockedHint();
  }

  if (code === 2) {
    return gpsUnavailableHint();
  }

  if (code === 3) {
    return 'Location request timed out. Try again or use “Find address”.';
  }

  return 'Could not get your location. Use “Find address” instead.';
};

export const requestCurrentPosition = async () => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported. Use “Find address”.');
  }

  if (!window.isSecureContext) {
    throw new Error(
      'GPS requires HTTPS or localhost. Open http://localhost:5173 (not a file:// or random IP URL).'
    );
  }

  const attempts = [
    { enableHighAccuracy: false, timeout: 25000, maximumAge: 300000 },
    { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 },
    { enableHighAccuracy: false, timeout: 30000, maximumAge: 0 },
  ];

  let lastError = null;

  for (const options of attempts) {
    try {
      return await getPosition(options);
    } catch (error) {
      lastError = error;
    }
  }

  try {
    return await tryWatchPosition({
      enableHighAccuracy: false,
      timeout: 28000,
    });
  } catch (error) {
    if (!lastError || error?.code !== 3) {
      lastError = error;
    }
  }

  throw new Error(await buildErrorMessage(lastError));
};
