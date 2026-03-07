// Validation helpers

export const validatePassword = (password) => {
  const errors = [];
  if (!password || password.trim() === '') {
    errors.push('Password is required.');
  }
  return errors;
};

export const validateAdminLogin = (username, password) => {
  const errors = [];
  if (!username || username.trim() === '') errors.push('Username is required.');
  if (!password || password.trim() === '') errors.push('Password is required.');
  return errors;
};

export const validateGuestForm = (data) => {
  const errors = [];
  if (!data.name || data.name.trim() === '') errors.push('Guest name is required.');
  if (!data.password || data.password.trim() === '') errors.push('Password is required.');
  if (!data.reserved_seats || data.reserved_seats < 1) errors.push('Reserved seats must be at least 1.');
  return errors;
};
