import React, { useState } from "react";
import { Link } from "react-router-dom";
import '/src/Output.css';

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem]= useState("");
    const onToggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    const handleItemClick=(e)=>{
        setActiveItem(e)
    }
    return (
        <nav className="flex justify-between bg-indigo-900 w-full items-center h-16  px-5 md:px-6">
            <div>
                <Link className="font-bold text-2xl cursor-pointer text-yellow-300" to="/">Logo</Link>
            </div>
            <div className={`nav-links duration-500 md:static absolute bg-indigo-900 text-white my-4 md:min-h-fit min-h-[50px] left-0 top-${isMenuOpen ? '[9%]' : '[-100%]'} md:w-auto  w-full h-30 flex item-center px-5 py-4`}>
                <ul className="flex md:flex-row flex-col md:items-end md:gap-[4vw] gap-8 w-full ">
                    <li>
                        <Link className={`hover:text-gray-500 ${
                                activeItem === "home" ? "text-yellow-300" : ""
                            }`} to="/" onClick={() => handleItemClick("home")}
>Home</Link>
                    </li>
                    <li>
                        <Link className={`hover:text-gray-500 ${
                                activeItem === "company" ? "text-yellow-300" : ""
                            }`} to="/company" onClick={() => handleItemClick("company")}>Company</Link>
                    </li>
                    <button className="bg-[#a6c1ee] text-white px-5 py-1 rounded-full hover:bg-[#87acec]">
                        Sign in
                    </button>
                </ul>
            </div>
            <div className=" cursor-pointer md:hidden">
                
                <h1 className="text-4xl font-bold text-yellow-300 border rounded-md item-center px-1" onClick={onToggleMenu}>&#8801;</h1>
            </div>
        </nav>
    );
}

export default Header;