// Importaciones
import { useState } from "react";


//Componentes
const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  );
};



const Display = ({ counter }) => <> {counter} </>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)




const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}







// Aplicación principal

const App = () => {
  const [counter, setCounter] = useState(0);
  const [allClicks, setAll] = useState([])
  // const [clicks, setClicks] = useState({left: 0, right: 0})
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [total, setTotal] = useState(0)


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  const increaseByOne = () => {
    console.log("increasing, value before", counter);
    setCounter(counter + 1);
  };

  const decreaseByOne = () => {
    console.log("decreasing, value before", counter);
    setCounter(counter - 1);
  };

  const setToZero = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };


  // setTimeout(() => setCounter(counter + 1), 1000);
  // console.log("rendering...", counter);

  const course = "Half Stack application development";

  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  

  

  return (
    <>
      <Header course={course} />

      <Content parts={parts} />

      <Total parts={parts} />
      <Display counter={counter} />

      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />

      <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
        
      
      </div>
    </>
  );
};

export default App;
