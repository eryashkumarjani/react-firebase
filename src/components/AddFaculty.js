import React, { useState } from 'react';
import { app } from '../Firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const AddFaculty = () => {
    const [fNo, setFNo] = useState('');
    const [fName, setFName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, 'Faculty'), {
            FacultyNo: fNo,
            FacultyName: fName
        });
        // console.log("#Data", docRef);
        setFNo('');
        setFName('');
    }

    return (
        <div>
            <h1>Add Faculty</h1>
            <form onSubmit={handleSubmit}>
                <input type='number' placeholder='Enter Faculty ID' value={fNo} onChange={(e) => setFNo(e.target.value)} /><br />
                <input type='text' placeholder='Enter Faculty Name' value={fName} onChange={(e) => setFName(e.target.value)} /><br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default AddFaculty