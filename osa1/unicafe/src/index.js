import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  let average = (props.good * 1 + props.neutral * 0 + props.bad * (-1)) / (props.good + props.neutral + props.bad)
  let positive = props.good / props.allClicks * 100

  if (props.allClicks === 0) {
    return (
      <>
        <h1>
          statistics
        </h1>
        No feedback given
      </>
    )
  }

  return (
    <>
      <h1>
        statistics
      </h1>
      good {props.good} <br></br>
      neutral {props.neutral} <br></br>
      bad {props.bad} <br></br>
      all {props.allClicks} <br></br>
      average {average} <br></br>
      positive {positive} %
    </>
  )
}

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
      <h1>
        give feedback
      </h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)