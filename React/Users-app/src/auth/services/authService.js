import axios from "axios"

export const loginUser = async ({username, password}) => {
  try {
    return await axios.post('http://localhost:5001/login',{username, password}) 
  } catch (error) {
    throw error 
  }
}