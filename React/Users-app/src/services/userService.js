import usersApi from "../apis/usresApi";

// const BASE_URL = "http://localhost:5001/users";
const BASE_URL = "";

// const config = () => {
//   return {
//     headers: {
//       Authorization: sessionStorage.getItem("token"),
//       "Content-Type": "application/json",
//     },
//   };
// };



export const findAll = async () => {
  try {
    const response = await usersApi.get(BASE_URL);
    return response;
  } catch (error) {
    throw error;
  }
};

export const save = async ({ username, email, password, admin }) => {
  try {
    return await usersApi.post(BASE_URL, { username, email, password, admin }, config());
  } catch (error) {
    throw error;
  }
};

export const update = async ({ id, username, email, admin }) => {
  try {
    return await usersApi.put(
      `${BASE_URL}/${id}`,
      {
        username,
        email,
        // password: 'nothing'
        admin,
      },
      config()
    );
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    await usersApi.delete(`${BASE_URL}/${id}`, config());
  } catch (error) {
    throw error;
  }
};

export const show = async (id) => {
  try {
    return await usersApi.get(`${BASE_URL}/${id}`, config());
  } catch (error) {
    throw error;
  }
};
