//---------- capitalize string ----------
export const capitalizeName = (string = "") => {
  const words = string.match(/[A-Za-z][a-z]*/g) || [];
  return words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.substring(1);
    })
    .join(" ");
};

//---------- input validation ----------
export const checkValidity = (value, type, passConfirmation) => {
  let isValid = true;
  const error = [];

  switch (type) {
    case "email":
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = emailRegex.test(value);
      error.push("Enter a valid email address");
      break;

    case "password":
      let includesNum = false;
      let includesOtherChars = false;
      let isLongEnough = value.length >= 6;

      for (let letter of value) {
        isNaN(parseInt(letter))
          ? (includesOtherChars = true)
          : (includesNum = true);
      }

      if (passConfirmation) {
        isValid = value === passConfirmation && isValid;
        if (!isValid) error.push("Passwords needs to match");
      }

      isValid = includesNum && includesOtherChars && isLongEnough && isValid;

      if (!includesNum) error.push("Must include 1 digit");
      if (!includesOtherChars) error.push("Must include 1 letter");
      if (!isLongEnough) error.push("Must have 6 characters minimum.");
      break;

    case "text":
      isValid = value.length >= 4;
      error.push("Minimun 4 characters");
      break;

    case "number":
      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
      isValid = phoneRegex.test(value);
      error.push("Please a valid number");
      break;

    default:
      return null;
  }

  return { isValid, error };
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
