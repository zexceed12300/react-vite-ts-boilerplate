import Cookies from 'js-cookie';

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export const setCookie = (key: string, value: string, options?: CookieOptions) => {
	Cookies.set(key, value, options);
};

export const getCookie = (key: string): string | undefined => {
	return Cookies.get(key);
};

export const removeCookie = (key: string, options?: CookieOptions) => {
	Cookies.remove(key, options);
};