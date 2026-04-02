import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem('wishlist')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [wishlist])

    const toggle = (product) => {
        setWishlist(prev =>
            prev.find(i => i._id === product._id)
                ? prev.filter(i => i._id !== product._id)
                : [...prev, product]
        )
    }

    const isWishlisted = (id) => wishlist.some(i => i._id === id)

    return (
        <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => useContext(WishlistContext)
