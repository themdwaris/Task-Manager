import React from 'react';

const Loader2 = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
}

export default Loader2;
