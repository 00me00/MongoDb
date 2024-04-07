import axios from 'axios';
import {useReactToPrint} from 'react-to-print';
import React, { useEffect, useState, useRef } from 'react';

const Bills = () => {
    const [allBill, setAllBill] = useState([]);
    const [printBill, setPrintBill] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const componentRef=useRef();
    const user = JSON.parse(localStorage.getItem('user'));

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

    const handlePrintBill = (bill) => {
        setSelectedBill(bill);
        setPrintBill(true);
    };
    const handlePrint=useReactToPrint({
        content:()=>componentRef.current
    })

    return (
        <>
            <h5 className='container text-center'>Bills</h5>
            <h6> User : {user.name}</h6>
            <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Payment</th>
                            <th>Amount</th>
                            <th>Action</th>
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
                                    <td>
                                        <button type='button' className='btn btn-secondary' onClick={() => handlePrintBill(bill)}> Print this bill </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {
                printBill && (
                    <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div ref={componentRef} className='p-5'>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5"> Bill Details</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setPrintBill(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h5>User Name: {user.name}</h5>
                                    <p>Customer Name: {selectedBill.name}</p>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Customer Name</th>
                                                <th>Phone Number</th>
                                                <th>Payment Mode</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{selectedBill.name}</td>
                                                <td>{selectedBill.phoneNumber}</td>
                                                <td>{selectedBill.mode}</td>
                                                <td>${selectedBill.totalAmount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p>Total Amount: ${selectedBill.totalAmount}</p>
                                </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setPrintBill(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handlePrint}>Print</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default Bills;
