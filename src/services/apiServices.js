import axios from "../utils/axiosCustomize";

const getAllProducts = () => {
    return axios.get('api/products')
}

export {
    getAllProducts
};