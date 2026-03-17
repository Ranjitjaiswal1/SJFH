import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const images = [
    "/WhatsApp Image 2026-03-17 at 8.06.21 PM.jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.21 PM (1).jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.22 PM.jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.22 PM (1).jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.22 PM (2).jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.23 PM.jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.23 PM (1).jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.24 PM.jpeg",
    "/WhatsApp Image 2026-03-17 at 8.06.24 PM (1).jpeg",
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
                <p>Real furniture delivered to real homes</p>
                <div className="underline"></div>
            </motion.div>

            <div className="gallery-grid">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        className="gallery-item"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, delay: i * 0.07 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.04, zIndex: 2 }}
                        onClick={() => setSelected(img)}
                    >
                        <img src={img} alt={`Gallery ${i + 1}`} />
                        <div className="gallery-overlay">🔍</div>
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
                            alt="Gallery full"
                            className="lightbox-full-img"
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
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
