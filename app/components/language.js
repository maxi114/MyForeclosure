import { useEffect, useState } from 'react';
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Any client-side initialization can go here.
  }, []);

  return (
    <div className="dropdown ">
      <a
        className="dropdown-toggle"
        href="#"
        id="Dropdown"
        role="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <i className="fi fi-gb fis m-0"></i>
      </a>

      <ul style={{position: 'absolute', right: '0'}} className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="Dropdown">
        <li >
          <a className="dropdown-item" href="#">
            <i className="fi fi-gb fis"></i>English <i className="fa fa-check text-success ms-2"></i>
          </a>
        </li>
        <li><hr className="dropdown-divider" /></li>
        {/* Add remaining dropdown items here */}
      </ul>
    </div>
  );
}
