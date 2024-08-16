import React from 'react';
import { Spin } from 'antd';

const PageLoader = () => {
  return (
    <div className="absolute left-0.5 top-0.5 w-8 h-9.5 -ml-16 -mt-19">
      <Spin size="large" />
    </div>
  );
};
export default PageLoader;
