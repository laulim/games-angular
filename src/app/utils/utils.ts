export const getStorageData = (str: string): any => {
  if (localStorage.getItem(str)) {
    return JSON.parse(localStorage.getItem(str));
  }
  return [];
};

export const setStorageData = (data: any, str: string) => {
  localStorage.setItem(str, JSON.stringify(data));
};
