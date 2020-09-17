import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    return (
        <>
            <Header header={course.name} />
            <Content content={course.parts} />
            {/*<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>*/}
        </>
    )
}

export default Course