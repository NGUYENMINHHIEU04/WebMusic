
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, count, viewAllLink, iconBgColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center text-white`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">{count}</p>
                <Link 
                  to={viewAllLink} 
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
