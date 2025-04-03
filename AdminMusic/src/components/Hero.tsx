
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">A modern</span>
            <span className="block text-primary">React starter kit</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Start your next web application with this beautifully crafted, responsive, and accessible React starter template.
          </p>
          <div className="mx-auto mt-8 flex max-w-md justify-center space-x-4">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Abstract background shape */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-blue-50 to-white" aria-hidden="true"></div>
    </div>
  );
};

export default Hero;
