import React, { useRef } from 'react';
import './App.css';
import './index.css';
import { FormContextProvider, useHookReducer } from './hooks';
import Modal from './components/Modal';
import { Stage, Text, Layer, Rect, Group } from 'react-konva';
import URLImage from './components/Konva/URLImage';
import CreateForm from './components/CreateForm';
import RangeDetailForm from './components/RangeDetailForm';

const App = () => {
  const [state, dispatch] = useHookReducer();
  const stageRef = useRef(null);
  const { rangeList, activeItem, isModalOpen } = state;

  return (
    <FormContextProvider value={{state, dispatch}}>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex flex-1 justify-start">
          <button type="button" className="p-2 bg-green-500 text-white border-green-700 border-2" onClick={() => dispatch({ type: 'setModal', payload: true})}>Create</button>
        </div>
        {isModalOpen && <Modal isOpen={isModalOpen}> <CreateForm /> </Modal>}
        <div className="range-container">
          <div className="range-list">
            {rangeList.map(data => (
              <div key={data.id}>
                <div className="range-details border-2 border-blue-400 bg-blue-300 p-4">
                  <RangeDetailForm data={data} />
                </div>
              </div>
            ))
            }
          </div>
          {activeItem && (
            <Stage width={activeItem.width} height={activeItem.height} ref={stageRef}>
                <Layer>
                  <Rect width={activeItem.width} height={activeItem.height} x={activeItem.xaxis} y={activeItem.yaxis} fill="green" strokeWidth={2} />
                  {activeItem.hasOwnProperty("components") && (
                    activeItem.components.map(data => (
                      <Group key={data.id}>
                          {data.type === "text" ? (
                            <Text text={data.content} height={data.height} width={data.height} x={data.xaxis} y={data.yaxis} />
                          ) : (
                            <URLImage x={data.xaxis} y={data.yaxis} width={data.width} height={data.height} image={data.url} />
                          )}
                      </Group>
                    ))
                  )}
                </Layer>
            </Stage>
          )}
        </div>
      </div>
    </FormContextProvider>
  );
}

export default App;
