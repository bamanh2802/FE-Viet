import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';

type SearchResult = {
  id: string;
  content: string;
};

const initialResults: SearchResult[] = [
  { id: '1', content: 'Kết quả tìm kiếm 1' },
  { id: '2', content: 'Kết quả tìm kiếm 2' },
  { id: '3', content: 'Kết quả tìm kiếm 3' },
];

const SearchResults = () => {
  const [results, setResults] = useState<SearchResult[]>(initialResults);
  const [knowledgePool, setKnowledgePool] = useState<SearchResult[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // Nếu không có vị trí thả, bỏ qua

    if (source.droppableId === 'results' && destination.droppableId === 'knowledgePool') {
      const item = results[source.index];
      const newResults = Array.from(results);
      newResults.splice(source.index, 1); // Xóa item khỏi danh sách kết quả tìm kiếm
      setResults(newResults);
      setKnowledgePool([...knowledgePool, item]); // Thêm item vào knowledge pool
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-8">
        {/* Kết quả tìm kiếm */}
        <Droppable droppableId="results">
          {(provided) => (
            <div
              className="w-1/2 p-4 border"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2>Kết quả tìm kiếm</h2>
              {results.map((result, index) => (
                <Draggable key={result.id} draggableId={result.id} index={index}>
                  {(provided) => (
                    <div
                      className="p-2 border mb-2 bg-gray-100"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {result.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Knowledge Pool */}
        <Droppable droppableId="knowledgePool">
          {(provided) => (
            <div
              className="w-1/2 p-4 border"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2>Knowledge Pool</h2>
              {knowledgePool.map((item) => (
                <div key={item.id} className="p-2 border mb-2 bg-blue-100">
                  {item.content}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default SearchResults;
