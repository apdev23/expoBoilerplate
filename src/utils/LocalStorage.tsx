import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

//this setup for in Redux setup in
export const MMKVStorage = {
  setItem: (key: any, value: any) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: any) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: any) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const saveTheme = (isDarkMode: any) => {
  storage.set("theme", isDarkMode ? "dark" : "light");
};

export const getTheme = () => {
  return storage.getString("theme") || "light";
};
