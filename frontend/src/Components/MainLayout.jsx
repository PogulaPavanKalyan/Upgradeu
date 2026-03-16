import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../UserDashboardComponent/NavBar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '80px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
