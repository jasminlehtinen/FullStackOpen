import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <>
      <div>
        <h1>
          give feedback
        </h1>
        <button onClick={handleGoodClick}> good </button>
        <button onClick={handleNeutralClick}> neutral </button>
        <button onClick={handleBadClick}> bad </button>
        <h1>
          statistics
        </h1>
        good {good} <br></br>
        neutral {neutral} <br></br>
        bad {bad} <br></br>
        all {allClicks} <br></br>
        average {(good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)} <br></br>
        positive {good / allClicks * 100} %
      </div>
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)