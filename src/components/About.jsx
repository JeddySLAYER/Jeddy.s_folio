import profile from "/highlights/TSS/tss2.webp";

function About() {
  return (
    <div>
        <h2 className="text-2xl text-white font-bold">
            About Me
        </h2>
        <div className="flex flex-col lg:flex-row h-full">
            <div className="w-full lg:w-5/12 flex justify-center items-start pt-8">
                <img src={profile} alt="Portait" className="w-80 h-[430px] object-cover rounded-3xl shadow-xl border-5 border-[#E3F2FF]"/>
            </div>

            <div className="w-full lg:w-7/12 lg:pl-8 mt-8 lg:mt-9 overflow-y-auto pr-3">
                <div>
                    <h2 className="text-xl text-white font-medium">
                        Who Am I ?
                    </h2>
                    <p className="mt-6 leading-8 text-white">
                        I'm a Software Engineer passionate about creating impactful
                        digital solutions. Beyond coding, I enjoy building tech
                        communities, mentoring aspiring developers, and exploring
                        emerging technologies such as Artificial Intelligence and Cloud
                        Computing.
                    </p>
                </div>

                <div className="mt-10">
                    <h2 className="text-xl text-white font-medium">
                        Skills
                    </h2>
                    <div className="mt-6 flex flex-wrap gap-3 animate-skills space-y-3 text-white">
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            React
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            JavaScript
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Tailwind CSS
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Node.js
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Laravel
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            FastAPI
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Python
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Program Management
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Event Planning
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Tech Promoting
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Public Speaking
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
                            Problem Solving
                        </span>
                        <span className="px-4 py-2 rounded-full border border-white/30 bg-white/10">
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