export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-+()]+$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => password.length >= 8;

export const validateInvoiceData = (data) => {
  const errors = {};

  if (!data.clientId) errors.clientId = 'Client is required';
  if (!data.issueDate) errors.issueDate = 'Issue date is required';
  if (!data.dueDate) errors.dueDate = 'Due date is required';

  if (data.dueDate && data.issueDate) {
    if (new Date(data.dueDate) < new Date(data.issueDate)) {
      errors.dueDate = 'Due date must be after issue date';
    }
  }

  return errors;
};
