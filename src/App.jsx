import { useEffect, useMemo, useState } from "react";
import "./App.css";
import menu from "./data";
import Menu from "./Components/Menu";

function App() {
  const [data, setData] = useState(menu);
  const [mainDatas,setMainDatas] = useState(data)
  const [categories, setCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState("all");

  const setMainProducts = (category) => {
   
    setMainCategory(() => category)
  }

  useEffect(() => {
    const fillteredProducts = [...data].filter((product) => {
      if (mainCategory === "all") {
        return product
      }
      return product.category === mainCategory;
    });
    
    setMainDatas(fillteredProducts)
    
  }, [mainCategory]);

  useEffect(() => {
    const dataCategories = data.map((category) => {
      return category.category;
    });

    const setsCategories = new Set(dataCategories);

    const arrayCategories = Array.from(setsCategories);
    setCategories(() => [...arrayCategories, "all"]);
  }, []);

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>our menu</h2>
          <div className="underline"></div>
        </div>
        <div className="btn-container ">
          {[...categories].reverse().map((category, index) => (
            <div className="btn-container" key={index} onClick={() => setMainProducts(category)}>
            <button
              type="button"
              // highlight class  for highlight main category
              className={`filter-btn ${category === mainCategory ? 'highlight' : ''}`}
            >
              {category}
            </button>
          </div>
          ))}
        </div>
      </section>
      <div className="section-center">
       {useMemo(()=> {
        return mainDatas.length && mainDatas.map(data => (
          <Menu key={data.id} {...data} />
        ))
       },[mainDatas])}
      </div>
    </main>
  );
}

export default App;
