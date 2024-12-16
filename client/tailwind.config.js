/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/preline/preline.js',
],
plugins: [
    require('preline/plugin'),
],
}