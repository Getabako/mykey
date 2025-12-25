interface EnemyProps {
  name: string;
  image: string;
  claim: string;
  isHit: boolean;
}

export const Enemy = ({ name, image, claim, isHit }: EnemyProps) => {
  return (
    <div className={`flex flex-col items-center enemy-enter ${isHit ? 'shake' : ''}`}>
      {/* Enemy speech bubble */}
      <div className="bg-white/90 text-black p-3 rounded-lg mb-2 max-w-xs shadow-lg relative">
        <p className="text-sm font-bold">{claim}</p>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/90"></div>
      </div>

      {/* Enemy character */}
      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-contain"
      />
      <p className="text-white text-sm mt-1">{name}</p>
    </div>
  );
};
