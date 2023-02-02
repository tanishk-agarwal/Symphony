import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import "swiper/css";
import "swiper/css/free-mode";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const artistsrc = song.artists ? song.artists[0].adamid : "137057909";
  const imagesrc = song.images
    ? song.images.coverart
    : "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/0c/c3/27/0cc32710-9ab1-5a3e-968c-8001391538b7/artwork.jpg/400x400cc.jpg";

  return (
    <div
      className="w-full flex flex-row items-center 
  hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div
        className="flex-1 flex flex-row 
    jusitfy-between items-center"
      >
        <img
          className="w-20 h-20 rounded-lg"
          src={imagesrc}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${artistsrc}`}>
            <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  console.log(data);
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6
  flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div
          className="flex flex-row justify-between
    items-center"
        >
          <h2 className="text-white font-bold text-2x1">Top Charts </h2>
          <Link to="/top-charts">
            <p
              className="text-gray-300 text-base
          cursor-pointer"
            >
              See more
            </p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
      <div>
        <div
          className="flex flex-row justify-between
    items-center"
        >
          <h2 className="text-white font-bold text-2x1">Top Artists </h2>
          <Link to="/top-artists">
            <p
              className="text-gray-300 text-base
          cursor-pointer"
            >
              See more
            </p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full
            animate-slideright"
            >
              <Link
                to={`/artists/${
                  song.artists ? song.artists[0].adamid : "137057909"
                }`}
              >
                <img
                  src={
                    song.images
                      ? song.images.coverart
                      : "https://is5-ssl.mzstatic.com/image/thumb/Features112/v4/10/ea/1e/10ea1e97-487d-e802-3da0-f5f5ec112a03/mzl.sxemrluw.jpg/800x800cc.jpg"
                  }
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
