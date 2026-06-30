import { Link } from "react-router-dom";

import profile from "../assets/photo.png";

function Main() {
  return (
    <div class="flex flex-col lg:flex-row items-center">
        <div class="w-full lg:w-5/12 flex justify-center">
            <img src={profile} alt="Portrait" class="w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-full border-5 border-[#E3F2FF]"/>
        </div>

        <div className="hidden lg:flex justify-center w-8">
            <div className="h-96 w-1 bg-[#E3F2FF] rounded-full"></div>
        </div>
        <div className="lg:hidden w-3/4 h-px bg-[#E3F2FF] my-8"></div>

        <div class="w-full lg:w-7/12 lg:pl-8 min-w-0 text-white">
            <h2 class="text-2xl italic">
                I'm
            </h2>
            <h1 class="text-3xl md:text-4xl font-semibold break-words">
                Jediel Victorin SAMEY
            </h1>
            <p class="mt-2">
                Software Engineer | Community Builder | AI Enthusiast
            </p>
            <p class="mt-6">
                I build solutions that resolve real problems, I promote the use of new technologies and build communities around them.
            </p>
            <p class="mt-6">
                Let's Build The Tech Ecosystem We Want To See Emerge.
            </p>
            <div class="mt-10 flex justify-start">
                <Link to="/about" class="px-5 py-2 rounded-full bg-white text-[#99CAFF] font-semibold transition-all duration-300 hover:bg-[#99CAFF] hover:text-white hover:border hover:border-white">
                    More About Me
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Main