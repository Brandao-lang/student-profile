import React, { useState } from 'react'
import '../styles/search.css'

export default function Search(props) {
    const [input, setInput] = useState({
        name: ''
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        props.searchStudents(input.name)
    }
    
    return (
        <div className='search-container'>
            <input 
                type='text'
                placeholder='Search by Name'
                name='name'
                onChange={handleChange}
            />
        </div>
    )
}
