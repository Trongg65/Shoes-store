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
// const postRegister = (username, email, password, is_staff, image) => {
//     return axios.post(`api/users/register`, { username: username, email: email, password: password, is_staff: is_staff, image: image })
// }

const postRegister = (username, email, password, is_staff, image) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("is_staff", is_staff);
    formData.append("image", image); // Phải là file, không phải chuỗi

    return axios.post("api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

const getAllUsers = () => {
    return axios.get('api/users/all-users')
}

const deleteUser = (user_id) => {
    return axios.delete('api/users/delete', { data: { user_id: user_id } })
}

const putUpdateUser = (id, email, is_staff, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('email', email);
    data.append('is_staff', is_staff);
    data.append('userImage', image);
    return axios.put('api/users/update', data)
}

export {
    getAllProducts, postLogin, postRegister, getAllUsers, deleteUser, putUpdateUser
};