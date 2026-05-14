import premiumBg from "../assets/premium-bg.png";

export const Global3DBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
      <img 
        src={premiumBg} 
        alt="Sony Premium Background" 
        className="w-full h-full object-cover opacity-100 brightness-125"
      />
      {/* Absolute minimal darkening only at the very top for navbar */}
      <div className="absolute inset-0 bg-gradient-to-b from-sony-black/20 via-transparent to-transparent" />
    </div>
  );
};
