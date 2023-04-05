import React, { useState, useEffect } from 'react';
import './Payment.css';
import Axios from 'axios';

const Payment = ({ showPaymentModal, setShowPaymentModal, totalPrice, cartItems, setCartItems }) => {

    const [customerName, setCustomerName] = useState("")
    const [creditCardNumber, setcreditCardNumber] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("credit card")
    const [OrderId, setOrderId] = useState()

    useEffect(() => {
        if (OrderId) {
          saveOrder();
        }
      }, [OrderId]);

    const saveOrder = () => {
        console.log("OrderId = ", OrderId)

        cartItems.forEach(item => {
            const payload = {
              item_id: item.id,
              order_id: OrderId,
              quantity: item.quantity
            }
        
            Axios.post('http://localhost:8000/itemdetails/', payload)
              .then(response => {
                console.log(response)
              })
              .catch(error => {
                console.error(error)
              })
          })
        setCartItems([])
        }

    const handlePayment = () => {
        const payload = {
            total: totalPrice,
            payment: {
              paymentMethod: paymentMethod,
              creditCardNumber: creditCardNumber,
            },
          }

        Axios.post('http://localhost:8000/orders/', payload).then(
            (response) => {
                setShowPaymentModal(false);
                setOrderId(response.data.id);
          })
          .catch((error) => {
            console.error('Error submitting order:', error);
          });
      };


    return (
        <>
        <div className={`modal ${showPaymentModal ? 'active' : ''} modal-payment`}>
            <div className="modal-container">
            <button className="close-button" onClick={() => setShowPaymentModal(false)}>
                X
            </button>
            <h2 className='modal-title'>Payment</h2>
            <h2 className='footer'>Total = ${totalPrice}</h2>
            
            <div className="payment-input-container">
                <div className="payment-input-row">
                    <span className="payment-input">
                        <label> Name : </label>
                        <input type="text" onChange={(event) => {setCustomerName(event.target.value)}}/> 
                    </span>
                </div>

                <div className="payment-input-row">
                    <span className="payment-input">
                        <label> Credit Card : </label>
                        <input type="text" onChange={(event) => {setcreditCardNumber(event.target.value)}}/> 
                    </span>
                </div>

                <div className="payment-input-row">
                    <span className="payment-input">
                        <label> Payment Method : </label>
                        <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                            <option value="credit card">Credit Card</option>
                            <option value="Debit card">Debit card</option>
                        </select>
                    </span>
                </div>
            </div>

            <button className='btn-next btn-pay' onClick={handlePayment}>Finish your Order</button>
            </div>
        </div>
        </>
    );
};

export default Payment;
