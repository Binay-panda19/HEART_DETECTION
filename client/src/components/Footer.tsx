export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">MediScan AI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced AI-powered medical imaging analysis for healthcare professionals and institutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Medical Disclaimer
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>support@mediscan-ai.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Available 24/7</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MediScan AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}