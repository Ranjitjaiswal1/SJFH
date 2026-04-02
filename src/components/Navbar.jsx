import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import SearchBar from "./SearchBar"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [userMenu, setUserMenu] = useState(false)
    const { user, logout } = useAuth()
    const { count } = useCart()
    const { wishlist } = useWishlist()
    const navigate = useNavigate()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const links = [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "About", href: "/about" },
        { label: "Offers", href: "/offers" },
        { label: "Gallery", href: "/#gallery" },
        { label: "Contact", href: "/contact" },
    ]

    return (
        <motion.nav
            className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <Link to="/" className="navbar-brand">
                <img src="/logo.jpeg" alt="Logo" className="navbar-logo" />
            </Link>

            <SearchBar />

            <div className={`navbar-links ${open ? "open" : ""}`}>
                {links.map((link, i) => (
                    <motion.a key={i} href={link.href} onClick={() => setOpen(false)}
                        whileHover={{ color: "#f5c842" }}>
                        {link.label}
                    </motion.a>
                ))}
            </div>

            <div className="navbar-actions">
                {/* Wishlist */}
                <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
                    <span>🤍</span>
                    {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
                </Link>

                {/* Cart */}
                <Link to="/cart" className="nav-icon-btn" title="Cart">
                    <span>🛒</span>
                    {count > 0 && <span className="nav-badge">{count}</span>}
                </Link>

                {/* User */}
                {user ? (
                    <div className="user-dropdown-wrap">
                        <button className="user-btn" onClick={() => setUserMenu(!userMenu)}>
                            👤 {user.name.split(' ')[0]} ▾
                        </button>
                        <AnimatePresence>
                            {userMenu && (
                                <motion.div className="user-dropdown"
                                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                                    <Link to="/orders" onClick={() => setUserMenu(false)}>📦 My Orders</Link>
                                    <Link to="/wishlist" onClick={() => setUserMenu(false)}>❤️ Wishlist</Link>
                                    {user.role === 'admin' && <Link to="/admin" onClick={() => setUserMenu(false)}>⚙️ Admin Panel</Link>}
                                    <button onClick={() => { logout(); navigate('/'); setUserMenu(false) }}>🚪 Logout</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link to="/login" className="nav-login-btn">Login</Link>
                )}
            </div>

            <button className="hamburger" onClick={() => setOpen(!open)}>
                <span className={open ? "bar rotate1" : "bar"}></span>
                <span className={open ? "bar hide" : "bar"}></span>
                <span className={open ? "bar rotate2" : "bar"}></span>
            </button>
        </motion.nav>
    )
}
