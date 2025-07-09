import { useEffect, useState } from "react";

const ALL_PRODUCTS = [
    { id: 1, name: "Apple", price: 1.0 },
    { id: 2, name: "Banana", price: 0.5 },
    { id: 3, name: "Orange", price: 0.75 },
    { id: 4, name: "Grapes", price: 2.5 },
    { id: 5, name: "Pineapple", price: 3.0 },
];

export default function App() {
    const [visibleProducts, setVisibleProducts] = useState(ALL_PRODUCTS);
    const [cart, setCart] = useState(() => {
        const getCart = localStorage.getItem("cart");
        return getCart ? JSON.parse(getCart) : [];
    });
    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); // Dependency array ensures this runs only when 'cart' changes

    function handleToCart(productId) {
        const productToCart = ALL_PRODUCTS.find(
            (product) => product.id === productId,
        );

        setCart((prevCart) => {
            const isInCart = prevCart.some(
                (product) => product.id === productId,
            );

            if (isInCart) {
                return prevCart;
            }

            const updatedCart = [...prevCart, productToCart];
            return updatedCart;
        });
    }

    useEffect(() => {
        const searchedProduct = ALL_PRODUCTS.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase()),
        );
        setVisibleProducts(searchedProduct);
    }, [search]);

    function handleRemoveCart(productId) {
        const filtered = cart.filter(
            (productInCart) => productInCart.id !== productId,
        );
        setCart(filtered);
    }

    const [signup, setSignup] = useState(false);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("please enter password");

    return (
        <div>
            <span>Habesha buy here</span>
            <div>
                <input
                    type="text"
                    className="border m-12"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex justify-between ">
                    <div>
                        {visibleProducts.length !== 0 ? (
                            <ul>
                                {visibleProducts.map((product) => (
                                    <li
                                        key={product.id}
                                        className="grid grid-cols-3 gap-10 m-1"
                                    >
                                        <span>{product.name}</span>
                                        <span>{product.price}</span>
                                        <button
                                            onClick={() => {
                                                signup
                                                    ? handleToCart(product.id)
                                                    : false;
                                            }}
                                            className="bg-indigo-600 text-white px-1 "
                                        >
                                            to cart
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{"product not found"}</p>
                        )}
                    </div>

                    <ul>
                        {cart.map((product) => (
                            <li
                                key={product.id}
                                className="grid grid-cols-3 gap-10 m-1"
                            >
                                <span>{product.name}</span>
                                <span>{product.price}</span>
                                <button
                                    onClick={() => handleRemoveCart(product.id)}
                                    className="bg-amber-500 px-1 "
                                >
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
