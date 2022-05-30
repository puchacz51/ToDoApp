import Header from "./Header";
import Footer from "./Footer";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
