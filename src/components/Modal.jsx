import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function Modal({ highlight, onClose }) {

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setCurrent(0);
    }, [highlight]);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
            if (e.key === "ArrowLeft") {
                previous();
            }
            if (e.key === "ArrowRight") {
                next();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    });

    if (!highlight) return null;

    const previous = () => {
        setCurrent((prev) =>
            prev === 0
                ? highlight.media.length - 1
                : prev - 1
        );
    };

    const next = () => {
        setCurrent((prev) =>
            prev === highlight.media.length - 1
                ? 0
                : prev + 1
        );
    };

    const media = highlight.media[current];

    return createPortal(
        <div onClick={onClose} class="fixed inset-0 z-9999 bg-black/30 backdrop-blur-sm overflow-y-auto">
            <div class="min-h-screen flex justify-center p-4 md:p-10">
                <div onClick={(e) => e.stopPropagation()} class="relative md:w-4/5 max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col">
                    <button onClick={onClose} class="absolute top-5 right-5 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#99CAFF] transition flex items-center justify-center cursor-pointer">
                        <X class="text-white" size={24}/>
                    </button>

                    <div class="relative h-72 md:h-96 flex items-center justify-center">
                        {
                            media.type === "image"
                                ?
                                <img src={media.src} alt="" class="w-full h-full object-contain"/>
                                :
                                <video src={media.src} controls class="w-full h-full object-contain"/>
                        }

                        {
                            highlight.media.length > 1 &&

                            <>
                                <button  onClick={previous} class="absolute left-5 w-12 h-12 rounded-full bg-black/50 hover:bg-[#99CAFF] transition flex items-center justify-center cursor-pointer">
                                    <ChevronLeft class="text-white"/>
                                </button>

                                <button onClick={next} class="absolute right-5 w-12 h-12 rounded-full bg-black/50 hover:bg-[#99CAFF] transition flex items-center justify-center cursor-pointer">
                                    <ChevronRight class="text-white"/>
                                </button>
                            </>
                        }

                    </div>

                    {

                        highlight.media.length > 1 &&

                        <div class="flex gap-3 overflow-x-auto px-6 py-5 bg-black/20">
                            {
                                highlight.media.map((item, index) => (

                                    <button key={index} onClick={() => setCurrent(index)} class={`shrink-0 rounded-xl overflow-hidden border-2 transition ${current === index ? "border-white" : "border-transparent"}`}>
                                        {
                                            item.type === "image"
                                                ?
                                                <img src={item.src} class="w-24 h-16 object-cover"/>
                                                :
                                                <video src={item.src} class="w-24 h-16 object-cover"/>
                                        }
                                    </button>
                                ))
                            }
                        </div>
                    }

                    <div class="bg-[#99CAFF] p-8 text-white">

                        <span class="text-sm uppercase tracking-widest text-white/60">
                            Highlight
                        </span>

                        <h2 class="text-3xl font-bold mt-2">
                            {highlight.title}
                        </h2>

                        <p class="mt-6 leading-8 text-white/80">
                            {highlight.description}
                        </p>
                    </div>
                </div>
            </div>
            
        </div>,

        document.body
    )
}

export default Modal;