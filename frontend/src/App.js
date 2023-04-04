import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Categories from "./components/Categories";
import logo from "./logo.svg";
import Axios from 'axios';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [RealItems, setRealItems] = useState([]);

  const getRealItems = () => {
    Axios.get(`http://localhost:8000/item/`).then(
      (response) => {
        setRealItems(response.data)
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getRealItems();
  }, []);

  useEffect(() => {
    const allCategories = ["all", ...new Set(RealItems.map(item => item.categorie_id.name))];
    setCategories(allCategories);
  }, [RealItems]);

  useEffect(() => {
    filterItems("all");
  }, [RealItems]);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setMenuItems(RealItems);
      return;
    }
    const newItems = RealItems.filter((item_real) => {
      return item_real.categorie_id.name === category;
    });
    setMenuItems(newItems);
  };

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <img src={logo} alt="logo" className="logo" />
          <h2>Menu List</h2>
          <div className="underline"></div>
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
        />
        <Menu items={menuItems} categories={categories} />
      </section>
    </main>
  );
};


export default App;