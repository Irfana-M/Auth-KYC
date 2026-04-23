import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      {title && <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;