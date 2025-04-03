
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, title, count, viewAllLink, iconBgColor }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-100 shadow-sm p-6"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        <div className={`${iconBgColor} p-2 rounded-full`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="ml-3 font-medium">{title}</h3>
      </div>
      
      <div className="mt-2 mb-4">
        <span className="text-4xl font-bold">{count}</span>
      </div>
      
      <Link to={viewAllLink} className="text-blue-500 hover:text-blue-700 flex items-center text-sm">
        View all
        <ArrowRight className="h-4 w-4 ml-1" />
      </Link>
    </motion.div>
  );
};

export default StatCard;
