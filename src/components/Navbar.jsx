import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { user, logout } = useAuth()
    const { count } = useCart()
    const navigate = useNavigate()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const handleNav = () => setOpen(false)

    const links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Products", href: "/#products" },
        { label: "Gallery", href: "/#gallery" },
        { label: "Contact", href: "/#contact" },
    ]

    return (
        <motion.nav
            className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <Link to="/" className="navbar-brand">
                <img src="/logo.jpeg" alt="Shree Jaiswal Furniture House" className="navbar-logo" />
            </Link>

            <div className={`navbar-links ${open ? "open" : ""}`}>
                {links.map((link, i) => (
                    <motion.a key={i} href={link.href} onClick={handleNav}
                        whileHover={{ color: "#f5c842" }}>
                        {link.label}
                    </motion.a>
                ))}
            </div>

            <div className="navbar-actions">
                <Link to="/cart" className="cart-icon" onClick={handleNav}>
                    🛒 {count > 0 && <span className="cart-badge">{count}</span>}
                </Link>
                {user ? (
                    <div className="user-menu">
                        <span className="user-name">👤 {user.name.split(' ')[0]}</span>
                        {user.role === 'admin' && <Link to="/admin" className="admin-link">Admin</Link>}
                        <Link to="/orders" className="nav-link-btn">Orders</Link>
                        <button onClick={() => { logout(); navigate('/') }} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="nav-login-btn">Login</Link>
                )}
            </div>

            <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                <span className={open ? "bar rotate1" : "bar"}></span>
                <span className={open ? "bar hide" : "bar"}></span>
                <span className={open ? "bar rotate2" : "bar"}></span>
            </button>
        </motion.nav>
    )
}
