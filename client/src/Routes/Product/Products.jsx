import React from "react";
import style from './Products.module.css'
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        getProducts();
    }, [])
    async function getProducts() {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
        console.log(result);
    }

    return (
        <>
            <div id={style.product}>
                <div id={style.productList}>
                    <div className={style.heading}>
                        <button className={style.backbtn} onClick={() => navigate('/')} ><IoIosArrowBack /> back</button>
                        <h1 className={style.title}>Products List</h1>
                    </div>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Company Name</th>
                                <th colSpan={2}>Description</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td>{item.company}</td>
                                        <td colSpan={2}>{item.desc}</td>
                                        <td>{item.rating}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className={style.noProducts}>
                                        No Products Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

        </>
    )
}
export default Products;