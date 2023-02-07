import React from 'react'
import Router from './routes/router'
import './App.css'
import generateGraph from '../algorithm/generateGraph';

const Graph = generateGraph();

export const GraphContext = React.createContext();

function App() {
  return (
    <div className="App">
      <GraphContext.Provider value={Graph}>
        <Router />
      </GraphContext.Provider>
    </div>
  )
}

export default App
