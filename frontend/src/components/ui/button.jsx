import React from 'react';
import './Button.css';

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) {
  return (
    <button 
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
