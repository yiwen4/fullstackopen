const Header = (props) => {
  return (
          <>
            <h1>{props.course}</h1>
          </>
    )
}
const Content = (props) => {
  return (
          <>
            <p>
              {props.part} {props.exercises}
            </p>
          </>
    )
}
const Content1 = (props) => {
  return (
          <>
            <Part part={props.part[0]} exercises={props.exercises[0]}/>
            <Part part={props.part[1]} exercises={props.exercises[1]}/>
            <Part part={props.part[2]} exercises={props.exercises[2]}/>
          </>
    )
}
const Part = (props) => {
  return (
          <>
            <p>
              {props.part} {props.exercises}
            </p>
          </>
    )
}
const Total = (props) => {
  return (
          <>
            <p>Number of exercises {props.totalExercises}</p>
          </>
    )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const part = [part1, part2, part3]
  const exercises = [exercises1,exercises2,exercises3] 
  const totalExercises = exercises1 + exercises2 + exercises3;
  return (
    <div>
      <Header course={course}/>
      <Content part={part1} exercises={exercises1}/>
      <Content part={part2} exercises={exercises2}/>
      <Content part={part3} exercises={exercises3}/>
      <p>----------</p>
      <Content1 part={part} exercises={exercises}/>
      <Total totalExercises= {totalExercises}/>
    </div>
  )
}

export default App

// browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
// server-->browser: HTML-code
// browser->server: https://studies.cs.helsinki.fi/exampleapp/main.css
// server-->browser: main.css
// browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
// server-->browser: spa.js

// note over browser:
// browser starts executing js-code
// that requests JSON data from server
// end note

// browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
// server-->browser: [{"message":"note created"}]

// note over browser:
// browser executes the event handler
// that renders notes to display
// end note

const Header = (props) => {
  return (
          <>
            <h1>{props.course}</h1>
          </>
    )
}
const Content = (props) => {
  const part = props.part
  return part.map(i=> <Part value = {i}/>) 
}
 
const Part = (props) => {
  return (
          <>
            <p>
              {props.value.name} {props.value.exercises}
            </p>
          </>
    )
}
const Total = (props) => {
  const part = props.part;
  let totalExercises = 0;
  part.map(i=> totalExercises += i.exercises) 
  return (
          <>
            <p>Number of exercises {totalExercises}</p>
          </>
    )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content part={course.parts} /> 
      <Total part={course.parts}/>
    </div>
  )
}

export default App

import { useState } from 'react'


// const Button = (props) => {
//   return <button onClick={props.handleClick}>{props.text}</button>
// }

// const StatisticLine = (props) => { 
//   return <p>{props.text}: {props.value}</p>
// }

// const Statistics = ({good, neutral, bad}) =>{
//   let all = good + neutral + bad; 
//   let average = all === 0 ? 0 : (good - bad) / all;
//   let positive =  all === 0 ? 0 : good / all;
//   if (all !== 0){
//     return(
//       <div>
//         <StatisticLine value={good} text="good" />
//         <StatisticLine value={neutral} text="neutral" />
//         <StatisticLine value={bad} text="bad" />
//         <StatisticLine value={all} text="all" />
//         <StatisticLine value={average} text="average" />
//         <StatisticLine value={positive} text="positive" />
//       </div>
//     )
//   }

// }

// const App = () => {
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   const handleGoodClick = () => {
//     setGood(good + 1) 
//   }
  
//   const handleNeutralClick = () => {
//     setNeutral(neutral + 1) 
//   }

//   const handleBadClick = () => {
//     setBad(bad + 1) 
//   }

//   return (
//     <div>
//       <div>客户反馈</div>
//       <Button handleClick={handleGoodClick} text="good" />
//       <Button handleClick={handleNeutralClick} text="neutral" />
//       <Button handleClick={handleBadClick} text="bad" />
//       <Statistics good={good} neutral={neutral} bad={bad} />
//     </div>
//   )

//   }
 
const Display = ({voteNum, anecdotes}) => {
   let maxNum = 0;
  let maxNumIndex = 0;
  voteNum.map((i, index) =>{
    if(i > maxNum ){
      maxNum = i 
      maxNumIndex = index
    }
  })
  return (
      <div>
         <p>最受欢迎的诗</p>
          <div>{anecdotes[maxNumIndex]}</div>
          <p>这句诗有{maxNum}票</p>
      </div>)
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ] 
  const [selected, setSelected] = useState(0)
  const [voteNum, setVoteNum] = useState([0,0,0,0,0,0,0])

  const handleChangNext = () => {
    const randomNum = Math.floor(Math.random()*7);
    setSelected(randomNum)
  }
  const handleChangVote = () => {
    const copy = [...voteNum]
    copy[selected] += 1;
    setVoteNum(copy)
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <p>这句诗有{voteNum[selected]}票</p>
      <button onClick={handleChangVote}>vote</button>
      <button onClick={handleChangNext}>next</button>
      <Display voteNum={voteNum} anecdotes={anecdotes}/>
    </div>
  )
}

export default App

// import { useState } from 'react'
// import Note from './components/Note'

// const App = (props) => {
//   const [notes, setNotes] = useState(props.notes)
//   const [newNote, setNewNote] = useState(
//     'a new note...'
//   )
//   const [showAll, setShowAll] = useState(true)
  
//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       date: new Date().toISOString(),
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     }
//     setNotes(notes.concat(noteObject))
//     setNewNote('a new note...')
//   }

//   const handleNoteChange = (event) => {
//      setNewNote(event.target.value)
//   }
//   const handleClick = (event) => {
//     setNewNote('')
//   }

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         {notes.map(note =>
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//       <input
//         value={newNote}
//         onChange={handleNoteChange}
//         onClick={handleClick}
//         />
//        <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }

// export default App