import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useCart } from "../context/CartContext"

const products = [
    { name: "Modern MDF Bed", price: "₹25,000", img: "/bed.jpeg", desc: "Elegant king-size bed with premium MDF finish", category: "Bed" },
    { name: "Luxury Sofa Set", price: "₹30,000", img: "/sofa.jpeg", desc: "Comfortable 3-seater sofa with premium fabric", category: "Sofa" },
    { name: "Double Sofa", price: "₹18,000", img: "/doublesofa.jpeg", desc: "Stylish double sofa perfect for living rooms", category: "Sofa" },
    { name: "Bed with Headboard", price: "₹22,000", img: "/bed head.jpeg", desc: "Designer bed with cushioned headboard", category: "Bed" },
    { name: "Sofa Double Set", price: "₹28,000", img: "/sofa double.jpeg", desc: "Premium double sofa set for large spaces", category: "Sofa" },
    { name: "MDF Almirah", price: "₹20,000", img: "/almari.jpeg", desc: "Spacious wardrobe with smooth MDF finish", category: "Almirah" },
    { name: "Designer Almirah", price: "₹22,000", img: "/almari1.jpeg", desc: "Elegant almirah with mirror and storage", category: "Almirah" },
    { name: "Premium Wardrobe", price: "₹26,000", img: "/almari2.jpeg", desc: "Large premium wardrobe for bedroom storage", category: "Almirah" },
]

const categories = ["All", "Bed", "Sofa", "Almirah"]

export default function Products() {
    const [lightbox, setLightbox] = useState(null)
    const [activeCategory, setActiveCategory] = useState("All")
    const [toast, setToast] = useState("")
    const { addToCart } = useCart()

    const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory)

    const handleAddToCart = (p) => {
        addToCart({ _id: p.name, name: p.name, price: parseInt(p.price.replace(/[₹,]/g, '')), images: [p.img] })
        setToast(`✅ ${p.name} added to cart!`)
        setTimeout(() => setToast(""), 2500)
    }

    return (
        <section id="products" className="products">
            <motion.div className="section-title"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h2>Our Furniture Collection</h2>
                <p>Quality MDF furniture crafted with precision and care</p>
                <div className="underline"></div>
            </motion.div>

            {/* Category Filter */}
            <div className="category-filter">
                {categories.map(cat => (
                    <motion.button key={cat}
                        className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {cat}
                    </motion.button>
                ))}
            </div>

            <div className="products-grid">
                <AnimatePresence>
                    {filtered.map((p, i) => (
                        <motion.div key={p.name} className="product-card"
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
                            <div className="product-img-wrap" onClick={() => setLightbox(p)}>
                                <motion.img src={p.img} alt={p.name} whileHover={{ scale: 1.07 }} transition={{ duration: 0.4 }} />
                                <div className="img-overlay">🔍 View</div>
                                <span className="product-category-tag">{p.category}</span>
                            </div>
                            <div className="product-info">
                                <h3>{p.name}</h3>
                                <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '10px' }}>{p.desc}</p>
                                <div className="product-price">{p.price}</div>
                                <div className="product-actions">
                                    <motion.button className="btn-addcart"
                                        onClick={() => handleAddToCart(p)}
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        🛒 Add to Cart
                                    </motion.button>
                                    <motion.a
                                        href={`https://wa.me/919102163272?text=Hi, I'm interested in ${p.name} (${p.price})`}
                                        className="btn-whatsapp" target="_blank" rel="noreferrer"
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        WhatsApp
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div className="toast"
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}>
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div className="lightbox-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}>
                        <motion.div className="lightbox-content"
                            initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            onClick={e => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                            <img src={lightbox.img} alt={lightbox.name} />
                            <div className="lightbox-info">
                                <h3>{lightbox.name}</h3>
                                <p>{lightbox.desc}</p>
                                <span className="product-price">{lightbox.price}</span>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                                    <button className="btn-addcart" onClick={() => { handleAddToCart(lightbox); setLightbox(null) }}>
                                        🛒 Add to Cart
                                    </button>
                                    <a href={`https://wa.me/919102163272?text=Hi, I'm interested in ${lightbox.name} (${lightbox.price})`}
                                        className="btn-whatsapp" target="_blank" rel="noreferrer">
                                        WhatsApp Order
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
