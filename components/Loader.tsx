import React from 'react';

interface ILoaderProps {}

const Loader = (props: ILoaderProps) => {
  return <div className="text-white flex flex-col items-center pt40 h-screen">Loading...</div>;
};

export default Loader;
