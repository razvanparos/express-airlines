import Loader from "./Loader";

function FallbackComponent() {
    return (
      <section className="flex justify-center items-center pt-10">
        <Loader/>
      </section>
    );
  }
  
  export default FallbackComponent;