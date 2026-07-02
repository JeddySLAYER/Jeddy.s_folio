function Card({ highlight, onOpen }) {

    return (
        <div onClick={() => onOpen(highlight)} class="cursor-pointer group">
            <div class="overflow-hidden rounded-3xl border-8 border-[#E3F2FF]">
                <img
                    src={highlight.cover}
                    alt={highlight.title}
                    class="w-full h-60 object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <h2 class="mt-5 text-2xl font-semibold text-center text-white">
                {highlight.title}
            </h2>
        </div>
    )
}

export default Card;