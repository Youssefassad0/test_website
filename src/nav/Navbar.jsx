import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import "./Navbar.css";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.header
      className={`header ${isSticky ? "sticky" : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="nav">
        <nav>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="logo">
              <h2>CRISTALINOX</h2>
            </div>
          </motion.div>

          {/* Mobile Menu Icon */}
          <div className="icon" onClick={toggleMenu}>
            {isOpen ? <IoCloseOutline className="close" /> : <FaBars />}
          </div>

          {/* Navigation Links */}
          <motion.ul
            className={`nav-link ${isOpen ? "active" : ""}`}
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            {[
              { to: "/", text: "Accueil" },
              { to: "/about", text: "About" },
              { to: "/catalogue", text: "Catalogue" },
              { to: "/contact", text: "Contact" },
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.1, color: "#f39c12" }}
                transition={{ duration: 0.3 }}
              >
                <NavLink to={item.to} onClick={() => setIsOpen(false)}>
                  {item.text}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;
