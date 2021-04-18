export const SaveCountries = async (data) => {
  let error = "";
  let response = await fetch("http://localhost:3001/add-countries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => (error = err));

  return error ? Promise.reject(error) : Promise.resolve(response.json());
};

export const GetCountries = async (data) => {
  let error = "";
  let response = await fetch("http://localhost:3001/get-countries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => (error = err));

  return error ? Promise.reject(error) : Promise.resolve(response.json());
};

export const GetFilters = async () => {
  let error = "";
  let response = await fetch("http://localhost:3001/get-filters", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => (error = err));

  return error ? Promise.reject(error) : Promise.resolve(response.json());
};


export const RemoveCountries = async () => {
  let error = "";
  let response = await fetch("http://localhost:3001/remove-countries", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => (error = err));

  return error ? Promise.reject(error) : Promise.resolve(response.json());
};