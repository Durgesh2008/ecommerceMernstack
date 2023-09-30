/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'inter':['Inter','sans-serif'],
      'poppins':['Poppins','sans-serif'],
      'roboto':['Roboto','sans-serif']
  },
  backgroundImage:{
    'btn_bg':'linear-gradient(90deg, #EE6812 0%, #FBBA44 96.06%)',
    'btn_hover':' linear-gradient(180deg, rgba(131, 221, 230, 0.9) 100%, rgba(13, 124, 133, 0.9) 0%)',
    'header_image':"url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
  },


  boxShadow:{
    'btn__shadow':'box-shadow: 3px 4px 6px 0px #00000040',
   
  },
  },
  plugins: [],
}