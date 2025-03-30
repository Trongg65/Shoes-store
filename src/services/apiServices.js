import axios from "../utils/axiosCustomize";

const getAllProducts = () => {
    return axios.get('api/products')
}
const postLogin = (username, password) => {
    return axios.post(`api/users/login`, {
        username: username,
        password: password,
    })
}
const postRegister = (username, email, password) => {
    return axios.post(`api/users/register`, { username: username, email: email, password: password })
}
export {
    getAllProducts, postLogin, postRegister
};