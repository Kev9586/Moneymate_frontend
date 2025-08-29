/**
 * Format currency amount with proper locale and currency symbol
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format number with thousands separators
 */
export const formatNumber = (
  value: number,
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format percentage value
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1,
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format transaction amount with sign
 */
export const formatTransactionAmount = (
  amount: number,
  type: 'income' | 'expense',
  currency: string = 'USD',
): string => {
  const sign = type === 'income' ? '+' : '-';
  const absoluteAmount = Math.abs(amount);
  return `${sign}${formatCurrency(absoluteAmount, currency)}`;
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};