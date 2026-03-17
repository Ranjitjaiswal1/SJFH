import { motion } from "framer-motion"

export default function AnnouncementBar() {
    return (
        <motion.div
            className="announcement-bar"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            🎉 Special Offer: Get <strong>10% OFF</strong> on all orders above ₹20,000 — Call now: <a href="tel:+919102163272">+91 9102163272</a>
        </motion.div>
    )
}
