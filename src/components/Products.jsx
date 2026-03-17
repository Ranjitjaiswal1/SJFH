import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const products = [
    { name: "Modern MDF Bed", price: "₹25,000", img: "/bed.jpeg", desc: "Elegant king-size bed with premium MDF finish" },
    { name: "Luxury Sofa Set", price: "₹30,000", img: "/sofa.jpeg", desc: "Comfortable 3-seater sofa with premium fabric" },
    { name: "Double Sofa", price: "₹18,000", img: "/doublesofa.jpeg", desc: "Stylish double sofa perfect for living rooms" },
    { name: "Bed with Headboard", price: "₹22,000", img: "/bed head.jpeg", desc: "Designer bed with cushioned headboard" },
    { name: "Sofa Double Set", price: "₹28,000", img: "/sofa double.jpeg", desc: "Premium double sofa set for large spaces" },
]

export default function Products() {
    const [lightbox, setLightbox] = useState(null)

    return (
        <section id="products" className="products">
            <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>Our Furniture Collection</h2>
                <p>Quality MDF furniture crafted with precision and care</p>
                <div className="underline"></div>
            </motion.div>

            <div className="products-grid">
                {products.map((p, i) => (
                    <motion.div
                        key={i}
                        className="product-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.18)" }}
                    >
                        <div className="product-img-wrap" onClick={() => setLightbox(p)}>
                            <motion.img
                                src={p.img}
                                alt={p.name}
                                whileHover={{ scale: 1.07 }}
                                transition={{ duration: 0.4 }}
                            />
                            <div className="img-overlay">🔍 View</div>
                        </div>
                        <div className="product-info">
                            <h3>{p.name}</h3>
                            <p style={{ color: '#777', fontSize: '0.88rem', marginBottom: '8px' }}>{p.desc}</p>
                            <div className="product-price">{p.price}</div>
                            <motion.a
                                href={`https://wa.me/919102163272?text=Hi, I'm interested in ${p.name} (${p.price})`}
                                className="btn-whatsapp"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🛒 Order on WhatsApp
                            </motion.a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                            <img src={lightbox.img} alt={lightbox.name} />
                            <div className="lightbox-info">
                                <h3>{lightbox.name}</h3>
                                <p>{lightbox.desc}</p>
                                <span className="product-price">{lightbox.price}</span>
                                <a
                                    href={`https://wa.me/919102163272?text=Hi, I'm interested in ${lightbox.name} (${lightbox.price})`}
                                    className="btn-whatsapp"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ marginTop: '12px', display: 'inline-block' }}
                                >
                                    🛒 Order on WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
