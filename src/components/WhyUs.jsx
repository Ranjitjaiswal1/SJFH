import { motion } from "framer-motion"

const features = [
    { icon: "🪵", title: "Premium MDF Material", desc: "We use only high-grade MDF boards that are durable, moisture-resistant, and long-lasting." },
    { icon: "💰", title: "Best Price Guarantee", desc: "Get the best quality furniture at factory-direct prices. No middlemen, no hidden charges." },
    { icon: "🚚", title: "Free Local Delivery", desc: "Free delivery within Ghorasahan and nearby areas. We handle everything carefully." },
    { icon: "🔧", title: "Custom Orders", desc: "Want a specific size or design? We build custom furniture tailored to your exact needs." },
    { icon: "⭐", title: "Trusted Since 2015", desc: "Over a decade of crafting beautiful furniture for hundreds of families across Bihar." },
    { icon: "📞", title: "After-Sales Support", desc: "We don't disappear after the sale. Call us anytime for support, repairs, or queries." },
]

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
}

const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

export default function WhyUs() {
    return (
        <section id="whyus" className="whyus">
            <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>Why Choose Us?</h2>
                <p>Here's what makes Shree Jaiswal Furniture stand out</p>
                <div className="underline"></div>
            </motion.div>

            <motion.div
                className="whyus-grid"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        className="whyus-card"
                        variants={item}
                        whileHover={{ y: -8, borderColor: "#f5c842", boxShadow: "0 12px 30px rgba(0,0,0,0.1)" }}
                    >
                        <motion.div
                            className="whyus-icon"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }}
                        >
                            {f.icon}
                        </motion.div>
                        <h4>{f.title}</h4>
                        <p>{f.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
