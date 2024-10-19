function Footer() {
    return (
      <footer className="bg-darkBlue static bottom-0 w-full text-white py-12 flex flex-col gap-y-6 px-4 lg:px-[10%]">
        <ul className="grid grid-cols-2 gap-y-4 font-semibold text-sm [&_*]:cursor-pointer lg:grid-cols-3 [&_*]:w-fit hover:[&_*]:underline">
          <li>Help</li>
          <li>Cookie policy</li>
          <li>Explore</li>
          <li>Log in</li>
          <li>Privacy Settings</li>  
          <li>Privacy policy</li>
          <li>Terms of service</li>
          <li>Company details</li>
          <li>Partners</li>
          <li>Trips</li>
          <li>International sites</li>
        </ul>
        <p className="text-xs">&#169; Airline Express Ltd {new Date().getFullYear()} by Razvan Paros</p>
      </footer>
    );
  }
  
  export default Footer;