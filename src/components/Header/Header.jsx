import {  useState } from "react";
import { Link } from "react-router-dom";
import '/src/Output.css';
import coloredlogomain from '/public/coloredlogomain.png'
const Header = () => {
    let Links = [
        { name: "Home", link: "/main" },
        { name: "Company", link: "/company" },
    ];
    let [open, setOpen] = useState(false);
    return (
        <div className='shadow-md w-full fixed top-0 left-0 bg-sky-900'>
            <div className='md:flex items-center justify-between  py-2 md:px-10 px-7'>
                <div className='font-bold text-2xl cursor-pointer text-yellow-400 flex items-center font-[Poppins] '>
                    <span className='text-3xl text-indigo-600 mr-1 pt-2 '>
                        <img src={coloredlogomain} alt="Logo" className="rounded-full rise-2 shadow-8xl w-14 h-12" width={40} height={40}/>
                    </span>
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-3 border px-2 rounded-lg cursor-pointer md:hidden text-white'>
                    <ion-icon name={open ? 'close' : 'menu'}>&#8801;</ion-icon>
                </div>

                <ul className={`md:flex md:items-center text-white md:pb-0  text-center pb-12 my-[-20px] absolute md:static bg-sky-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
                    {
                        Links.map((link) => (
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                                <Link to={link.link} className=' hover:text-yellow-400 duration-500'>{link.name}</Link>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </div>
    )
}

export default Header