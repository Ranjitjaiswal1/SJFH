import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const images = [
    { src: "/WhatsApp Image 2026-03-17 at 8.06.21 PM.jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.21 PM (1).jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.22 PM.jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.22 PM (1).jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.22 PM (2).jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.23 PM.jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.23 PM (1).jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.24 PM.jpeg", label: "Furniture" },
    { src: "/WhatsApp Image 2026-03-17 at 8.06.24 PM (1).jpeg", label: "Furniture" },
    { src: "/almari.jpeg", label: "Almirah" },
    { src: "/almari1.jpeg", label: "Almirah" },
    { src: "/almari2.jpeg", label: "Almirah" },
]

export default function Gallery() {
    const [selected, setSelected] = useState(null)

    return (
        <section id="gallery" className="gallery-section">
            <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>Our Work Gallery</h2>
                <p>Real furniture delivered to real homes across Bihar</p>
                <div className="underline" style={{ background: "#f5c842" }}></div>
            </motion.div>

            <div className="gallery-grid">
                {images.map((item, i) => (
                    <motion.div
                        key={i}
                        className="gallery-item"
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        viewport={{ once: true }}
                        onClick={() => setSelected(item.src)}
                    >
                        <img src={item.src} alt={item.label} />
                        <div className="gallery-overlay">
                            <span>🔍 {item.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.img
                            src={selected}
                            alt="Full view"
                            className="lightbox-full-img"
                            initial={{ scale: 0.75, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.75, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 22 }}
                            onClick={e => e.stopPropagation()}
                        />
                        <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
