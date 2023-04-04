import React, { useRef, useState } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './Cart.css';
import Payment from './Payment';

const Cart = ({ showModal, setShowModal, cartItems, removeFromCart, increaseQuantity, decreaseQuantity }) => {
  const modalRef = useRef();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleOutsideClick = (event) => {
    if (modalRef.current && event.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const totalPrice = cartItems.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <>
      <div className={`modal ${showModal ? 'active' : ''}`} onClick={handleOutsideClick} ref={modalRef}>
        <div className="modal-container">
          <button className="close-button" onClick={() => setShowModal(false)}>
            X
          </button>
          <h2 className='modal-title'>Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className='item-name'>
                  <span>{item.name} - <span className='price-cart'>${item.price} </span></span>
                  <button className='btn-trash' onClick={() => removeFromCart(item)}><FaTrash /></button>
                </div>
                <div>
                  <button className='quantity' onClick={() => increaseQuantity(item)}><FaPlus /></button>
                  <span className='number'>{item.quantity}</span>
                  <button className='quantity' onClick={() => decreaseQuantity(item)}><FaMinus /></button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className='footer'>Total = ${totalPrice.toFixed(2)}</h2>
          <button
            className={`btn-next ${showPaymentModal ? 'active' : ''}`}
            onClick={() => {
              setShowPaymentModal(!showPaymentModal);
              setShowModal(false);
            }}
          >
            {showPaymentModal ? 'Back' : 'Next'}
          </button>
        </div>
      </div>
      <Payment
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        totalPrice={totalPrice.toFixed(2)}
        cartItems={cartItems}
      />
    </>
  );
};

export default Cart;
