function Card({ highlight, onOpen }) {

    return (
        <div onClick={() => onOpen(highlight)} className="cursor-pointer group">
            <div className="overflow-hidden rounded-3xl border-8 border-[#60A5FA]">
                <img
                    src={highlight.cover}
                    alt={highlight.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-60 object-cover transition duration-500 group-hover:scale-105"
                />
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-center text-white">
                {highlight.title}
            </h2>
        </div>
    )
}

export default Card;