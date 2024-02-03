import React from "react";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

interface FooterProps {
  year: number;
}

const Footer: React.FC<FooterProps> = ({ year }) => {
  return (
    <div className="bg-gray-600 text-white p-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h3>Designed and Developed by Durgesh Kumar</h3>
        </div>
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h3>Copyright © {year} Dk</h3>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <ul className="flex space-x-4">
            <li className="social-icons">
              <a
                href="https://github.com/Durgesh2008/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/durgesh-kumar-203a47275/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/du.rgeshkumar474/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
