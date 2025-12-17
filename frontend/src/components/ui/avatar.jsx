import React from 'react';
import './Avatar.css';

export function Avatar({ children, className = '', ...props }) {
  return (
    <div className={`ui-avatar ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, ...props }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="ui-avatar-image" 
      {...props}
    />
  );
}

export function AvatarFallback({ children, ...props }) {
  return (
    <div className="ui-avatar-fallback" {...props}>
      {children}
    </div>
  );
}
