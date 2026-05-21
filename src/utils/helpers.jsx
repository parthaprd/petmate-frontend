export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return `$${amount.toLocaleString()}`;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const getInitials = (name) => {
  return name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'U';
};
