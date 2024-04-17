import React, { useState } from 'react';
import { app } from '../Firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateFaculty = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [fNo, setFNo] = useState(location.state.FacultyNo);
    const [fName, setFName] = useState(location.state.FacultyName);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore(app);
        const docRef = doc(db, 'Faculty', location.state.id);
        try {
            await updateDoc(docRef, {
                FacultyNo: fNo,
                FacultyName: fName
            });
            setFNo('');
            setFName('');
            navigate('/fctyList');
        } catch (err) {
            console.log(err);
        }
    }

    console.log("#Location Data", location);

    return (
        <div>
            <h1>Update Faculty</h1>
            <form onSubmit={handleSubmit}>
                <input type='number' placeholder='Enter Faculty ID' value={fNo} onChange={(e) => setFNo(e.target.value)} /><br />
                <input type='text' placeholder='Enter Faculty Name' value={fName} onChange={(e) => setFName(e.target.value)} /><br />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdateFaculty