import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Average = ({ counterGood, counterNeutral, counterBad }) => {
  const total = counterGood + counterNeutral + counterBad;
  const averageValue = (counterGood - counterBad) / total;
  return (
    <>
      <p>Average: {averageValue}</p>
    </>
  );
};

const Positive = ({ counterGood, counterNeutral, counterBad }) => {
  const total = counterGood + counterNeutral + counterBad;
  const positiveValue = (counterGood / total) * 100;
  return (
    <>
      <p>Positive: {positiveValue}%</p>
    </>
  );
};

const Statistics = ({ counterGood, counterNeutral, counterBad }) => {
  const total = counterGood + counterNeutral + counterBad;
  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <StatisticsLine text="good" value={counterGood} />
      <StatisticsLine text="neutral" value={counterNeutral} />
      <StatisticsLine text="bad" value={counterBad} />

      <Average
        counterGood={counterGood}
        counterNeutral={counterNeutral}
        counterBad={counterBad}
      />
      <Positive
        counterGood={counterGood}
        counterNeutral={counterNeutral}
        counterBad={counterBad}
      />
    </>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <p>
        {text} {value}
      </p>
    </>
  );
};

function App() {

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];
  
  const [counterGood, setCounterGood] = useState(0);
  const [counterNeutral, setCounterNeutral] = useState(0);
  const [counterBad, setCounterBad] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const onClickGood = () => {
    setCounterGood(counterGood + 1);
    setAll([...allClicks, "good"]);
    console.log(counterGood);
  };

  const onClickNeutral = () => {
    setCounterNeutral(counterNeutral + 1);
    setAll([...allClicks, "neutral"]);
    console.log(counterNeutral);
  };

  const onClickBad = () => {
    setCounterBad(counterBad + 1);
    setAll([...allClicks, "bad"]);
    console.log(counterBad);
  };

  

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
      <h1>give feedback</h1>
      <Button handleClick={onClickGood} text="Good" />
      <Button handleClick={onClickNeutral} text="Neutral" />
      <Button handleClick={onClickBad} text="Bad" />

      <h1>Statistics</h1>
      <Statistics
        counterGood={counterGood}
        counterNeutral={counterNeutral}
        counterBad={counterBad}
      />
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} <strong>{votes[selected]} votes</strong></p>
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>

      <p>{anecdotes[mostVoted]}</p>
      <p> {maxVotes} votes</p>
    </>
  );
}

export default App;
