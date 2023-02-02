import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artistsrc = songData?.artists
    ? songData.artists[0].adamid
    : "137057909";
  const imagesrc = songData?.images
    ? songData.images.coverart
    : "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/0c/c3/27/0cc32710-9ab1-5a3e-968c-8001391538b7/artwork.jpg/400x400cc.jpg";
  const artist = artistData?.artists[artistId].attributes;
  return (
    <div className="relative w-full flex flex-col">
      <div
        className="w-full bg-gradient-to-1 from-transparent
      to-black sm:h-48 h-28"
      />
      <div className="absolute inset-0 flex items-center">
        <img
          alt="art"
          src={
            artistId
              ? artist.artwork?.url.replace("{w}", "500").replace("h", "500")
              : imagesrc
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full
        object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData?.artist?.name : songData?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${artistsrc}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artist?.genreNames[0]
              : songData?.genres?.primary
              ? songData.genres.primary
              : "Music"}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
