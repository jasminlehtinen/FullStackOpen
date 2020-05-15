import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are almost {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const nimi = "Jasmin"
  const ika = 28

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Jasmin" age={18 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
