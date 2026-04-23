export const MESSAGES = {
  REGISTER_SUCCESS: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  REFRESH_SUCCESS: 'Token refreshed successfully',
  USER_EXISTS: 'User with this email already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  REQUIRED_FIELDS: 'Email and password are required',
  UNAUTHORIZED: 'Unauthorized access',
  LOGOUT_SUCCESS: 'Logged out successfully',
  TOKEN_EXPIRED: 'Token has expired',
  NO_REFRESH_TOKEN: 'No refresh token provided',
  TOKEN_REFRESHED: 'Token refreshed',
   KYC: {
    REQUIRED: "Image and video are required",
    SUCCESS: "KYC uploaded successfully",
    ALREADY_SUBMITTED: "KYC already submitted",
  },
  COMMON: {
    INTERNAL_ERROR: "Something went wrong",
  },
} as const;