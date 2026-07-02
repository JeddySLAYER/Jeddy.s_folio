import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navigation() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button onClick={() => setMenuOpen(!menuOpen)} class="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-[#99CAFF] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer md:hidden">
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <div class={`absolute top-0 right-0 h-full w-1/2 bg-[#99CAFF] backdrop-blur-xl shadow-2xl rounded-3xl transition-all duration-500 z-40 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div class="flex flex-col mt-28 gap-6 px-8 text-white">
                    <Link to="/" onClick={() => setMenuOpen(false)} class="text-xl p-1 text-center rounded-3xl hover:bg-white hover:text-[#99CAFF] hover:translate-x-2 transition-all">
                        Home
                    </Link>

                    <Link to="/about" onClick={() => setMenuOpen(false)} class="text-xl p-1 text-center rounded-3xl hover:bg-white hover:text-[#99CAFF] hover:translate-x-2 transition-all">
                        About
                    </Link>

                    <Link to="/highlight" onClick={() => setMenuOpen(false)} class="text-xl p-1 text-center rounded-3xl hover:bg-white hover:text-[#99CAFF] hover:translate-x-2 transition-all">
                        Highlights
                    </Link>

                    <Link to="/contact" onClick={() => setMenuOpen(false)} class="text-xl p-1 text-center rounded-3xl hover:bg-white hover:text-[#99CAFF] hover:translate-x-2 transition-all">
                        Contact
                    </Link>

                    <a onClick={() => setMenuOpen(false)} class="text-xl p-1 text-center rounded-3xl hover:bg-white hover:text-[#99CAFF] hover:translate-x-2 transition-all" href="/resume - Jediel Victorin SAMEY.pdf" download cursor-pointer>
                        Download CV
                    </a>
                </div>
            </div>

            <nav class="hidden md:flex w-11/12 absolute top-0">
                <div class="flex gap-3 px-4 py-1 m-auto text-white border-b-2 border-[#E3F2FF]">
                    <Link to="/" class="px-5 py-2 rounded-full hover:bg-white hover:text-[#99CAFF] transition">
                        Home
                    </Link>

                    <Link to="/about" class="px-5 py-2 rounded-full hover:bg-white hover:text-[#99CAFF] transition">
                        About
                    </Link>

                    <Link to="/highlight" class="px-5 py-2 rounded-full hover:bg-white hover:text-[#99CAFF] transition">
                        Highlights
                    </Link>

                    <Link to="/contact" class="px-5 py-2 rounded-full hover:bg-white hover:text-[#99CAFF] transition">
                        Contact
                    </Link>

                    <a href="/resume - Jediel Victorin SAMEY.pdf" download class="px-5 py-2 rounded-full bg-[#99CAFF] hover:bg-white hover:text-[#99CAFF] transition">
                        Download CV
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Navigation;