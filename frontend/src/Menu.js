import React, { useState } from "react";
import Cart from "./components/Cart";
import Categories from "./components/Categories";

const Menu = ({ items, categories }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addToCart = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      increaseQuantity(item);
    } else {
      addNewItem(item);
    }
    setShowModal(true);
};

const addNewItem = (item) => {
    const newItem = {
        ...item,
        quantity: 1,
    };
    setCartItems((prevItems) => [...prevItems, newItem]);
};

const increaseQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
};

const decreaseQuantity = (item) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex((cartItem) => cartItem.id === item.id);
    updatedCartItems[index].quantity -= 1;
    setCartItems(updatedCartItems.filter((cartItem) => cartItem.quantity > 0));
};

const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
};


  return (
    <>
      <div
        className={`section-center ${showModal ? 'menu-active' : ''}`}
        style={{ width: showModal ? '70%' : '100%' }}
      >
        {items.map((menuItem) => {
          const { id, name, price, picture, categorie_id , description} = menuItem;
          const { name: categorie_idName } = categorie_id.id;
          return (
            <article
              key={id}
              className="menu-item"
              onClick={() => addToCart(menuItem)}
            >
              <img src={picture} alt={name} className="photo" />
              <div className="item-info">
                <header>
                  <h4>{name} </h4>
                  <h4 className="price"> ${price} </h4>
                </header>
                <h1>{description}</h1>
                <p className="item-text">{categorie_idName}</p>
              </div>
            </article>
          );
        })}
      <button className={`open-button ${showModal ? 'active' : ''}`} onClick={() => setShowModal(!showModal)}>
        {showModal ? 'Close' : 'Open Cart'}
      </button>
      </div>
      <Cart
        showModal={showModal}
        setShowModal={setShowModal}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default Menu;