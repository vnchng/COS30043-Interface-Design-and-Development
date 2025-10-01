// src/utils/filters.js
export function formatCurrency(value) {
  if (!value && value !== 0) return "";
  return `$${parseFloat(value).toFixed(2)}`;
}
