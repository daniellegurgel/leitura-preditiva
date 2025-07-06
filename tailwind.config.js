/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Isso escaneia todos os seus arquivos JS/TS/JSX/TSX dentro de src
    // Adicione a linha abaixo se o seu CSS customizado tiver classes que não estão em JS/JSX
    "./src/*.css", // Isso garante que o Tailwind escaneie seu index.css ou outros arquivos CSS dentro de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
