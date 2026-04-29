import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    // Bootstrap 5.3.x uses legacy @import and global color functions that are
    // deprecated in Dart Sass 1.99. quietDeps suppresses these from node_modules.
    quietDeps: true,
  },
}

export default nextConfig
