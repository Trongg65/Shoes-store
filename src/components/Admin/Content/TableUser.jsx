
const TableUser = (props) => {
    const { listUsers } = props;
    console.log("check :", listUsers)
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Is_staff</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.is_staff ? 'True' : 'False'}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary px-4"
                                        // onClick={() => props.handleClickBtnView(item)}
                                        >View</button>
                                        <button
                                            className="btn btn-warning mx-3 px-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >Update
                                        </button>
                                        <button
                                            className="btn btn-danger px-4"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}> Not found data</td>

                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser;