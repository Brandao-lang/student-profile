import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Student from './Student'
import '../styles/displaystudents.css'

export default function DisplayStudents() {
    const [students, setStudents] = useState([])
    const [input, setInput] = useState({
        name: '',
        tag: ''
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        axios.get('https://api.hatchways.io/assessment/students')
            .then(res => {
                // console.log(res.data.students)
                const allStudents = res.data.students

                for (let i = 0; i < allStudents.length; i++) {
                    allStudents[i].tags = []
                }
                setStudents(allStudents)

            }).catch(err => {
                console.log(`students API fail, ${err}`)
            })


    },[setStudents])

    // console.log(students)
    // console.log(input)

    return (
       <div className='students-list'>
            <div className='search-container'>
                <input 
                    type='text'
                    placeholder='Search by name'
                    name='name'
                    onChange={handleChange}
                />
                <input 
                    type='text'
                    placeholder='Search by tag'
                    name='tag'
                    onChange={handleChange}
                />
            </div>
            <br/>
            <br/>
        {
            students.filter(student => {
                let fullName = student.firstName.toLowerCase() + ' ' + student.lastName.toLowerCase()
                let allTags = student.tags.toString()
                // console.log(student.tags)

                if (!input.name && !input.tag) {
                    return true
                }
                if (fullName.includes(input.name.toLowerCase()) && allTags.includes(input.tag)) {
                    return true
                }

                return false
                
            })
            .map((student, index) => {
                return (
                    <Student 
                        key={index}
                        firstName={student.firstName}
                        lastName={student.lastName}
                        email={student.email}
                        company={student.company}
                        skill={student.skill}
                        pic={student.pic}
                        grades={student.grades}
                        tags={student.tags} 
                    />
                )
            })
        }
    </div>
)
}
