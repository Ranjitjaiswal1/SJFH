import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsappButton'
import ScrollToTop from '../components/ScrollToTop'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const allProducts = [
    { _id: "p1", name: "Modern MDF Bed", price: 25000, originalPrice: 30000, img: "/bed.jpeg", desc: "Elegant king-size bed with premium MDF finish", category: "Bed", rating: 4.5, reviews: 28, stock: 5, delivery: "3-5 days" },
    { _id: "p2", name: "Luxury Sofa Set", price: 30000, originalPrice: 35000, img: "/sofa.jpeg", desc: "Comfortable 3-seater sofa with premium fabric", category: "Sofa", rating: 4.8, reviews: 42, stock: 3, delivery: "4-6 days" },
    { _id: "p3", name: "Double Sofa", price: 18000, originalPrice: 22000, img: "/doublesofa.jpeg", desc: "Stylish double sofa perfect for living rooms", category: "Sofa", rating: 4.3, reviews: 19, stock: 8, delivery: "3-5 days" },
    { _id: "p4", name: "Bed with Headboard", price: 22000, originalPrice: 26000, img: "/bed head.jpeg", desc: "Designer bed with cushioned headboard", category: "Bed", rating: 4.6, reviews: 31, stock: 4, delivery: "4-6 days" },
    { _id: "p5", name: "Sofa Double Set", price: 28000, originalPrice: 33000, img: "/sofa double.jpeg", desc: "Premium double sofa set for large spaces", category: "Sofa", rating: 4.7, reviews: 24, stock: 2, delivery: "5-7 days" },
    { _id: "p6", name: "MDF Almirah", price: 20000, originalPrice: 24000, img: "/almari.jpeg", desc: "Spacious wardrobe with smooth MDF finish", category: "Almirah", rating: 4.4, reviews: 16, stock: 6, delivery: "5-7 days" },
    { _id: "p7", name: "Designer Almirah", price: 22000, originalPrice: 27000, img: "/almari1.jpeg", desc: "Elegant almirah with mirror and storage", category: "Almirah", rating: 4.5, reviews: 12, stock: 0, delivery: "5-7 days" },
    { _id: "p8", name: "Premium Wardrobe", price: 26000, originalPrice: 31000, img: "/almari2.jpeg", desc: "Large premium wardrobe for bedroom storage", category: "Almirah", rating: 4.9, reviews: 8, stock: 3, delivery: "6-8 days" },
]

const categories = ["All", "Bed", "Sofa", "Almirah"]

function Stars({ rating }) {
    return (
        <div className="star-rating">
            {[1,2,3,4,5].map(s => (
                <span key={s} className={s <= Math.floor(rating) ? "star filled" : "star"}>★</span>
            ))}
            <span className="rating-num">{rating}</span>
        </div>
    )
}

