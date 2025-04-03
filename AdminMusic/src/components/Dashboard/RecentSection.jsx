
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

const RecentSection = ({ title, items, emptyMessage, addButtonText, viewAllLink, addAction }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="mt-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link to={viewAllLink} className="text-sm text-gray-500 hover:text-gray-700">
          View all
        </Link>
      </div>
      
      <motion.div 
        className="bg-white border border-gray-100 rounded-lg p-6"
        variants={item}
      >
        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Items would be rendered here */}
            <div>Content goes here</div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">{emptyMessage}</p>
            <Button onClick={addAction} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {addButtonText}
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RecentSection;
