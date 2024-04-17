import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../Firebase';

const AddEmployee = () => {
    const [eNo, setEno] = useState('');
    const [eName, setEname] = useState('');
    const [file, setFile] = useState();

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    console.log("#File", file);

    const submitHandler = async (e) => {
        e.preventDefault();
        const db = getDatabase(app);
        const storage = getStorage(app);

        const fileRef = storeRef(storage, `images/${eNo}`);
        await uploadBytes(fileRef, file);
        const imageURL = await getDownloadURL(fileRef);

        set(ref(db, 'Employee/' + eNo), {
            EmployeeName: eName,
            EmployeeProfileImage: imageURL
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
                <input type='file' placeholder='Upload Profile Photo' onChange={handleFileChange} /><br />
                <button type='submit'> Submit</button>
            </form>
        </div>
    )
}

export default AddEmployee