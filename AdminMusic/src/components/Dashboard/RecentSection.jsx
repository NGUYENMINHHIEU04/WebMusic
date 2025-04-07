
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Music } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

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

  const renderItems = () => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">{emptyMessage}</p>
          <Button onClick={addAction} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {addButtonText}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Link to={`${viewAllLink}/${item.id}`} key={item.id || index} className="no-underline">
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden bg-gray-100">
                  {item.image && item.image.url ? (
                    <img 
                      src={item.image.url} 
                      alt={item.title || item.name || 'thumbnail'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Music className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-grow overflow-hidden">
                  <h3 className="font-medium text-sm mb-0.5 truncate">
                    {item.title || item.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">
                    {item.artists ? item.artists.join(', ') : (item.description || '')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      className="mt-6"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link to={viewAllLink} className="text-sm text-gray-500 hover:text-gray-700">
          View all
        </Link>
      </div>
      
      <motion.div 
        className="bg-white border border-gray-100 rounded-lg p-4"
        variants={item}
      >
        {renderItems()}
      </motion.div>
    </motion.div>
  );
};

export default RecentSection;
