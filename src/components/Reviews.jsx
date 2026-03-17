import { motion } from "framer-motion"

const reviews = [
    { name: "Rahul Singh", location: "Motihari", text: "Excellent quality furniture at very reasonable prices. The bed I ordered looks amazing in my room!", stars: 5 },
    { name: "Priya Sharma", location: "Patna", text: "Very happy with my sofa set. Delivery was on time and the finish is top-notch. Highly recommended!", stars: 5 },
    { name: "Amit Kumar", location: "Ghorasahan", text: "Great craftsmanship. The MDF work is very clean and durable. Will definitely order again.", stars: 5 },
    { name: "Sunita Devi", location: "Raxaul", text: "Ordered a double bed and sofa. Both are beautiful. The owner is very helpful and cooperative.", stars: 5 },
]

export default function Reviews() {
    return (
        <section id="reviews" className="reviews">
            <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>What Our Customers Say</h2>
                <p>Trusted by hundreds of happy families across Bihar</p>
                <div className="underline"></div>
            </motion.div>

            <div className="reviews-grid">
                {reviews.map((r, i) => (
                    <motion.div
                        key={i}
                        className="review-card"
                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" }}
                    >
                        <motion.div
                            className="review-stars"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 200 }}
                            viewport={{ once: true }}
                        >
                            {"★".repeat(r.stars)}
                        </motion.div>
                        <p>"{r.text}"</p>
                        <span className="reviewer">— {r.name}, {r.location}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
