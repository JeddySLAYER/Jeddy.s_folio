import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function LightBox({open, media, currentIndex, setCurrentIndex, onClose}) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
            if (e.key === "ArrowRight") {
                setCurrentIndex((prev) => (prev + 1) % media.length);
            }
            if (e.key === "ArrowLeft") {
                setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, media.length, setCurrentIndex, onClose]);

    if (!open) return null;
    const current = media[currentIndex];
    const previous = () => {
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    return (
        <div class="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6" onClick={onClose}>
            <div class="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} class="absolute top-2 right-2 lg:top-6 lg:right-6 z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#99CAFF] transition cursor-pointer">
                    <X size={28}/>
                </button>
                {
                    media.length > 1 && (
                        <button onClick={previous} class="absolute left-2 lg:left-6 z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#99CAFF] transition cursor-pointer">
                            <ChevronLeft size={30}/>
                        </button>
                    )
                }

                {
                    media.length > 1 && (
                        <button onClick={next} class="absolute right-2 lg:right-6 z-20 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-[#99CAFF] transition cursor-pointer">
                            <ChevronRight size={30}/>
                        </button>
                    )
                }

                {
                    current.type === "image" ?
                        <img src={current.src} alt="" class="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"/>
                        :
                        <video src={current.src} controls class="max-w-full max-h-full rounded-2xl shadow-2xl"/>
                }

                <div class="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 text-white text-sm">
                    {currentIndex + 1} / {media.length}
                </div>
            </div>
        </div>

    )

}

export default LightBox;