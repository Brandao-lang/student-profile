import React, { useState } from 'react'

export default function Student(props) {
    const [expand, setExpand] = useState(false)
    const [tags, setTags] = useState(props.tags)
    const [input, setInput] = useState({
        tag: ""
    })


    const getAverage = (grades) => {
        // this function recieves an array of grades and returns the average by calculating the sum of all grades and divdes by the array length //
        let sum = 0
        
        for (let i = 0; i < grades.length; i++) {
            sum += parseInt(grades[i]) 
        }

        const average = sum / grades.length
        
        return average.toFixed(2)
    }

    const listGrades = (grades) => {
        // this function maps over an array of grades and returns a list with each grade as a list item //
        return (
            <ul>
                {grades.map((grade, index) => {
                    return <li key={index}><p>Test {index+1}: {grade}%</p></li>
                })}
            </ul>
        )
    }

    const handleChange = (e) => {
        // this function handles the input for the 'add a tag' text field //
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const addTag = (e) => {
        // this function updates both the state array 'tags' with the submitted text from the 'tag-container' form, as well as the parent state sub-array 'tags' within the individual student object //
        e.preventDefault()

        let copy = [...tags]
        copy.push(input.tag)
        setTags(copy)
        props.tags.push(input.tag)
        
        setInput({
            ...input,
            tag: ""
        })
    }


    return (
        <div className='student' key={props.index}>
            <img src={props.pic} alt='profile-pic'/>
                
            <button 
            className='grade-toggle-btn' 
            onClick={() => setExpand(!expand)}>
                {
                    !expand ? '+' : '-'
                }
            </button>
            
            <h1>{props.firstName} {props.lastName}</h1>
            
            <div className='student-bio'>
                <p>Email: {props.email}</p>
                <p>Company: {props.company}</p>
                <p>Skill: {props.skill}</p>
                <p>Average: {getAverage(props.grades)}% 
                    <button 
                    className='mobile-grade-toggle-btn' 
                    onClick={() => setExpand(!expand)}>
                        {
                            !expand ? '+' : '-'
                        }
                    </button>
                </p>
                
                <div className={!expand ? 'hide-grades' : 'show-grades'}>
                    {listGrades(props.grades)}
                </div>
                
                <div className='student-tags'>
                {
                    props.tags.map((tag, index) => {
                        return (
                            <span key={index}>{tag}</span>
                        )
                    })
                }
                </div>
                
                <div className='tag-container'>
                    <form onSubmit={addTag}>
                        <input 
                            type='text'
                            placeholder='Add a tag'
                            name='tag'
                            value={input.tag}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            </div>
            <br/>
            <hr />
        </div>
    )
}
