import Image from 'next/image'

type LogoVariant = 'dark' | 'light'
type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

interface LogoProps {
  variant?: LogoVariant
  size?: LogoSize
  /** @deprecated showMark is no longer used with the image-based logo */
  showMark?: boolean
}

// Rendered widths per size (height auto-scales from the aspect ratio)
const SIZE_WIDTH: Record<LogoSize, number> = {
  sm: 100,
  md: 130,
  lg: 170,
  xl: 220,
}

export function Logo({
  variant = 'dark',
  size = 'md',
}: LogoProps) {
  const width = SIZE_WIDTH[size]
  // Height derived from original image ratio (1516 × 768 ≈ 1.97 : 1)
  const height = Math.round(width / 1.97)

  // Dark variant → black wordmark on transparent bg (used on light surfaces)
  // Light variant → white wordmark on transparent bg (used on navy/dark surfaces)
  // CSS technique: invert(1) turns black→white; mix-blend-mode: screen
  // makes the white JPEG background invisible against any dark bg.
  const imgStyle: React.CSSProperties =
    variant === 'light'
      ? { filter: 'invert(1)', mixBlendMode: 'screen' }
      : {}

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none',
        flexShrink: 0,
      }}
      aria-label="Morgan Stanley"
    >
      <Image
        src="/ms-logo.jpg"
        alt="Morgan Stanley"
        width={width}
        height={height}
        style={{ display: 'block', ...imgStyle }}
        priority
        unoptimized
      />
    </span>
  )
}
