import React from 'react';
import StatisticItem from '@/components/molecules/StatisticItem';

const StatisticsSection = () => {
  const stats = [
    { icon: 'Home', label: 'Properties Listed', value: '12,000+' },
    { icon: 'Users', label: 'Happy Customers', value: '8,500+' },
    { icon: 'MapPin', label: 'Cities Covered', value: '150+' },
    { icon: 'Award', label: 'Years Experience', value: '15+' }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatisticItem
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;