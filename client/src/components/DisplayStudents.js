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
        // this function handles the search inputs for students by name, tag, or both //
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        // this useEffect hook will fetch all students from the API, add a new 'tags' key to every student with an empty array as the value, and assign the data to the state array 'students' //
        const getStudents = async() => await axios.get('https://api.hatchways.io/assessment/students')
            .then(res => {
                const allStudents = res.data.students

                for (let i = 0; i < allStudents.length; i++) {
                    allStudents[i].tags = []
                }
                setStudents(allStudents)

            }).catch(err => {
                console.log(`students API fail, ${err}`)
            })

        getStudents()

    },[setStudents])


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
                const fullName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`
                const allTags = student.tags.toString().toLowerCase()

                if (!input.name && !input.tag) {
                    return true
                }
                if (fullName.includes(input.name.toLowerCase()) && allTags.includes(input.tag.toLocaleLowerCase())) {
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
