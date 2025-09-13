import { FaPlay } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[99.2vw] aspect-video pt-[10%] px-8 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold w-1/4">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div className="flex">
        <button className="bg-white text-black py-2 px-16 text-lg rounded-md w-auto mr-4 flex align-baseline justify-center gap-[1rem] cursor-pointer hover:bg-opacity-80">
          <FaPlay className="mt-1" />
          Play
        </button>

        <button className="bg-gray-500/50 text-white py-2 px-16 text-lg rounded-md w-auto flex align-baseline  justify-center gap-[1rem] cursor-pointer hover:bg-opacity-80">
          <IoIosInformationCircleOutline className="mt-1" />
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
