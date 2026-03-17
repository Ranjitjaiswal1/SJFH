import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const slides = [
    {
        img: "/bannner.jpeg",
        title: "Premium MDF Furniture",
        subtitle: "For Your Dream Home",
        desc: "Handcrafted quality furniture at the best prices in Bihar"
    },
    {
        img: "/sofa.jpeg",
        title: "Luxury Sofa Sets",
        subtitle: "Comfort Meets Style",
        desc: "Premium fabric sofas crafted for your living room"
    },
    {
        img: "/bed.jpeg",
        title: "Designer Beds",
        subtitle: "Sleep in Elegance",
        desc: "King & queen size beds with premium MDF finish"
    },
    {
        img: "/doublesofa.jpeg",
        title: "Double Sofa Collection",
        subtitle: "Perfect for Every Space",
        desc: "Stylish and durable sofas for every home"
    },
]

export default function Hero() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const slide = slides[current]

    return (
        <div className="hero">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className="hero-bg"
                    style={{ backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 100%), url('${slide.img}')` }}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            <div className="hero-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current + "-text"}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.h1>
                            {slide.title}<br />
                            <span>{slide.subtitle}</span>
                        </motion.h1>
                        <motion.p>{slide.desc}</motion.p>
                        <div className="hero-buttons">
                            <motion.a
                                href="#products"
                                className="btn-primary"
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Explore Products
                            </motion.a>
                            <motion.a
                                href="https://wa.me/919102163272"
                                className="btn-outline"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                💬 Chat on WhatsApp
                            </motion.a>
                        </div>
                        <motion.p
                            className="hero-customize-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            📐 Contact us for <strong>customize furniture</strong> as per your design & size
                        </motion.p>
                    </motion.div>
                </AnimatePresence>
            </div>

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

            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >↓</motion.div>
        </div>
    )
}
