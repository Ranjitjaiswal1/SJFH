import { motion } from "framer-motion"

const items = [
    "🪑 Premium MDF Furniture",
    "🛏️ Custom Beds & Wardrobes",
    "🛋️ Luxury Sofa Sets",
    "🚚 Free Local Delivery",
    "📐 Custom Size Orders",
    "⭐ 500+ Happy Customers",
    "🔧 After-Sales Support",
    "💰 Best Price Guarantee",
]

export default function Marquee() {
    const text = [...items, ...items]
    return (
        <div className="marquee-wrapper">
            <motion.div
                className="marquee-track"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
                {text.map((item, i) => (
                    <span key={i} className="marquee-item">{item}</span>
                ))}
            </motion.div>
        </div>
    )
}
