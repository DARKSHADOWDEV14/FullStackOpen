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


  const [counterGood, setCounterGood] = useState(0);
  const [counterNeutral, setCounterNeutral] = useState(0);
  const [counterBad, setCounterBad] = useState(0);
  const [allClicks, setAll] = useState([]);
  

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
      <p> total clicks: {allClicks.length}</p>

      
    </>
  );
}

export default App;
