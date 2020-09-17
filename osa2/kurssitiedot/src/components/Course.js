import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ name, parts }) => {
    return (
        <>
            <Header header={name} />
            <Content content={parts} />
            <Total total={parts} />
        </>
    )
}

export default Course