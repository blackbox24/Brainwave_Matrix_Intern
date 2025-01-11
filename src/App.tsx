import { FormEvent, useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState<string | null>(null)

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const selectedMovie = formData.get("movie") as string
    setAnswer(selectedMovie)
    console.log("selected movie",selectedMovie)
  }

  return (
    <>
      <div>
        <div>
          <p>Answer: {answer}</p>
        </div>
        <p>What is your favourite movie?</p>
        <form method='post' className='myform card' onSubmit={handleSumbit}>
          <div>
            <input type="radio" name="movie" value="The Accountant"/>
            <label>The Accountant</label>
          </div>
          <div>
            <input type="radio" name="movie" value="Mission Impossible"/>
            <label>Mission Impossible</label>
          </div>
          <div>
            <input type="radio" name="movie" value="The Batman"/>
            <label>The Batman</label>
          </div>
          <div>
            <input type="radio" name="movie" value="Man of Steel"/>
            <label>Man of Steel</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
