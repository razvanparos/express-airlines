import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
      <article className="bg-white flex flex-col items-center py-[120px] gap-y-4">
        <h1 className="text-7xl font-bold text-darkBlue">404</h1>
        <p className="text-2xl font-semibold text-primaryBlue">Page not found</p>
        <Link to={'/'} className=" bg-primaryBlue rounded-xl p-2 px-4 md:text-xl text-white">Return home</Link>
      </article>
    );
  }
  
  export default NotFoundPage;