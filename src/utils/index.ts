import type { GetProp, UploadProps } from 'antd';
import { nanoid } from 'nanoid';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export const isValidThaiID = (id: string): boolean => {
  if (!/^\d{13}$/.test(id)) return false;

  const digits = id.split('').map(Number);
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (13 - i);
  }

  const checkDigit = (11 - (sum % 11)) % 10;

  return checkDigit === digits[12];
};

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
export const objectToQueryString = (params: Record<string, any>): string => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return query ? `?${query}` : "";
};
export const setToken = (token: string) => {
  localStorage.setItem("token",token);
}
export const getToken  = () => {
  return localStorage.getItem("token");
}