import React from 'react';
import BaseLayout from './BaseLayout';
import BottomNavBar from '../components/organisms/BottomNavBar';

const MainLayout = ({ children }) => {
  return (
    <BaseLayout>
      <main className="pb-20">{children}</main>
      <BottomNavBar />
    </BaseLayout>
  );
};

export default MainLayout;