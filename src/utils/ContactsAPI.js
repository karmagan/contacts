const api = "http://localhost:3300";

const headers = {
  Accept: "application/json",
};

export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const search = (query='',skip=0) =>
  fetch(`${api}/contacts?search=${query}&skip=${skip}`, { headers })
    .then((res) => res.json())
    .then((data) => data);
 