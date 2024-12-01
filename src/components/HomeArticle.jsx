import exploreDestinations from '../assets/explore-destinations.webp'
import beachImg from '../assets/beach-img.jpg'
function HomeArticle() {
  return (
    <article className="flex flex-col items-start my-2 p-4 2xl:py-16 bg-white w-full h-fit lg:px-[10%]">
          <div className="w-full font-semibold text-xl">
            <h2 className="text-gray-500">Can't decide where to go?</h2>
            <p className="text-primaryBlue md:text-3xl">Travel to any destination around the globe with Airline Express!</p>
          </div>
          <div className="flex flex-col justify-between gap-[12px] h-fit md:flex-row md:max-h-[400px]">
            <img src={beachImg} alt="" className="rounded-lg md:w-[50%]  object-cover object-bottom"/>
            <img src={exploreDestinations} alt="" className="rounded-lg md:w-[50%] object-cover object-bottom"/>
          </div>     
        </article>
  );
}

export default HomeArticle;
