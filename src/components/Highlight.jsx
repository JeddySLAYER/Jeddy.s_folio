import { useMemo, useState } from "react";
import Card from "../components/Card";
import { achievements } from "../data/hihglights";

function Achievements() {

    const [selectedKeyword, setSelectedKeyword] = useState("All");

    const filteredAchievements = useMemo(() => {

        if (selectedKeyword === "All") {
            return achievements;
        }

        return achievements.filter((achievement) =>
            achievement.keywords.includes(selectedKeyword.toLowerCase())
        );

    }, [selectedKeyword]);

    return (

        <div class="w-full h-full flex flex-col text-white overflow-hidden">

            {/* Header */}

            <div class="mb-10">

                <h1 class="text-4xl font-bold">
                    Achievements
                </h1>

                <p class="mt-3 text-white/80 text-lg">
                    A selection of projects, communities, events and milestones that have shaped my journey.
                </p>

            </div>

            {/* Future filters */}

            <div class="flex gap-3 flex-wrap mb-8">

                <button
                    onClick={() => setSelectedKeyword("All")}
                    class={`px-4 py-2 rounded-full border transition cursor-pointer ${
                        selectedKeyword === "All"
                            ? "bg-white text-[#99CAFF]"
                            : "border-white/30 hover:bg-white/10"
                    }`}
                >
                    All
                </button>

            </div>

            {/* Cards */}

            <div class="flex flex-col gap-8 overflow-y-auto pr-3 flex-1">

                {

                    filteredAchievements.map((achievement) => (

                        <Card
                            key={achievement.id}
                            {...achievement}
                        />

                    ))

                }

            </div>

        </div>

    );

}

export default Achievements;