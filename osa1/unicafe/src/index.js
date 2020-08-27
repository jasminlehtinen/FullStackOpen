import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value} {props.unit}</p>
  )
}

const Statistics = (props) => {
  const allClicks = props.good + props.neutral + props.bad
  const average = (props.good * 1 + props.neutral * 0 + props.bad * (-1)) / (props.good + props.neutral + props.bad)
  const positive = props.good / allClicks * 100

  if (allClicks === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={allClicks} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} unit="%" />
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>
        give feedback
      </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)