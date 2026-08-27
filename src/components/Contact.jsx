import { useState } from "react";
import {FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp} from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
        "service_a1m4ogd",
        "template_occdv9a",
        "#Form"
    )
    .then(() => {
        alert("Message sent successfully!");

        setFormData({
            firstName: "",
            lastName: "",
            subject: "",
            message: ""
        });
    })
    .catch((error) => {
        console.error(error);
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center text-white">
        <div className="mb-10">
            <h1 className="text-2xl font-bold">
                Let's Connect
            </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mt-8">

            <div className="lg:col-span-7">
                <form className="flex flex-col gap-6 flex-1" id="Form">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-medium">
                                First Name
                            </label>
                            <input type="text" placeholder="Jediel" className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-white transition" name="firstName" value={formData.firstName} onChange={handleChange} required/>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Last Name
                            </label>
                            <input type="text" placeholder="SAMEY" className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-white transition" name="lastName" value={formData.lastName} onChange={handleChange}/>
                        </div>

                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Subject
                        </label>
                        <input type="text" placeholder="Your subject..." className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-white transition" name="subject" value={formData.subject} onChange={handleChange} required/>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label className="block mb-2 font-medium">
                            Message
                        </label>
                        <textarea placeholder="Write your message..." className="flex-1 min-h-56 resize-none rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-white transition" name="message" value={formData.message} onChange={handleChange} required></textarea>
                    </div>

                    <div className="flex justify-start">
                        <button type="submit" className="px-5 py-2 rounded-full bg-white text-[#60A5FA] font-semibold hover:bg-[#60A5FA] hover:text-white hover:border hover:border-white transition-all duration-300 cursor-pointer">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>

            <div className="lg:col-span-5 flex flex-col">
                <p className="mt-2 text-xl italic text-white leading-8">
                    Feel free to reach out, whether you have a project in mind, a collaboration opportunity, or just want to say hello, I'm always open to connecting with passionate people.
                </p>

                <div className="flex gap-4 flex-wrap mt-6 md:mt-8">
                    <a href="https://github.com/JeddySLAYER/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#60A5FA] transition">
                        <FaGithub size={22}/>
                    </a>

                    <a href="https://wa.me/98504036" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#60A5FA] transition">
                        <FaWhatsapp size={22}/>
                    </a>

                    <a href="https://www.instagram.com/jeddy_slayer" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#60A5FA] transition">
                        <FaInstagram size={22}/>
                    </a>

                    <a href="https://www.linkedin.com/in/jediel-victorin-samey-1075762b8" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#60A5FA] transition">
                        <FaLinkedinIn size={22}/>
                    </a>
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Contact
