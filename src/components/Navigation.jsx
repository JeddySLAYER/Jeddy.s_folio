import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
    { to: "/", label: "Home", end: true },
    { to: "/about", label: "About" },
    { to: "/highlight", label: "Highlights" },
    { to: "/contact", label: "Contact" },
];

function desktopLinkClass({ isActive }) {
    return `px-5 py-2 rounded-full transition ${
        isActive
            ? "bg-white text-[#60A5FA]"
            : "hover:bg-white hover:text-[#60A5FA]"
    }`;
}

function mobileLinkClass({ isActive }) {
    return `text-xl p-1 text-center rounded-3xl transition-all ${
        isActive
            ? "bg-white text-[#60A5FA]"
            : "hover:bg-white hover:text-[#60A5FA] hover:translate-x-2"
    }`;
}

function Navigation() {

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [menuOpen]);

    return (
        <>
            <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-[#60A5FA] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer md:hidden"
            >
                {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-500 md:hidden ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />

            <div className={`absolute top-0 right-0 h-full w-1/2 bg-[#2563EB] backdrop-blur-xl shadow-2xl rounded-3xl transition-all duration-500 z-40 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col mt-28 gap-6 px-8 text-white">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={() => setMenuOpen(false)}
                            className={mobileLinkClass}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <a onClick={() => setMenuOpen(false)} className="text-xl p-1 text-center rounded-3xl bg-[#60A5FA] hover:bg-white hover:text-[#60A5FA] hover:translate-x-2 transition-all cursor-pointer" href="/resume - Jediel Victorin SAMEY.pdf" target="_blank" rel="noopener noreferrer">
                        Download CV
                    </a>
                </div>
            </div>

            <nav className="hidden md:flex w-11/12 absolute top-2">
                <div className="flex gap-3 px-4 py-1 m-auto text-white border-b-2 border-[#E3F2FF]">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={desktopLinkClass}
                        >
                            {link.label}
                        </NavLink>
                    ))}

                    <a href="/resume - Jediel Victorin SAMEY.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-[#60A5FA] hover:bg-white hover:text-[#60A5FA] transition">
                        Download CV
                    </a>
                </div>
            </nav>
        </>
    )
}

export default Navigation;