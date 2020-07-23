//---------- capitalize string ----------
export const capitalizeName = (string) => {
  return string
    ? string.charAt(0).toUpperCase() + string.slice(1).replace("-", " ")
    : null;
};

//---------- input validation ----------
export const checkValidity = (value, type, newPass) => {
  let isValid = true;
  const error = [];

  switch (type) {
    case "email":
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = regex.test(value);
      error.push("Enter a valid email address");
      break;

    case "password":
      let includesNum = false;
      let includesLetter = false;
      let hasLength;

      hasLength = value.length >= 6;
      for (let i = 0; i < value.length; i++) {
        isNaN(parseInt(value[i]))
          ? (includesLetter = true)
          : (includesNum = true);
      }

      if (newPass) {
        isValid = value === newPass && isValid;
        if (!isValid) error.push("Passwords needs to match");
      }

      isValid = includesNum && includesLetter && hasLength && isValid;

      if (!includesNum) error.push("Must include 1 digit");
      if (!includesLetter) error.push("Must include 1 letter");
      if (!hasLength) error.push("Must have 6 characters minimum.");
      break;

    case "name":
      isValid = value.length >= 4;
      error.push("Minimun 4 characters");
      break;

    default:
      return null;
  }

  return { isValid, error };
};
