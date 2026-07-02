import { div } from "framer-motion/client";
import profile from "/highlights/TSS/tss2.jpg";

function About() {
  return (
    <div>
        <h2 class="text-2xl text-white font-bold">
            About Me
        </h2>
        <div class="flex flex-col lg:flex-row h-full">
            <div class="w-full lg:w-5/12 flex justify-center items-start pt-8">
                <img src={profile} alt="Portait" class="w-80 h-[430px] object-cover rounded-3xl shadow-xl border-5 border-[#E3F2FF]"/>
            </div>

            <div class="w-full lg:w-7/12 lg:pl-8 mt-8 lg:mt-9 overflow-y-auto pr-3">
                <div>
                    <h2 class="text-xl text-white font-medium">
                        Who Am I ?
                    </h2>
                    <p class="mt-6 leading-8 text-white/80">
                        I'm a Software Engineer passionate about creating impactful
                        digital solutions. Beyond coding, I enjoy building tech
                        communities, mentoring aspiring developers, and exploring
                        emerging technologies such as Artificial Intelligence and Cloud
                        Computing.
                    </p>
                </div>

                <div class="mt-10">
                    <h2 class="text-xl text-white font-medium">
                        Skills
                    </h2>
                    <div class="mt-6 flex flex-wrap gap-3 animate-skills space-y-3 text-white">
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            React
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            JavaScript
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Tailwind CSS
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Node.js
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Laravel
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            FastAPI
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Python
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Program Management
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Event Planning
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Tech Promoting
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Public Speaking
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Problem Solving
                        </span>
                        <span class="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Solution Building
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default About