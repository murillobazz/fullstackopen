const Header = ({ name }) => <h3>{name}</h3>

const Total = ({ parts }) =>
  <p>
    <b>total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</b>
  </p>

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )}
  </>

const Course = ({course}) =>
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>

export default Course