import './DashBoard.scss'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { useState, useEffect } from 'react';
import { getOverview } from '../../../services/apiServices';

const DashBoard = (props) => {

    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])


    useEffect(() => {
        fetchDataOverview()
    }, [])

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT)
            //process chart data
            let admin = 0, user = 0, total_products = 0, total_brand = 0;
            admin = res?.DT?.total_staff_users ?? 0;
            user = res?.DT?.total_normal_users ?? 0;
            total_products = res?.DT?.total_products ?? 0;
            total_brand = res?.DT?.total_brands ?? 0;
            const data = [
                {
                    "name": 'Admin',
                    "admin": admin,
                },
                {
                    "name": 'User',
                    "user": user,
                },
                {
                    "name": 'Products',
                    "total_products": total_products,
                },
                {
                    "name": 'Brands',
                    "total_brand": total_brand,
                }
            ]
            setDataChart(data)
        }
        console.log('chekc res: ', res)
    }


    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics DashBoard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'> Admin </span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.total_staff_users ?
                                <>{dataOverview.total_staff_users}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>User</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.total_normal_users ?
                                <>{dataOverview.total_normal_users}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Products</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.total_products ?
                                <>{dataOverview.total_products}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Brands</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.total_brands ?
                                <>{dataOverview.total_brands}</>
                                :
                                <>0</>
                            }

                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="90%" height={"100%"}>
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="admin" fill="#4b8ccb" />
                            <Bar dataKey="user" fill="#8884d8" />
                            <Bar dataKey="total_products" fill="#82ca9d" />
                            <Bar dataKey="total_brand" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div >
    )
}

export default DashBoard;