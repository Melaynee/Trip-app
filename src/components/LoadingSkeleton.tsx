import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="loading-skeleton">
      <h4>
        Weather <b>Forecast</b>
      </h4>
      <div className="loading-skeleton-item">
        <div className="loading-skeleton-input" />
      </div>
      <div className="loading-skeleton-item-cities">
        <div className="loading-skeleton-city" />
        <div className="loading-skeleton-city" />
        <div className="loading-skeleton-city" />
        <div className="loading-skeleton-city" />
      </div>
      <div className="loading-skeleton-item">
        <div className="loading-skeleton-bar" />
      </div>
      <div className="loading-skeleton-item-days">
        <div className="loading-skeleton-day" />
        <div className="loading-skeleton-day" />
        <div className="loading-skeleton-day" />
        <div className="loading-skeleton-day" />
        <div className="loading-skeleton-day" />
        <div className="loading-skeleton-day" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
