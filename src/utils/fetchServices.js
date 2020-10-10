// const baseUrl = "http://192.168.1.16:3001/";
const baseUrl = "/";

export const fetchService = async (method, url, token, body) => {
  const fetchOptions = { method, headers: {} };
  if (token) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    fetchOptions.body = JSON.stringify(body);
    fetchOptions.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${baseUrl}${url}`, fetchOptions);

  const parsedResponse = await response.json();
  parsedResponse.ok = response.ok;

  if (parsedResponse.message === "Please authenticate.") {
    window.localStorage.clear();
    window.location.reload();
  }

  return parsedResponse;
};
