// Allow side-effect SCSS imports (e.g. import '@/styles/globals.scss')
declare module '*.scss' {
  const styles: { readonly [key: string]: string }
  export default styles
}

