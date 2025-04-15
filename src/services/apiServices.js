import axios from "../utils/axiosCustomize";

const getAllProducts = () => {
    return axios.get('api/products')
}

const postCreateProduct = (name, price, brand, color, sku, description, image) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("color", color);
    formData.append("sku", sku);
    formData.append("description", description);
    formData.append("image", image);

    return axios.post("api/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

const putUpdateProduct = (id, name, price, brand, color, sku, description, image) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('color', color);
    formData.append('sku', sku);
    formData.append('description', description);
    if (image) {
        formData.append('image', image);
    }

    return axios.put('api/products/update', formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};

const deleteProduct = (product_id) => {
    return axios.delete('api/products/delete', { data: { product_id: product_id } });
};

const postLogin = (username, password) => {
    return axios.post(`api/users/login`, {
        username: username,
        password: password,
    })
}
// const postRegister = (username, email, password, is_staff, image) => {
//     return axios.post(`api/users/register`, { username: username, email: email, password: password, is_staff: is_staff, image: image })
// }

const postRegister = (username, email, password, is_staff = false, image = "") => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("is_staff", is_staff);

    // Chỉ thêm image vào formData nếu có giá trị
    if (image) {
        formData.append("image", image);
    }

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

const getOverview = () => {
    return axios.get(`api/overview-statistics`)
}
export {
    getAllProducts,
    postCreateProduct,
    putUpdateProduct,
    deleteProduct,
    postLogin,
    postRegister,
    getAllUsers,
    deleteUser,
    putUpdateUser,
    getOverview
};