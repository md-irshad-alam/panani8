import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../constants/Navitems";
import { Menu, X } from "lucide-react";
import "../styles/Navbar.css";
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    navigate("/signin"); // Redirect to signin
  };

  return (
    <nav className="navbar bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img
              src="https://panini8.com/_next/image?url=%2Ficons%2Ficon-bg.png&w=256&q=75"
              alt="logo img"
              width={80}
              height={80}
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {navItems().map((item) => (
            <li key={item.id}>
              <Link
                to={item.url}
                onClick={item.title === "Logout" ? handleLogout : null}
                className={`transition-all duration-300 ease-in-out hover:text-blue-500 hover:scale-105 ${
                  location.pathname === item.url
                    ? "text-blue-600 font-semibold"
                    : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className="md:hidden mt-4 px-4 flex flex-col gap-4">
          {navItems().map((item) => (
            <li key={item.id}>
              <Link
                to={item.url}
                onClick={() => {
                  setIsOpen(false);
                  if (item.title === "Logout") handleLogout();
                }}
                className={`transition-all duration-300 ease-in-out hover:text-blue-500 hover:scale-105 ${
                  location.pathname === item.url
                    ? "text-blue-600 font-semibold"
                    : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
