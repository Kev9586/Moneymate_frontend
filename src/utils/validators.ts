/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate required field
 */
export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Validate number within range
 */
export const validateNumberRange = (
  value: number,
  min?: number,
  max?: number,
): boolean => {
  if (isNaN(value)) {
    return false;
  }
  
  if (min !== undefined && value < min) {
    return false;
  }
  
  if (max !== undefined && value > max) {
    return false;
  }
  
  return true;
};

/**
 * Validate transaction amount
 */
export const validateAmount = (amount: string | number): {
  isValid: boolean;
  error?: string;
} => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return {
      isValid: false,
      error: 'Please enter a valid amount',
    };
  }
  
  if (numAmount <= 0) {
    return {
      isValid: false,
      error: 'Amount must be greater than zero',
    };
  }
  
  if (numAmount > 1000000) {
    return {
      isValid: false,
      error: 'Amount is too large',
    };
  }
  
  return { isValid: true };
};

/**
 * Validate account name
 */
export const validateAccountName = (name: string): {
  isValid: boolean;
  error?: string;
} => {
  if (!validateRequired(name)) {
    return {
      isValid: false,
      error: 'Account name is required',
    };
  }
  
  if (name.length < 3) {
    return {
      isValid: false,
      error: 'Account name must be at least 3 characters long',
    };
  }
  
  if (name.length > 50) {
    return {
      isValid: false,
      error: 'Account name must be less than 50 characters',
    };
  }
  
  return { isValid: true };
};

/**
 * Validate budget data
 */
export const validateBudget = (data: {
  name: string;
  amount: number;
  category: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  if (!validateRequired(data.name)) {
    errors.name = 'Budget name is required';
  } else if (data.name.length < 3) {
    errors.name = 'Budget name must be at least 3 characters long';
  }
  
  const amountValidation = validateAmount(data.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error || 'Invalid amount';
  }
  
  if (!validateRequired(data.category)) {
    errors.category = 'Category is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};