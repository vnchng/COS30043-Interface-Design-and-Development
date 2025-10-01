// src/utils/validators.js

export function validateName(name) {
  return /^[A-Za-z\s'-]+$/.test(name);
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  return /^04\d{8}$/.test(phone); // Australian mobile format
}

export function validateCardNumber(number) {
  return /^\d{16}$/.test(number);
}

export function validateExpiry(expiry) {
  return /^\d{2}\/\d{2}$/.test(expiry); // MM/YY
}

export function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}

export function validatePostcode(postcode) {
  return /^\d{4}$/.test(postcode || "");
}
