import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../Firebase';

const AddEmployee = () => {
    const [eNo, setEno] = useState('');
    const [eName, setEname] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const db = getDatabase(app);
        set(ref(db, 'Employee/' + eNo), {
            EmployeeName: eName
        }).then(res => {
            setEno('');
            setEname('');
            navigate('/EmpList');
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={submitHandler}>
                <input type='number' placeholder='Enter Employee ID' value={eNo} onChange={(e) => { setEno(e.target.value) }} /><br />
                <input type='text' placeholder='Enter Employee Name' value={eName} onChange={(e) => { setEname(e.target.value) }} /><br />
                <button type='submit'> Submit</button>
            </form>
        </div>
    )
}

export default AddEmployee