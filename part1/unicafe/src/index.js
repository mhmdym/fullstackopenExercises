import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({handler, text}) => <button onClick={handler}>{text}</button>

const Statistic = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if (total === 0) {
    return <p>No feedback given</p>
  }
  const average = (good * 1 + bad * -1) / total
  const positive = good / total
  
  return (
    <table>
      <tbody>
        <Statistic name="good" value={good} />
        <Statistic name="neutral" value={neutral} />
        <Statistic name="bad" value={bad} />
        <Statistic name="total" value={total} />
        <Statistic name="average" value={average} />
        <Statistic name="positive" value={`${positive*100}%`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // state: feedback counter (one for each possible feedback)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good+1)
  const incrementNeutral = () => setNeutral(neutral+1)
  const incrementBad = () => setBad(bad+1)

  return (
    <div>
      <h1>Unicafe</h1>
      <div id="input">
        <h2>Give feedback</h2>
        <Button handler={incrementGood} text="good" />
        <Button handler={incrementNeutral} text="neutral" />
        <Button handler={incrementBad} text="bad" />
      </div>
      <div id="output">
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
