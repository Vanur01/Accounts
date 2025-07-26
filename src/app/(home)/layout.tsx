"use client";
import React from "react";
import Navigation from "../../components/Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
};

export default Layout;