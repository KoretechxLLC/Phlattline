import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hexToRGB = (hex: any, alpha?: number): any => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export const formatCreditCardNumber = (value: string): string => {
  // Your logic to format the card number
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const formatCVC = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const formatExpirationDate = (value: string): string => {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/(.{2})/, "$1/")
    .trim();
};
