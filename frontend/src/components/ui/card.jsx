import React from 'react';
import './Card.css';

export const Card = ({ className = '', children, ...props }) => {
  return (
    <div className={`ui-card ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children, ...props }) => {
  return (
    <div className={`ui-card__header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = '', children, ...props }) => {
  return (
    <h3 className={`ui-card__title ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className = '', children, ...props }) => {
  return (
    <p className={`ui-card__description ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`ui-card__content ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = '', children, ...props }) => {
  return (
    <div className={`ui-card__footer ${className}`} {...props}>
      {children}
    </div>
  );
};
