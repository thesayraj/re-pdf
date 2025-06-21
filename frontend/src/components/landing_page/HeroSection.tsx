import { FaChevronRight } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center min-w-screen">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-4xl font-bold text-black mb-4">
          We help with your PDF tasks
        </h1>
        <p className="text-xl md:text-2xl text-blue-500 mb-8">
          Easy, pleasant and productive PDF editor
        </p>
        <button className="cursor-pointer bg-blue-600 text-white text-lg md:text-xl px-6 py-3 rounded-lg
         hover:bg-green-600 active:bg-green-600 transition duration-300">
          <span className="font-bold">Edit a PDF document</span>
          <span className="font-light">
            &nbsp;– it's free
            <FaChevronRight className="inline-block ml-4" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
