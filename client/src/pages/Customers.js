import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Customers = () => {
    const [allBill, setAllBill] = useState([]);

    const getAllBills = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/bills/bill');
            setAllBill(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBills();
    }, []);
  return (
    <>
    <h5 className='container text-center'> Customer </h5>
    <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Payment</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBill && allBill.map((bill,idx) => (
                                <tr key={bill._id}>
                                    <td>{idx+1}</td>
                                    <td>{bill.name}</td>
                                    <td>{bill.phoneNumber}</td>
                                    <td>{bill.mode}</td>
                                    <td>${bill.totalAmount}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
    </>
  )
}

export default Customers