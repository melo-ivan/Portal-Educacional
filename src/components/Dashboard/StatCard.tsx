import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  positive, 
  icon: Icon, 
  gradient 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 flex items-center ${
              positive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className={`inline-block w-0 h-0 mr-1 ${
                positive 
                  ? 'border-l-2 border-r-2 border-b-2 border-transparent border-b-green-600' 
                  : 'border-l-2 border-r-2 border-t-2 border-transparent border-t-red-600'
              }`}></span>
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;