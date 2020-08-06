import React from 'react'

const Header = ({ course }) => (
  <div>
    <h2>{course.name}</h2>
  </div>
)

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => (
  <div>
    {course.parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Total = ({ course }) => {
  let total = course.parts
    .map(p => p.exercises)
    .reduce((a,b) => a + b)
  
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
