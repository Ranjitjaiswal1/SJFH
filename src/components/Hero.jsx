import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const slides = [
    { img: "/bannner.jpeg" },
    { img: "/sofa.jpeg" },
    { img: "/bed.jpeg" },
    { img: "/doublesofa.jpeg" },
]

export default function Hero() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length)
        }, 4500)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="hero">
            {/* Background slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className="hero-bg"
                    style={{ backgroundImage: `url('${slides[current].img}')` }}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                />
            </AnimatePresence>

            {/* Dark overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Shree Jaiswal <span>Furniture House</span>
                </motion.h1>

                <motion.p
                    className="hero-sub"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                >
                    Premium MDF Furniture — Beds, Sofas & Custom Designs<br />
                    Delivered across East Champaran, Bihar
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.a href="#products" className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        View Products
                    </motion.a>
                    <motion.a href="https://wa.me/919102163272" className="btn-outline" target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        💬 WhatsApp Us
                    </motion.a>
                </motion.div>

                <motion.p
                    className="hero-customize-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    📐 Contact us for <strong>customize furniture</strong> as per your design & size
                </motion.p>
            </motion.div>

            {/* Dots */}
            <div className="hero-dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`hero-dot ${i === current ? "active" : ""}`}
                        onClick={() => setCurrent(i)}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Arrows */}
            <button className="hero-arrow left" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>‹</button>
            <button className="hero-arrow right" onClick={() => setCurrent((current + 1) % slides.length)}>›</button>

            <motion.div className="scroll-indicator" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.div>
        </div>
    )
}
