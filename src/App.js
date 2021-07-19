import React from 'react';
import './App.css';
import './index.css';
import { FormContextProvider, useHookReducer } from './hooks';
import ReactJson from 'react-json-view';
import Form from './components/form';

const App = () => {
  const [state, dispatch] = useHookReducer();
  const { rangeList, activeItem } = state;

  return (
    <FormContextProvider value={{state, dispatch}}>
      <div className="flex flex-1 flex-col">
        <Form />
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
          {Object.keys(activeItem).length !== 0 &&
            <div className="range-item">
              <Form defaultValues={activeItem} />
            </div>
          }
        </div>
        <ReactJson src={rangeList} displayDataTypes={false} />
      </div>
    </FormContextProvider>
  );
}

export default App;
