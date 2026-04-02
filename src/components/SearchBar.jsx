import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const allProducts = [
    { name: "Modern MDF Bed", img: "/bed.jpeg", price: "₹25,000", category: "Bed" },
    { name: "Luxury Sofa Set", img: "/sofa.jpeg", price: "₹30,000", category: "Sofa" },
    { name: "Double Sofa", img: "/doublesofa.jpeg", price: "₹18,000", category: "Sofa" },
    { name: "Bed with Headboard", img: "/bed head.jpeg", price: "₹22,000", category: "Bed" },
    { name: "Sofa Double Set", img: "/sofa double.jpeg", price: "₹28,000", category: "Sofa" },
    { name: "MDF Almirah", img: "/almari.jpeg", price: "₹20,000", category: "Almirah" },
    { name: "Designer Almirah", img: "/almari1.jpeg", price: "₹22,000", category: "Almirah" },
    { name: "Premium Wardrobe", img: "/almari2.jpeg", price: "₹26,000", category: "Almirah" },
]

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    const results = query.length > 1
        ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
        : []

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="search-wrap" ref={ref}>
            <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search furniture..."
                    value={query}
                    onChange={e => { setQuery(e.target.value); setOpen(true) }}
                    onFocus={() => setOpen(true)}
                    className="search-input"
                />
                {query && <button className="search-clear" onClick={() => { setQuery(''); setOpen(false) }}>✕</button>}
            </div>

            <AnimatePresence>
                {open && results.length > 0 && (
                    <motion.div
                        className="search-dropdown"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {results.map((p, i) => (
                            <a
                                key={i}
                                href="#products"
                                className="search-result-item"
                                onClick={() => { setQuery(''); setOpen(false) }}
                            >
                                <img src={p.img} alt={p.name} />
                                <div>
                                    <p>{p.name}</p>
                                    <span>{p.category} · {p.price}</span>
                                </div>
                            </a>
                        ))}
                    </motion.div>
                )}
                {open && query.length > 1 && results.length === 0 && (
                    <motion.div className="search-dropdown"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className="search-no-result">No results for "{query}"</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
