
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-white">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Starter</span>
            </a>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden space-x-10 md:flex">
            <a href="#features" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Features
            </a>
            <a href="#about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="#contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </nav>
          
          {/* Right buttons */}
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <Button variant="outline" className="ml-8">
              Sign in
            </Button>
            <Button className="ml-4">
              Get Started
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-10 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">Starter</span>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <a href="#features" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Features
                  </a>
                  <a href="#about" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    About
                  </a>
                  <a href="#contact" className="text-base font-medium text-gray-900 hover:text-gray-700">
                    Contact
                  </a>
                </nav>
              </div>
              <div className="mt-6 flex flex-col space-y-4">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
                <Button className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;