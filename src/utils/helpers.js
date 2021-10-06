//---------- capitalize string ----------
export const capitalizeName = (string = "") => {
  const words = string.match(/[A-Za-z][a-z]*/g) || [];
  return words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.substring(1);
    })
    .join(" ");
};

//---------- read jwt token ----------
export const jwtDecode = (t) => {
  const payload = JSON.parse(window.atob(t.split(".")[1]));
  return payload;
};

//---------- debounce ----------
export const debounce = (cb, delay) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(cb, delay);
  };
};
