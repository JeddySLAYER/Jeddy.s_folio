import { useState } from "react";
import { Image } from "lucide-react";
import LightBox from "./LightBox";

function Card({title, category, description, cover, media}) {

    const [open, setOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            <div class="overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                <div class="flex flex-col lg:flex-row">
                    <div class="relative lg:w-5/12 overflow-hidden cursor-pointer group"
                        onClick={() => {
                            setCurrentIndex(0);
                            setOpen(true);}}
                        >

                        <img
                            src={cover}
                            alt={title}
                            class="w-full h-72 lg:h-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                            <Image size={42} class="text-white"/>
                            <p class="mt-3 text-white font-medium">
                                View Gallery
                            </p>
                        </div>
                    </div>

                    <div class="lg:w-7/12 p-8 flex flex-col justify-center text-white">
                        <h2 class="text-3xl font-bold mt-2">
                            {title}
                        </h2>

                        <p class="mt-6 leading-8 text-white/80">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <LightBox
                open={open}
                media={media}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                onClose={() => setOpen(false)}
            />
        </>
    );

}

export default Card;