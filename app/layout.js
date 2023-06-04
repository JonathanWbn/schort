import '../css/index.css'

import { PT_Sans_Caption } from "next/font/google"

const caption = PT_Sans_Caption({ weight: ['400', '700'], subsets: ['latin'] })

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={caption.className}>
      <body className="bg-white">{children}</body>
    </html>
  )
}
