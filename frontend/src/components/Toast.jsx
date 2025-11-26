import React, { useEffect } from 'react';

/**
 * Toast Component
 * Small and beautiful notification toast for user feedback
 */
const Toast = ({ message, type = 'success', onClose, duration = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: 'bg-gradient-to-r from-green-400 to-green-500',
    error: 'bg-gradient-to-r from-red-400 to-red-500',
    info: 'bg-gradient-to-r from-blue-400 to-blue-500',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-500'
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fadeIn">
      <div className={`${bgColors[type]} text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 min-w-[200px] max-w-[300px] border border-white/20 backdrop-blur-sm`}>
        <span className="text-lg">{icons[type]}</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-lg font-bold leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
