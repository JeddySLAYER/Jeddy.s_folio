import Card from "./Card";

function Grid({ highlights, onOpen }) {

    return (
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8">
            {
                highlights.map((highlight) => (
                    <Card
                        key={highlight.id}
                        highlight={highlight}
                        onOpen={onOpen}
                    />
                ))
            }
        </div>
    )
}

export default Grid;