export default function ShopPage() {
    const [category, setCategory] = useState("All")
    const [sort, setSort] = useState("default")
    const [priceRange, setPriceRange] = useState(35000)
    const [search, setSearch] = useState("")
    const [toast, setToast] = useState("")
    const { addToCart } = useCart()
    const { toggle, isWishlisted } = useWishlist()
    const navigate = useNavigate()

    let filtered = allProducts.filter(p => {
        const matchCat = category === "All" || p.category === category
        const matchPrice = p.price <= priceRange
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchPrice && matchSearch
    })

    if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price)
    else if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price)
    else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating)
    else if (sort === "discount") filtered = [...filtered].sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price))

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500) }

    const handleAdd = (p) => {
        if (p.stock === 0) return
        addToCart({ ...p, images: [p.img] })
        showToast(`✅ ${p.name} added to cart!`)
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="shop-page">
                    {/* Sidebar */}
                    <aside className="shop-sidebar">
                        <h3>Filters</h3>

                        <div className="filter-group">
                            <h4>Category</h4>
                            {categories.map(cat => (
                                <label key={cat} className="filter-radio">
                                    <input type="radio" name="category" checked={category === cat}
                                        onChange={() => setCategory(cat)} />
                                    {cat}
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h4>Price Range</h4>
                            <input type="range" min={5000} max={35000} step={1000}
                                value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
                                className="price-slider" />
                            <div className="price-range-labels">
                                <span>₹5,000</span>
                                <span className="price-val">₹{priceRange.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h4>Rating</h4>
                            {[4, 3, 2].map(r => (
                                <label key={r} className="filter-radio">
                                    <input type="radio" name="rating" onChange={() => {}} />
                                    {'★'.repeat(r)} & above
                                </label>
                            ))}
                        </div>

                        <button className="clear-filters-btn" onClick={() => { setCategory("All"); setPriceRange(35000); setSearch("") }}>
                            Clear All Filters
                        </button>
                    </aside>

                    {/* Main */}
                    <div className="shop-main">
                        {/* Top bar */}
                        <div className="shop-topbar">
                            <div className="shop-search">
                                <span>🔍</span>
                                <input type="text" placeholder="Search products..."
                                    value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                            <div className="shop-sort">
                                <span>Sort by:</span>
                                <select value={sort} onChange={e => setSort(e.target.value)}>
                                    <option value="default">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                    <option value="discount">Best Discount</option>
                                </select>
                            </div>
                        </div>

                        <p className="results-count">{filtered.length} products found</p>

                        <div className="shop-grid">
                            <AnimatePresence>
                                {filtered.map((p, i) => (
                                    <motion.div key={p._id} className="shop-card"
                                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }} transition={{ delay: i * 0.06 }}
                                        whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}>

                                        <div className="shop-card-img" onClick={() => navigate(`/product/${p._id}`, { state: { product: p } })}>
                                            <img src={p.img} alt={p.name} />
                                            {p.stock === 0 && <span className="out-of-stock-badge">Out of Stock</span>}
                                            {p.stock > 0 && p.stock <= 3 && <span className="low-stock-badge">Only {p.stock} left!</span>}
                                            {p.originalPrice && (
                                                <span className="discount-badge-img">
                                                    {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF
                                                </span>
                                            )}
                                        </div>

                                        <motion.button className={`wl-heart ${isWishlisted(p._id) ? "active" : ""}`}
                                            onClick={() => { toggle(p); showToast(isWishlisted(p._id) ? "💔 Removed from wishlist" : "❤️ Added to wishlist") }}
                                            whileHover={{ scale: 1.2 }}>
                                            {isWishlisted(p._id) ? "❤️" : "🤍"}
                                        </motion.button>

                                        <div className="shop-card-info">
                                            <span className="shop-cat-tag">{p.category}</span>
                                            <h4 onClick={() => navigate(`/product/${p._id}`, { state: { product: p } })}>{p.name}</h4>
                                            <Stars rating={p.rating} />
                                            <p className="shop-desc">{p.desc}</p>
                                            <div className="shop-price-row">
                                                <span className="shop-price">₹{p.price.toLocaleString()}</span>
                                                {p.originalPrice && <span className="shop-original">₹{p.originalPrice.toLocaleString()}</span>}
                                            </div>
                                            <p className="delivery-info">🚚 {p.delivery} delivery</p>
                                            <div className="shop-card-actions">
                                                <motion.button className={`btn-addcart ${p.stock === 0 ? "disabled" : ""}`}
                                                    onClick={() => handleAdd(p)} disabled={p.stock === 0}
                                                    whileHover={p.stock > 0 ? { scale: 1.04 } : {}}
                                                    whileTap={p.stock > 0 ? { scale: 0.96 } : {}}>
                                                    {p.stock === 0 ? "Out of Stock" : "🛒 Add to Cart"}
                                                </motion.button>
                                                <motion.button className="buy-now-btn"
                                                    onClick={() => { addToCart({ ...p, images: [p.img] }); navigate('/checkout') }}
                                                    disabled={p.stock === 0}
                                                    whileHover={{ scale: 1.04 }}>
                                                    ⚡ Buy Now
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {filtered.length === 0 && (
                                <div className="no-results">
                                    <p>😕 No products match your filters</p>
                                    <button onClick={() => { setCategory("All"); setPriceRange(35000); setSearch("") }}>
                                        Reset Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {toast && (
                    <motion.div className="toast"
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}>
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            <WhatsAppButton />
            <ScrollToTop />
        </>
    )
}
