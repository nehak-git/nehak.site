import * as React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className="mx-auto p-5 bg-black/30 backdrop-blur-md">
      <nav className="max-w-3xl mx-auto flex justify-between items-center">
        <a href="">nehak.site</a>
        <div className="flex gap-4">
          <a href="">projects</a>
          <a href="">blogs</a>
          <a href="">ai</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
