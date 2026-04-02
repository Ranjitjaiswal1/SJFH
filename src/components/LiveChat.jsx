import { useEffect } from "react"

export default function LiveChat() {
    useEffect(() => {
        // Tawk.to live chat - free live chat widget
        // Replace 'YOUR_TAWK_ID' with your actual Tawk.to property ID from tawk.to
        var Tawk_API = window.Tawk_API || {}
        var Tawk_LoadStart = new Date()
        ;(function () {
            var s1 = document.createElement("script")
            var s0 = document.getElementsByTagName("script")[0]
            s1.async = true
            s1.src = "https://embed.tawk.to/YOUR_TAWK_ID/default"
            s1.charset = "UTF-8"
            s1.setAttribute("crossorigin", "*")
            s0.parentNode.insertBefore(s1, s0)
        })()
    }, [])

    return null
}
