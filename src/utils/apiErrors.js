/**
 * Turn Laravel-style API validation payloads into user-readable text.
 */
export function formatApiErrorMessage(payload, fallback = 'Something went wrong') {
  if (!payload) {
    return fallback;
  }

  const fieldErrors = normalizeFieldErrors(payload.errors);
  if (fieldErrors.length > 0) {
    return fieldErrors.join('\n');
  }

  if (typeof payload.message === 'string' && payload.message !== 'Validation error') {
    return payload.message;
  }

  return fallback;
}

export function normalizeFieldErrors(errors) {
  if (!errors || typeof errors !== 'object') {
    return [];
  }

  const messages = [];

  Object.values(errors).forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((msg) => {
        if (msg) messages.push(String(msg));
      });
    } else if (value) {
      messages.push(String(value));
    }
  });

  return messages;
}

export function getFieldErrors(errors) {
  if (!errors || typeof errors !== 'object') {
    return {};
  }

  const mapped = {};
  Object.entries(errors).forEach(([field, value]) => {
    if (Array.isArray(value) && value[0]) {
      mapped[field] = value[0];
    } else if (value) {
      mapped[field] = String(value);
    }
  });

  return mapped;
}
