// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 characters)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Name validation (min 2 characters)
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Validate signup form
export const validateSignupForm = (values) => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = 'Name is required';
  } else if (!isValidName(values.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(values.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

// Validate login form
export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

// Validate task form
export const validateTaskForm = (values) => {
  const errors = {};

  if (!values.title || !values.title.trim()) {
    errors.title = 'Title is required';
  } else if (values.title.length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  if (values.description && values.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  return errors;
};

// Validate profile form
export const validateProfileForm = (values) => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = 'Name is required';
  } else if (!isValidName(values.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (values.bio && values.bio.length > 200) {
    errors.bio = 'Bio cannot exceed 200 characters';
  }

  return errors;
};
