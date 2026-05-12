export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/10 relative z-10 bg-sony-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-gradient">SONY</h2>
          <p className="text-gray-400 max-w-sm font-light">
            Pushing the boundaries of audio technology for over 75 years. Join the future of sound.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-gray-400 font-light">
            <li><a href="#" className="hover:text-neon-blue transition-colors">Headphones</a></li>
            <li><a href="#" className="hover:text-neon-blue transition-colors">Audio Players</a></li>
            <li><a href="#" className="hover:text-neon-blue transition-colors">Accessories</a></li>
            <li><a href="#" className="hover:text-neon-blue transition-colors">Support</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Connect</h4>
          <ul className="space-y-4 text-gray-400 font-light">
            <li><a href="#" className="hover:text-neon-blue transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-neon-blue transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-neon-blue transition-colors">YouTube</a></li>
            <li><a href="#" className="hover:text-neon-blue transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">© 2024 Sony Electronics. All rights reserved.</p>
        <div className="flex gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
