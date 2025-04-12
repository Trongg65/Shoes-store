const TableProduct = (props) => {
    const { listProducts } = props;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">SKU</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts && listProducts.length > 0 &&
                        listProducts.map((item, index) => {
                            return (
                                <tr key={`table-products-${index}`}>
                                    <td>{index + 1}</td>
                                    <td className="product-image-cell">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-thumbnail"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{formatPrice(item.price)}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.color}</td>
                                    <td>{item.sku}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary px-4"
                                            onClick={() => props.handleClickBtnView(item)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning mx-3 px-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger px-4"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listProducts && listProducts.length === 0 &&
                        <tr>
                            <td colSpan={'8'}> Not found data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableProduct; 