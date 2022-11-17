import React from 'react'

const Header = ({name}) => {
    return <h2>{name}</h2>
}

const Part =({part}) => {
  return <li>{part.name}: {part.exercises}</li>
}

const Content = ({parts}) => {
  return <ul>
          {parts.map((part) =>
              <Part part={part} key ={part.id}/> 
          )}
          <Display parts={parts}/>
        </ul>
}

const Display =({parts}) => {
    const sumExercises = parts.reduce((sum, part)=> {
        return part.exercises + sum;
    }, 0);
    return <li>Total of exercises: {sumExercises}</li>
}

const Course = ({courses}) => {
  return <ul>
          {courses.map((course) => 
          <div key={course.id}>
              <Header name={course.name} />
              <Content parts={course.parts}/>     
          </div>    
           )} 
        </ul>
}

export default Course