export const setCookie = (name, value, days) => {
  var date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie =
    name + "=" + value + ";path=/;expires=" + date.toGMTString();
};

export const getCookie = (name) => {
  const exist = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return exist ? exist[2] : null;
};
