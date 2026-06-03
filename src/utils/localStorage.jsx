//load from storage as json(extract Object) then return default value if error
export const loadState = (key, defaultVal) => {
  try {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultVal;
  } catch (err) {
    return defaultVal;
  }
};
//save to storage
export const saveState = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
};
