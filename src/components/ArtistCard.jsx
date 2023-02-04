import { useNavigate } from "react-router-dom";
const ArtistCard = ({ track }) => {
  const navigate = useNavigate();
  const tracksrc = track.images
    ? track.images.coverart
    : "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/0c/c3/27/0cc32710-9ab1-5a3e-968c-8001391538b7/artwork.jpg/400x400cc.jpg";
  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5
    bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg
    cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <img alt="artist" src={tracksrc} className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
