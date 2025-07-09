import React, { useEffect, useState } from "react";

const ALL_PRODUCTS = [
    { id: 1, name: "Apple", price: 1.0 },
    { id: 2, name: "Banana", price: 0.5 },
    { id: 3, name: "Orange", price: 0.75 },
    { id: 4, name: "Grapes", price: 2.5 },
    { id: 5, name: "Pineapple", price: 3.0 },
];

export default function App() {
    // State to hold products visible based on search filter
    const [visibleProducts, setVisibleProducts] = useState(ALL_PRODUCTS);
    // State for the shopping cart, initialized from localStorage
    const [cart, setCart] = useState(() => {
        const getCart = localStorage.getItem("cart");
        return getCart ? JSON.parse(getCart) : [];
    });
    // State for the search input
    const [search, setSearch] = useState("");

    // Effect to persist cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); // Dependency array ensures this runs only when 'cart' changes

    // Function to add a product to the cart
    function handleToCart(productId) {
        const productToCart = ALL_PRODUCTS.find(
            (product) => product.id === productId,
        );

        setCart((prevCart) => {
            // Check if the product is already in the cart to prevent duplicates
            const isInCart = prevCart.some(
                (product) => product.id === productId,
            );

            if (isInCart) {
                return prevCart; // If already in cart, return previous state
            }

            // Add the new product to the cart
            const updatedCart = [...prevCart, productToCart];
            return updatedCart;
        });
    }

    // Effect to filter products based on search input
    useEffect(() => {
        const searchedProduct = ALL_PRODUCTS.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase()),
        );
        setVisibleProducts(searchedProduct);
    }, [search]); // Dependency array ensures this runs when 'search' changes

    // Function to remove a product from the cart
    function handleRemoveCart(productId) {
        const filtered = cart.filter(
            (productInCart) => productInCart.id !== productId,
        );
        setCart(filtered);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8 font-sans flex flex-col items-center">
            {/* Page Title */}
            <span className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-6 sm:mb-10 text-center drop-shadow-lg">
                Habesha, buy here!
            </span>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search products..."
                className="w-full max-w-md p-3 mb-8 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Main content area: Products and Cart */}
            <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
                {/* Our Products Section */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <span className="text-2xl font-semibold text-gray-800 mb-4 block">
                        Our Products
                    </span>
                    {visibleProducts.length !== 0 ? (
                        <ul className="space-y-4">
                            {visibleProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-100 transition-all duration-200"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                        <span className="text-lg font-medium text-gray-900">
                                            {product.name}
                                        </span>
                                        <span className="text-md text-gray-600">
                                            ETB {product.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleToCart(product.id);
                                        }}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-200 text-sm font-semibold shadow-md"
                                    >
                                        Add to cart
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 text-lg py-8">
                            No products found matching your search.
                        </p>
                    )}
                </div>

                {/* Your Cart Section */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <span className="text-2xl font-semibold text-gray-800 mb-4 block">
                        Your Cart
                    </span>
                    {cart.length > 0 ? (
                        <ul className="space-y-4">
                            {cart.map((product) => (
                                <li
                                    key={product.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                        <span className="text-lg font-medium text-gray-900">
                                            {product.name}
                                        </span>
                                        <span className="text-md text-gray-600">
                                            ETB {product.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemoveCart(product.id)
                                        }
                                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-200 text-sm font-bold shadow-md"
                                        aria-label={`Remove ${product.name} from cart`}
                                    >
                                        &times;
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 text-lg py-8">
                            Your cart is empty.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
