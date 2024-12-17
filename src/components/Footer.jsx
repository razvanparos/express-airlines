function Footer() {
    return (
      <footer className="bg-darkBlue static bottom-0 w-full text-white py-12 flex px-4 lg:px-[10%] justify-center max-h-[100px]">
        <a className="text-xs md:text-sm cursor-pointer" href="https://razvanparos.vercel.app/" target="_blank">&#169; Airline Express Ltd {new Date().getFullYear()} by Razvan Paros &#x1F517;</a>
      </footer>
    );
  }
  
  export default Footer;