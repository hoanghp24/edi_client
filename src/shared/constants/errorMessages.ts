// HTTP ERROR MESSAGES
export const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Invalid request, please check your data',
  401: 'Invalid username or password',
  403: 'You do not have permission to access this system',
  404: 'The requested resource was not found',
  408: 'Request timeout, please try again',
  500: 'Internal Server Error, please try again later',
  502: 'Bad Gateway, please contact support',
  503: 'Service unavailable, please check back later',
  504: 'Gateway Timeout, the server took too long to respond',
};

export const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred, please try again';
