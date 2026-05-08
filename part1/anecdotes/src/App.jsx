import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);



function App() {

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
     "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
     "Premature optimization is the root of all evil.",
     "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
   ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  
   const nextAnecdote = () => {
       const randomIndex = Math.floor(Math.random() * anecdotes.length);
       setSelected(randomIndex);
     }
   
     const voteAnecdote = () => {
     const copyVotes = [...votes];
     copyVotes[selected] += 1;
     setVotes(copyVotes);
   };
   
   const maxVotes = Math.max(...votes);
   const mostVoted = votes.indexOf(maxVotes)
   
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} <strong>{votes[selected]} votes</strong></p>
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>

      <p>{anecdotes[mostVoted]}</p>
      <p> {maxVotes} votes</p>
    </>
  )
}

export default App
