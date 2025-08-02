/**
 * Error handling utilities for network requests
 */

export interface ErrorResponse {
  message: string;
  status?: number;
  code?: string;
}

/**
 * Handles axios errors and returns user-friendly error messages
 */
export const handleAxiosError = (error: any): ErrorResponse => {
  // Handle cancelled requests
  if (error?.__CANCEL__ || error?.message?.includes('cancel')) {
    return {
      message: 'Request was cancelled',
      code: 'CANCELLED'
    };
  }

  // Handle timeout errors
  if (error?.code === 'ECONNABORTED' || error?.message?.includes('timeout')) {
    return {
      message: 'Request timed out. Please try again.',
      code: 'TIMEOUT'
    };
  }

  // Handle network errors
  if (error?.code === 'ERR_NETWORK' || !error?.response) {
    return {
      message: 'Network error. Please check your connection.',
      code: 'NETWORK_ERROR'
    };
  }

  // Handle XMLHttpRequest errors
  if (error?.message?.includes('XMLHttpRequest')) {
    return {
      message: 'Network connection error. Please try again.',
      code: 'XMLHTTP_ERROR'
    };
  }

  // Handle HTTP status errors
  if (error?.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return {
          message: data?.message || 'Bad request. Please check your input.',
          status: 400
        };
      case 401:
        return {
          message: 'Unauthorized access. Please login again.',
          status: 401
        };
      case 403:
        return {
          message: 'Access forbidden.',
          status: 403
        };
      case 404:
        return {
          message: 'Resource not found.',
          status: 404
        };
      case 422:
        return {
          message: data?.message || 'Validation error. Please check your input.',
          status: 422
        };
      case 500:
        return {
          message: 'Server error. Please try again later.',
          status: 500
        };
      default:
        return {
          message: data?.message || 'An error occurred.',
          status
        };
    }
  }

  // Handle unexpected errors
  return {
    message: 'An unexpected error occurred.',
    code: 'UNKNOWN'
  };
};

/**
 * Logs errors in a consistent way
 */
export const logError = (error: any, context?: string) => {
  const errorInfo = handleAxiosError(error);
  
  console.warn(`[${context || 'API'}] Error:`, {
    message: errorInfo.message,
    status: errorInfo.status,
    code: errorInfo.code,
    originalError: error
  });
};

/**
 * Checks if an error is a network-related error
 */
export const isNetworkError = (error: any): boolean => {
  const errorInfo = handleAxiosError(error);
  return ['NETWORK_ERROR', 'XMLHTTP_ERROR', 'TIMEOUT'].includes(errorInfo.code || '');
};

/**
 * Checks if an error is a server error
 */
export const isServerError = (error: any): boolean => {
  const errorInfo = handleAxiosError(error);
  return errorInfo.status ? errorInfo.status >= 500 : false;
};

/**
 * Checks if an error is an authentication error
 */
export const isAuthError = (error: any): boolean => {
  const errorInfo = handleAxiosError(error);
  return errorInfo.status === 401 || errorInfo.status === 403;
}; 