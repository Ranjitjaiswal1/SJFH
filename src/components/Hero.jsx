import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

const slides = [
    { img: "/bannner.jpeg" },
    { img: "/sofa.jpeg" },
    { img: "/bed.jpeg" },
    { img: "/doublesofa.jpeg" },
]

export default function Hero() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)
    const touchStartX = useRef(null)
    const mouseStartX = useRef(null)
    const isDragging = useRef(false)

    useEffect(() => {
        const timer = setInterval(() => goNext(), 4500)
        return () => clearInterval(timer)
    }, [current])

    const goNext = () => {
        setDirection(1)
        setCurrent(prev => (prev + 1) % slides.length)
    }

    const goPrev = () => {
        setDirection(-1)
        setCurrent(prev => (prev - 1 + slides.length) % slides.length)
    }

    const goTo = (i) => {
        setDirection(i > current ? 1 : -1)
        setCurrent(i)
    }

    // Touch handlers
    const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
    const onTouchEnd = (e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
        touchStartX.current = null
    }

    // Mouse drag handlers
    const onMouseDown = (e) => { mouseStartX.current = e.clientX; isDragging.current = true }
    const onMouseUp = (e) => {
        if (!isDragging.current) return
        const diff = mouseStartX.current - e.clientX
        if (Math.abs(diff) > 60) diff > 0 ? goNext() : goPrev()
        isDragging.current = false
        mouseStartX.current = null
    }
    const onMouseLeave = () => { isDragging.current = false }

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    }

    return (
        <div
            className="hero"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            style={{ userSelect: "none", cursor: "grab" }}
        >
            {/* Background slider */}
            <AnimatePresence custom={direction} mode="wait">
                <motion.div
                    key={current}
                    className="hero-bg"
                    style={{ backgroundImage: `url('${slides[current].img}')` }}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.7, ease: "easeInOut" }}
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
                    <motion.a href="#products" className="btn-primary" onMouseDown={e => e.stopPropagation()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        View Products
                    </motion.a>
                    <motion.a href="https://wa.me/919102163272" className="btn-outline" target="_blank" rel="noreferrer" onMouseDown={e => e.stopPropagation()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        💬 WhatsApp Us
                    </motion.a>
                </motion.div>

                <motion.p
                    className="hero-customize-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    📐 Contact us for <strong>customize furniture</strong> as per your design & size
                </motion.p>
            </motion.div>

            {/* Arrows */}
            <button className="hero-arrow left" onMouseDown={e => e.stopPropagation()} onClick={goPrev}>‹</button>
            <button className="hero-arrow right" onMouseDown={e => e.stopPropagation()} onClick={goNext}>›</button>

            {/* Dots */}
            <div className="hero-dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`hero-dot ${i === current ? "active" : ""}`}
                        onMouseDown={e => e.stopPropagation()}
                        onClick={() => goTo(i)}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>

            <motion.div className="scroll-indicator" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>↓</motion.div>
        </div>
    )
}
