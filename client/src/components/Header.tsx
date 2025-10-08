import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1628760584600-6c31148991e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwQUklMjB0ZWNobm9sb2d5JTIwbG9nb3xlbnwxfHx8fDE3NTkyMjk3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Medical AI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-semibold text-gray-900">MediScan AI</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-[#D32F2F] transition-colors">Home</a>
          <a href="#" className="text-gray-700 hover:text-[#D32F2F] transition-colors">About</a>
          <a href="#" className="text-gray-700 hover:text-[#D32F2F] transition-colors">Upload</a>
          <a href="#" className="text-gray-700 hover:text-[#D32F2F] transition-colors">Contact</a>
        </nav>

        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}