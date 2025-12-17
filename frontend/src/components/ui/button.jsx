import React from 'react';
import './Button.css';

export const Button = React.forwardRef(
  ({ className = '', variant = 'default', size = 'default', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
