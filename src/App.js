import React, { useRef } from 'react';
import './App.css';
import './index.css';
import { FormContextProvider, useHookReducer } from './hooks';
import Modal from './components/Modal';
import { Stage, Text, Layer } from 'react-konva';
import URLImage from './components/Konva/URLImage';
// import ReactJson from 'react-json-view';
import Form from './components/form';

const App = () => {
  const [state, dispatch] = useHookReducer();
  const stageRef = useRef(null);
  const { rangeList, activeItem, isModalOpen } = state;

  return (
    <FormContextProvider value={{state, dispatch}}>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex flex-1 justify-start">
          <button type="button" className="p-2 bg-blue-400 text-white border-blue-500 border-2" onClick={() => dispatch({ type: 'setModal', payload: true})}>Create</button>
        </div>
        {isModalOpen && <Modal isOpen={isModalOpen}> <Form /> </Modal>}
        {/* <Form /> */}
        <div className="range-container">
          <div className="range-list">
            {rangeList.map(data => (
              <div key={data.id} className="range-list-item">
                  <div className="range-details">
                    {data.label}
                  </div>
                  <button onClick={() => dispatch({ type: 'viewItem', payload: data.id })}>View</button>
                  <button onClick={() => dispatch({ type: 'delete', payload: data.id })}>Delete</button>
              </div>
            ))
            }
          </div>
          {activeItem && (
            <Stage width={activeItem.width} height={activeItem.height} ref={stageRef}>
              {activeItem.hasOwnProperty("components") && (
                activeItem.components.map(data => (
                  <Layer key={data.id}>
                      {data.type === "text" ? (
                        <Text text={data.content} height={data.height} width={data.height} x={data.xaxis} y={data.yaxis} />
                      ) :(
                        <URLImage x={data.xaxis} y={data.yaxis} width={data.width} height={data.height} image={data.url} />
                      )}
                  </Layer>
                ))
              )}
            </Stage>
          )}
          
        </div>
        {/* <ReactJson src={rangeList} displayDataTypes={false} /> */}
      </div>
    </FormContextProvider>
  );
}

export default App;
