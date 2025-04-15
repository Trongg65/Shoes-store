import './ManageProduct.scss'
import { getAllProducts } from '../../../../services/apiServices';
import { useEffect, useState } from 'react';
import { FcPlus } from "react-icons/fc";
import TableProduct from "./TableProduct";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalViewProduct from "./ModalViewProduct";
import Pagination from 'react-bootstrap/Pagination';

const ManageProduct = () => {
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [showModalViewProduct, setShowModalViewProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listProducts, setListProducts] = useState([]);

    // Thêm state cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);

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

    // Tính toán sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = listProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Tính tổng số trang
    const totalPages = Math.ceil(listProducts.length / productsPerPage);

    // Xử lý khi click vào số trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tạo các item cho thanh phân trang
    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

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
                        listProducts={currentProducts}
                        handleClickBtnDelete={handleClickBtnDelete}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                    />
                    <div className="d-flex justify-content-center mt-3">
                        <Pagination>
                            <Pagination.First
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            />
                            <Pagination.Prev
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            />
                            {paginationItems}
                            <Pagination.Next
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            />
                            <Pagination.Last
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>
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