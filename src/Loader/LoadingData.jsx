import React from 'react';

const LoadingData = () => {
    return (
       <div className="flex flex-col items-center justify-center h-40 text-center animate-fade-in-up">

             {/* Spinner */}
      <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary border-t-transparent animate-spin mb-6"></div>
      {/* Loading text */}
      <p className="text-lg font-semibold text-secondary mb-2">
        Loading Your data...
      </p>
            
        </div>
    );
};

export default LoadingData;