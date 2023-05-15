import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = (good + neutral + bad);
  const average = ((good - bad) / all);
  const percentage = `${((good / all) * 100)}%`;

  if (good === 0 && neutral === 0 && bad === 0) return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
  
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="percentage" value ={percentage} />                   
        </tbody>
      </table>
    </div>
  )
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {name}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button name={'good'} handleClick={() => setGood(good + 1)}/>
        <Button name={'neutral'} handleClick={() => setNeutral(neutral + 1)}/>
        <Button name={'bad'} handleClick={() => setBad(bad + 1)}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App