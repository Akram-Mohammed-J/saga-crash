import axios from "axios";

export const getUsers = () => {
  return axios.get("/users");
};

export const createUser = ({ firstName, lastName }) => {
  let payload = {
    firstName: firstName,
    lastName: lastName,
  };
  return axios.post("/users", payload, {
    headers: {
      "content-type": "application/json",
    },
  });
};
export const deleteUser = ({ userId }) => {
  return axios.delete(`/users/${userId}`);
};
