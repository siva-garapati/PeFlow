import React from "react";
import { HelpCircle } from "lucide-react"; // install lucide-react if not already
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-white px-6 h-16 shadow-md z-50">
            {/* Logo / Brand */}
            <div className="text-[#5A2DAF] bg-clip-text text-3xl sm:text-4xl font-black md:pl-16 font-serif">
                <Link to="/">PeFlow</Link>
            </div>
            {/* CashFlow */}


            {/* Help Button */}
            <div className="rounded-full border border-[#5A2DAF]/40 w-9 h-9 flex justify-center items-center text-[#5A2DAF] hover:bg-[#5A2DAF]/10 cursor-pointer transition">
                <HelpCircle size={18} />
            </div>
        </nav>
    );
};

export default Nav;
