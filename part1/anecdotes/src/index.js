import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({handler, text}) => <button onClick={handler}>{text}</button>

const App = ({anecdotes}) => {
  //state: index of random anecdote, votes counters array
  const [index, setIndex] = useState(0)
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  )
  
  const genRandomIndex = () => (
    setIndex(
      Math.floor(Math.random() * anecdotes.length)
    )
  )
  const incrementVotes = () => {
    const updatedVotes = [...votes]
    updatedVotes[index] += 1
    setVotes(updatedVotes)
  }
  const maxVoteIndex = votes.indexOf(Math.max(...votes))

  return (
    <>
      <h1>Anecdotes</h1>
      <div id="output">
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[index]}</p>
        <p>has {votes[index]} votes</p>
      </div>
      <div id="input">
        <Button handler={incrementVotes} text="vote" />
        <Button handler={genRandomIndex} text="next anecdote" />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[maxVoteIndex]}</p>
        <p>has {votes[maxVoteIndex]} votes</p>
      </div>
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
