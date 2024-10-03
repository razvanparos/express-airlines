import { ring2 } from 'ldrs'

ring2.register()

function Loader() {
  return (
    <div className="App">
    <l-ring-2
        size="18"
        stroke="3"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8" 
        color="white" 
    ></l-ring-2>
    </div>
  );
}

export default Loader;
