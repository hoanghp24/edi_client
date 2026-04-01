const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  PERSIST_SESSION: 'vac_persist_session', // Key to store the 'Remember Me' preference
};

/**
 * Helper to determine which storage to use based on 'Remember Me' preference.
 * If 'PERSIST_SESSION' is set to 'true' in localStorage, we use localStorage.
 * Otherwise, we fallback to sessionStorage for enhanced security.
 */
const getStorage = () => {
  const persist = localStorage.getItem(STORAGE_KEYS.PERSIST_SESSION) === 'true';
  return persist ? localStorage : sessionStorage;
};

export const storage = {
  setPersistSession: (persist: boolean) => {
    localStorage.setItem(STORAGE_KEYS.PERSIST_SESSION, String(persist));
  },
  
  getPersistSession: () => localStorage.getItem(STORAGE_KEYS.PERSIST_SESSION) === 'true',

  setAccessToken: (token: string) => getStorage().setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
  getAccessToken: () => {
    // Check both to support transitions
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
  removeAccessToken: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setRefreshToken: (token: string) => getStorage().setItem(STORAGE_KEYS.REFRESH_TOKEN, token),
  getRefreshToken: () => {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },
  removeRefreshToken: () => {
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setUserData: (data: any) => getStorage().setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data)),
  getUserData: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA) || sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },
  removeUserData: () => {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
    // Note: We keep PERSIST_SESSION in localStorage to remember the checkbox state for next login
  },
};
