import './ManageProduct.scss'
import { getAllProducts } from '../../../../services/apiServices';
import { useEffect, useState } from 'react';
import { FcPlus } from "react-icons/fc";
import TableProduct from "./TableProduct";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalViewProduct from "./ModalViewProduct";

const ManageProduct = () => {
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [showModalViewProduct, setShowModalViewProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        fetchListProducts();
    }, []);

    const fetchListProducts = async () => {
        let res = await getAllProducts();
        if (res.EC === 0) {
            setListProducts(res.DT);
        }
    };

    const handleClickBtnDelete = (product) => {
        setShowModalDeleteProduct(true);
        setDataDelete(product);
    };

    const handleClickBtnUpdate = (product) => {
        setShowModalUpdateProduct(true);
        setDataUpdate(product);
    };

    const handleClickBtnView = (product) => {
        setShowModalViewProduct(true);
        setDataUpdate(product);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };
    console.log(listProducts)
    return (
        <div className="manage-product-container">
            <div className="title">
                Manage Products
            </div>
            <div className="products-content">
                <div className="btn-add-new">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModalCreateProduct(true)}
                    >
                        <FcPlus /> Add new product
                    </button>
                </div>
                <div className="table-products-container">
                    <TableProduct
                        listProducts={listProducts}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                    />
                </div>
                <ModalCreateProduct
                    show={showModalCreateProduct}
                    setShow={setShowModalCreateProduct}
                    fetchListProducts={fetchListProducts}
                />
                <ModalDeleteProduct
                    show={showModalDeleteProduct}
                    setShow={setShowModalDeleteProduct}
                    dataDelete={dataDelete}
                    fetchListProducts={fetchListProducts}
                />
                <ModalUpdateProduct
                    show={showModalUpdateProduct}
                    setShow={setShowModalUpdateProduct}
                    dataUpdate={dataUpdate}
                    fetchListProducts={fetchListProducts}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewProduct
                    show={showModalViewProduct}
                    setShow={setShowModalViewProduct}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                />
            </div>
        </div>
    );
};

export default ManageProduct;