// function ProductUI({ filteredProducts, onAddToCart }) {
//     return (
//         <div>
//             <ul>
//                 {filteredProducts.map((product) => (
//                     <li key={product.id}>
//                         {product.name} - ${product.price.toFixed(2)}
//                         <button onClick={() => onAddToCart(product.id)}>
//                             add to cart
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// function CartUI({ receivedProduct }) {
//     return (
//         <div>
//             <ul>
//                 {receivedProduct.map((product) => (
//                     <li key={product.id}>
//                         {product.name}
//                         {product.price.toFixed(2)}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// // function Search({ searchedProduct }) {
// //     const [searchedProductOne, setSearchedProductOne] = useState("");

// //     return (
// //         <div>
// //             <input
// //                 type="text"
// //                 value={searchedProductOne}
// //                 onChange={(e) => setSearchedProductOne(e.target.value)}
// //                 className="border mt-2"
// //             />
// //             <button onClick={() => searchedProduct(searchedProductOne)}>
// //                 search
// //             </button>
// //         </div>
// //     );
// // }

// export default function App() {
//     const [visibleProducts, setVisibleProducts] = useState(ALL_PRODUCTS);
//     const [addedToCart, setAddedToCart] = useState([]);

//     function handleAddToCart(productId) {
//         setAddedToCart((prevCart) => {
//             const isProductInCart = prevCart.some(
//                 (product) => product.id === productId,
//             );

//             if (isProductInCart) {
//                 return prevCart;
//             }
//             const productToAdd = ALL_PRODUCTS.find(
//                 (product) => product.id === productId,
//             );

//             return [...prevCart, productToAdd];
//         });
//     }

//     function handleSearchedProduct(searchTerm) {
//         if (!searchTerm.trim()) {
//             setVisibleProducts(ALL_PRODUCTS);
//             return;
//         }

//         const filtered = ALL_PRODUCTS.filter((product) =>
//             product.name.toLowerCase().includes(searchTerm.toLowerCase()),
//         );

//         setVisibleProducts(filtered);
//     }

//     return (
//         <div>
//             {/* Pass the visibleProducts to ProductUI */}
//             <ProductUI
//                 filteredProducts={visibleProducts}
//                 onAddToCart={handleAddToCart}
//             />
//             <CartUI receivedProduct={addedToCart} />
//             <Search searchedProduct={handleSearchedProduct} />
//         </div>
//     );
// }
