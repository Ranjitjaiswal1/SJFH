import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

function CountUp({ target, duration = 1800 }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true
                let start = 0
                const step = target / (duration / 16)
                const timer = setInterval(() => {
                    start += step
                    if (start >= target) { setCount(target); clearInterval(timer) }
                    else setCount(Math.floor(start))
                }, 16)
            }
        })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, duration])

    return <span ref={ref}>{count}</span>
}

const stats = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Happy Customers" },
    { value: 50, suffix: "+", label: "Furniture Designs" },
    { value: 100, suffix: "%", label: "Satisfaction" },
]

export default function CounterStrip() {
    return (
        <section className="counter-strip">
            {stats.map((s, i) => (
                <motion.div
                    key={i}
                    className="counter-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.06 }}
                >
                    <h3><CountUp target={s.value} />{s.suffix}</h3>
                    <p>{s.label}</p>
                </motion.div>
            ))}
        </section>
    )
}
