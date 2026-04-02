import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"

const allProducts = [
    { _id: "p1", name: "Modern MDF Bed", price: 25000, img: "/bed.jpeg", category: "Bed", rating: 4.5, stock: 5, delivery: "3-5 days" },
    { _id: "p2", name: "Luxury Sofa Set", price: 30000, img: "/sofa.jpeg", category: "Sofa", rating: 4.8, stock: 3, delivery: "4-6 days" },
    { _id: "p3", name: "Double Sofa", price: 18000, img: "/doublesofa.jpeg", category: "Sofa", rating: 4.3, stock: 8, delivery: "3-5 days" },
    { _id: "p4", name: "Bed with Headboard", price: 22000, img: "/bed head.jpeg", category: "Bed", rating: 4.6, stock: 4, delivery: "4-6 days" },
    { _id: "p5", name: "Sofa Double Set", price: 28000, img: "/sofa double.jpeg", category: "Sofa", rating: 4.7, stock: 2, delivery: "5-7 days" },
    { _id: "p6", name: "MDF Almirah", price: 20000, img: "/almari.jpeg", category: "Almirah", rating: 4.4, stock: 6, delivery: "5-7 days" },
    { _id: "p7", name: "Designer Almirah", price: 22000, img: "/almari1.jpeg", category: "Almirah", rating: 4.5, stock: 0, delivery: "5-7 days" },
    { _id: "p8", name: "Premium Wardrobe", price: 26000, img: "/almari2.jpeg", category: "Almirah", rating: 4.9, stock: 3, delivery: "6-8 days" },
]

export default function Recommendations({ currentId, category, title = "You May Also Like" }) {
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [toast, setToast] = useState("")

    const recommended = allProducts
        .filter(p => p._id !== currentId && p.category === category)
        .slice(0, 4)

    if (recommended.length === 0) return null

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000) }

    return (
        <div className="recommendations">
            <h3 className="rec-title">💡 {title}</h3>
            <div className="rec-grid">
                {recommended.map((p, i) => (
                    <motion.div key={p._id} className="rec-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}>
                        <div className="rec-img" onClick={() => navigate(`/product/${p._id}`, { state: { product: p } })}>
                            <img src={p.img} alt={p.name} />
                        </div>
                        <div className="rec-info">
                            <p className="rec-name" onClick={() => navigate(`/product/${p._id}`, { state: { product: p } })}>{p.name}</p>
                            <p className="rec-price">₹{p.price.toLocaleString()}</p>
                            <div className="rec-stars">{"★".repeat(Math.floor(p.rating))}<span className="rating-num">{p.rating}</span></div>
                            <motion.button className={`btn-addcart rec-btn ${p.stock === 0 ? "disabled" : ""}`}
                                disabled={p.stock === 0}
                                onClick={() => { addToCart({ ...p, images: [p.img] }); showToast(`✅ ${p.name} added!`) }}
                                whileHover={p.stock > 0 ? { scale: 1.04 } : {}}>
                                {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
            {toast && <div className="toast" style={{ position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)' }}>{toast}</div>}
        </div>
    )
}
