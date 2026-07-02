import { useMemo, useState } from "react";

import Grid from "./Grid";
import Modal from "./Modal";

import { highlights } from "../highlights";

function Highlight() {

    const [selectedKeyword, setSelectedKeyword] = useState("All");

    const [selectedHighlight, setSelectedHighlight] = useState(null);

    // Tous les mots-clés disponibles

    const keywords = useMemo(() => {

        const list = new Set();

        highlights.forEach((highlight) => {
            highlight.keywords.forEach((keyword) => {
                list.add(keyword);
            });
        });

        return ["All", ...list];
    }, []);

    const filteredHighlights = useMemo(() => {
        if (selectedKeyword === "All") {
            return highlights;
        }

        return highlights.filter((highlight) =>
            highlight.keywords.includes(selectedKeyword)
        );
    }, [selectedKeyword]);

    return (
        <div class="w-full h-full flex flex-col text-white">
            <div>
                <h1 class="text-2xl font-bold">
                    Highlights
                </h1>

                <p class="mt-3 text-xl italic text-white/80">
                    Some of the most memorable moments of my journey.
                </p>
            </div>

            <div class="flex flex-wrap gap-3 mt-8 mb-10">
                {
                    keywords.map((keyword) => (
                        <button key={keyword} onClick={() => setSelectedKeyword(keyword)} class={`px-5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${selectedKeyword === keyword ? "bg-white text-[#99CAFF] border-white" : "bg-white/10 border-white/20 hover:bg-white/20"}`}>
                            {keyword}
                        </button>
                    ))
                }
            </div>

            <div class="flex-1 overflow-y-auto pr-2">
                <Grid
                    highlights={filteredHighlights}
                    onOpen={setSelectedHighlight}
                />
            </div>

            {
                selectedHighlight &&

                <Modal
                    highlight={selectedHighlight}
                    onClose={() => setSelectedHighlight(null)}
                />
            }
        </div>
    )
}

export default Highlight;