export const baseUrl = import.meta.env.VITE_APP_API
// user
export const logInAPI = baseUrl + 'api/auth/login';
export const signUpAPI = baseUrl + 'api/auth/signup';
export const forgotPassword = baseUrl + 'api/auth/forgot-password';
export const resetPassword = baseUrl + 'api/auth/reset-password';
export const getUserAPI = baseUrl + 'api/auth/user/';
export const saveFormData = baseUrl + 'api/saveFormData';
export const updateReferralFrequency = baseUrl + 'api/update-referral-frequency/';
export const getFormSubmissions = baseUrl + 'api/submissions/';