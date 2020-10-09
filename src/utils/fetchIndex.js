const getCategory = `products/cat/${
  cat.includes("-") ? cat.slice(0, cat.indexOf("-")) : cat
}`;
