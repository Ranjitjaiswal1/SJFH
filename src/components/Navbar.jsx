import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const handleNav = () => setOpen(false)

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } })
    }

    const links = [
        { label: "Home", href: "#" },
        { label: "Products", href: "#products" },
        { label: "Gallery", href: "#gallery" },
        { label: "Why Us", href: "#whyus" },
        { label: "Reviews", href: "#reviews" },
        { label: "Contact", href: "#contact" },
    ]

    return (
        <motion.nav
            className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <motion.a
                href="#"
                className="navbar-brand"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <img src="/logo.jpeg" alt="Shree Jaiswal Furniture House" className="navbar-logo" />
            </motion.a>

            <div className={`navbar-links ${open ? "open" : ""}`}>
                {links.map((link, i) => (
                    <motion.a
                        key={i}
                        href={link.href}
                        onClick={handleNav}
                        custom={i}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ color: "#f5c842", scale: 1.05 }}
                    >
                        {link.label}
                    </motion.a>
                ))}
            </div>

            <button
                className="hamburger"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
            >
                <span className={open ? "bar rotate1" : "bar"}></span>
                <span className={open ? "bar hide" : "bar"}></span>
                <span className={open ? "bar rotate2" : "bar"}></span>
            </button>
        </motion.nav>
    )
}
