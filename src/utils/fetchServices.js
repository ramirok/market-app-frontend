const baseUrl = "http://localhost:3001/";

// ----------PRODUCTS---------

export const getCategory = async (category) => {
  const response = await fetch(
    `${baseUrl}products/cat/${
      category.includes("-")
        ? category.slice(0, category.indexOf("-"))
        : category
    }`
  );
  const parsedResponse = await response.json();
  return parsedResponse;
};

export const getSome = async (query) => {
  const response = query
    ? await fetch(`${baseUrl}products?${query}`)
    : await fetch(`${baseUrl}products`);

  const parsedResponse = await response.json();
  return parsedResponse;
};

export const getSuggestions = async (value) => {
  const response = await fetch(`${baseUrl}products/autosuggest?q=${value}`);
  const parsedResponse = await response.json();
  return parsedResponse;
};

// ----------CART---------

export const getCart = async (token) => {
  const response = await fetch(`${baseUrl}cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsedResponse = await response.json();

  return parsedResponse.products;
};

export const postCart = async (data, token) => {
  const response = await fetch(`${baseUrl}cart`, {
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
  const response = await fetch(`${baseUrl}cart/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const parsedResponse = await response.json();
  return parsedResponse.products;
};

// ----------USER---------

export const signup = async (data) => {
  const response = await fetch(`${baseUrl}users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const activateAcc = async (token) => {
  const response = await fetch(`${baseUrl}users/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(token),
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const login = async (data) => {
  const response = await fetch(`${baseUrl}users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json(); //{ user:{email, password, id}, token}
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const loginGoogle = async (code) => {
  const response = await fetch(
    `http://localhost:3001/users/login/google${code}`
  );

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const logout = async (token) => {
  await fetch(`${baseUrl}users/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const logoutAll = async (token) => {
  const response = await fetch(`${baseUrl}users/logoutAll`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const changePass = async (token, data) => {
  const response = await fetch(`${baseUrl}users/change`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const forgotPass = async (email) => {
  const response = await fetch(`${baseUrl}users/forgot-pass`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const resetPass = async (data) => {
  const response = await fetch(`${baseUrl}users/reset-pass`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const getUserDetails = async (token) => {
  const response = await fetch(`${baseUrl}users/user-details`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const putUserDetails = async (token, data) => {
  const response = await fetch(`${baseUrl}users/user-details`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const createOrder = async (token) => {
  const response = await fetch("http://localhost:3001/users/purchase-aproved", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const onAprove = async (token, data) => {
  const response = await fetch("http://localhost:3001/users/reset-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const getOrders = async (token) => {
  const response = await fetch("http://localhost:3001/users/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};

export const postHistory = async (token, data) => {
  await fetch(`http://localhost:3001/users/history/${data}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getHistory = async (token) => {
  const response = await fetch("http://localhost:3001/users/history", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  return parsedResponse;
};
