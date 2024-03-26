import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="flex justify-center gap-4 mb-2">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="hover:text-blue-600" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-blue-400" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-400" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-blue-300" />
        </a>
      </div>
      <div>
        © {new Date().getFullYear()} oOrjit Real Estate. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
