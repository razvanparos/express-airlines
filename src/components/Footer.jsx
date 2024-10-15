function Footer() {
    return (
      <footer className="bg-darkBlue static bottom-0 w-full text-white px-4 py-12 flex flex-col gap-y-6">
        <ul className="flex flex-col gap-y-4 font-semibold text-sm">
          <li>Help</li>
          <li>Privacy Settings</li>
          <li>Log in</li>
          <li>Cookie policy</li>
          <li>Terms of service</li>
          <li>Company details</li>
        </ul>
        <p className="text-xs">&#169; Airline Express Ltd {new Date().getFullYear()} by Razvan Paros</p>
      </footer>
    );
  }
  
  export default Footer;