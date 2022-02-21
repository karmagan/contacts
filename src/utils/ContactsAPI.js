const api = "http://localhost:3300";

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getAll = () =>
  fetch(`${api}/contacts`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const search = (query='',skip=0) =>
  fetch(`${api}/contacts?search=${query}&skip=${skip}`, { headers })
    .then((res) => res.json())
    .then((data) => data);
 