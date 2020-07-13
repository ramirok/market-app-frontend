// ----------PRODUCTS---------

export const getItem = async (item) => {
  const response = await fetch(`http://localhost:3001/products/${item}`);
  const parsedResponse = await response.json();

  return parsedResponse;
};

export const getCategory = async (category) => {
  const response = await fetch(
    `http://localhost:3001/products/cat/${
      category.includes("-")
        ? category.slice(0, category.indexOf("-"))
        : category
    }`
  );
  const parsedResponse = await response.json();
  return parsedResponse;
};

export const getSome = async (query) => {
  const response = await fetch(`http://localhost:3001/products/?${query}`);
  const parsedResponse = await response.json();
  return parsedResponse;
};

// ----------CART---------

export const getCart = async (token) => {
  const response = await fetch(`http://localhost:3001/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsedResponse = await response.json();

  return parsedResponse.products;
};

export const postCart = async (data, token) => {
  const response = await fetch("http://localhost:3001/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const parsedResponse = await response.json();

  return parsedResponse.products;
};

export const delCart = async (id, token) => {
  const response = await fetch(`http://localhost:3001/cart/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsedResponse = await response.json();
  return parsedResponse.products;
};

// ----------USER---------

export const signup = async (data) => {
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();
  return parsedResponse;
};

export const activateAcc = async (token) => {
  const response = await fetch("http://localhost:3001/users/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const parsedResponse = await response.json();
  console.log(parsedResponse);

  return parsedResponse;
};

export const login = async (data) => {
  const response = await fetch("http://localhost:3001/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json(); //{ user:{email, password, id}, token}
  return parsedResponse;
};

export const logout = async (token) => {
  await fetch("http://localhost:3001/users/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const logoutAll = async (token) => {
  const response = await fetch("http://localhost:3001/users/logoutAll", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const parsedResponse = await response.json();
  return parsedResponse;
};

export const changePass = async (token, data) => {
  const respone = await fetch("http://localhost:3001/users/change", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const parsedResponse = await respone.json();
  return parsedResponse;
};

export const forgotPass = async (email) => {
  const response = await fetch("http://localhost:3001/users/forgot-pass", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const parsedResponse = await response.json();
  return parsedResponse;
};

export const resetPass = async (data) => {
  const response = await fetch("http://localhost:3001/users/reset-pass", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();
  return parsedResponse;
};
