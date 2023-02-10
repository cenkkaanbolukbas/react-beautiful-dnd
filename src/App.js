import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { version } from "react";

function App() {
  const [character, setCharacter] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character", {
      method: "GET",
    });
    const { results } = await response.json();

    setCharacter(
      results.map(({ id, name, image }) => {
        return {
          id,
          name,
          image,
        };
      })
    );
    console.log("res", results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDragEnd = (results) => {
    const items = [...character];
    const [removedItem] = items.splice(results.source.index, 1);
    items.splice(results.destination.index, 0, removedItem);
    setCharacter(items);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Beautiful-DND</h3>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="DND">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {character.map(({ name, id, image }, index) => {
                  return (
                    <Draggable
                      key={id}
                      draggableId={id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="thumb">
                            <img src={image} alt={name} />
                          </div>
                          <p className="name">{name}</p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
