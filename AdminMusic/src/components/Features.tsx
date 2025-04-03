
import { CheckCircle, Zap, Shield, Coffee } from "lucide-react";

const features = [
  {
    name: 'React + TypeScript',
    description: 'Built with React and TypeScript for type-safe, robust development.',
    icon: Zap
  },
  {
    name: 'Tailwind CSS',
    description: 'Beautifully designed with utility-first CSS framework for rapid UI development.',
    icon: CheckCircle
  },
  {
    name: 'Shadcn UI',
    description: 'Includes accessible UI components that are easy to customize.',
    icon: Shield
  },
  {
    name: 'Vite',
    description: 'Lightning fast development experience with hot module replacement.',
    icon: Coffee
  },
];

const Features = () => {
  return (
    <div id="features" className="py-16 bg-gradient-to-b from-white to-gray-50 sm:py-24">
      <div className="container">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary">Features</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to build modern web apps
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            A carefully crafted starter kit with the best modern tools and practices.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <span className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
