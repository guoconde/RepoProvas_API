type AppErrorTypes = 'conflict' | 'not_found' | 'unauthorized';

export interface AppError {
  type: AppErrorTypes;
  message: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === 'conflict') return 409;
  if (type === 'not_found') return 404;
  if (type === 'unauthorized') return 401;
  return 400;
}
