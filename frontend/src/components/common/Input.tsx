import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-5">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all 
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
};

export default Input;