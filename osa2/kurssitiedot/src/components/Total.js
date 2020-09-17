import React from 'react'

const Total = ({ total }) => {
    const sum = Object.values(total).reduce((accumulator, {exercises}) => {
        return accumulator + exercises
    }, 0)

    return (
        <>
            <p><b>total of {sum} exercises</b></p>
        </>
    )
}

export default Total
