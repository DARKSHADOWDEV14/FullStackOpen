
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const { good, ok, bad } = useSelector(state => state)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>
        good
      </button>

      <button onClick={() => dispatch({ type: 'OK' })}>
        ok
      </button>

      <button onClick={() => dispatch({ type: 'BAD' })}>
        bad
      </button>

      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App