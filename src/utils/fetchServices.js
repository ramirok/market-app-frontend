export const getAll = async () => {
  const response = await fetch("http://localhost:3001/products");
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

export const getSome = async (q) => {
  const response = await fetch(`http://localhost:3001/products/${q}`);
  const parsedResponse = await response.json();
  return parsedResponse;
};
