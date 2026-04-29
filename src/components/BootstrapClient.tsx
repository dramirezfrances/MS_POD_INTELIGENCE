'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
  useEffect(() => {
    // Import Bootstrap ES module and expose as window.bootstrap so that
    // data-bs-* attribute-driven components (tooltips, popovers, etc.) work.
    // Webpack bundles the UMD file as a module and skips the window assignment,
    // so we do it explicitly here.
    import('bootstrap').then((bs) => {
      // Expose bootstrap namespace globally for data-bs-* attribute components
      (window as Window & { bootstrap?: unknown }).bootstrap = bs
    })
  }, [])

  return null
}
