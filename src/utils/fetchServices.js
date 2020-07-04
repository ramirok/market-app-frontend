// ----------PRODUCTS---------

export const getItem = async (item) => {
  const response = await fetch(`http://localhost:3001/products/${item}`);
  const parsedResponse = await response.json();

  return parsedResponse;
};

export const getCategory = async (category) => {
  const response = await fetch(
    `http://localhost:3001/products/${
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

export const getCart = async (token) => {
  const response = await fetch("http://localhost:3001/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsedResponse = await response.json();

  return parsedResponse.products;
};

export const delCart = async (item, token) => {
  const response = await fetch(`http://localhost:3001/cart/${item}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsedResponse = await response.json();
  return parsedResponse.products;
};

// ----------SIGN UP---------

export const signup = async (data) => {
  const response = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const parsedResponse = await response.json(); //{user:{email, id, name}, token}
  return parsedResponse;
};

// ----------LOGIN---------

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
