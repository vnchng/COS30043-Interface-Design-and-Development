// src/utils/formRules.js
import {
  validateName,
  validateEmail,
  validatePhone,
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validatePostcode,
} from "./validators.js";

export const nameRules = [
  v => !!v || "Name is required",
  v => validateName(v) || "Only letters, spaces, apostrophes, and dashes allowed",
];

export const emailRules = [
  v => !!v || "Email is required",
  v => validateEmail(v) || "Invalid email format",
];

export const phoneRules = [
  v => !!v || "Phone is required",
  v => validatePhone(v) || "Must be 10 digits starting with 04",
];

export const addressRules = [
  v => !!v || "Billing address is required",
  v => (v && v.length <= 100) || "Max 100 characters",
];

export const cardRules = [
  v => !!v || "Card number required",
  v => validateCardNumber(v) || "Must be 16 digits",
];

export const expiryRules = [
  v => !!v || "Expiry required",
  v => validateExpiry(v) || "Format MM/YY",
];

export const cvvRules = [
  v => !!v || "CVV required",
  v => validateCVV(v) || "3–4 digits",
];

export const postcodeRules = [
  v => !!v || "Postcode required",
  v => validatePostcode(v) || "Must be 4 digits",
];
