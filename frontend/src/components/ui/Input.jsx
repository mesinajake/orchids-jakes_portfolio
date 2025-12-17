import React from 'react';
import './Input.css';

export const Input = React.forwardRef(
  ({ className = '', type = 'text', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`ui-input ${error ? 'ui-input--error' : ''} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
