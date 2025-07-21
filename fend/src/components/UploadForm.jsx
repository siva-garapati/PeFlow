import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../styles/uploadForm.css'

const UploadForm = ({setData}) => {
    const [file, setFile] = useState('')
    const [status, setStatus] = useState({
        msg:'',
        loading:false
    })

    let handleFile = (e) => {
        setFile(e.target.files[0])
    }

    let handleSubmit = () => {

        if (!file) {
            alert('Please select a file.')
            return;
        }

        if(file && file.type !== "application/pdf"){
            alert('only pdf files are allowed')
            return;
        }

        setStatus(s=>({...s,loading:true}))
        setData('')
        setStatus(s => ({ ...s, msg: '' }))
        

        const formData = new FormData()
        formData.append('file', file)

        axios.post(`${import.meta.env.VITE_API_URL}/parse`, formData)
            .then((res) => {
                console.log(res.data)
                if (!res.data.success || res.data?.transactions.length==0) {
                    setStatus(s=>({...s,msg:'no data in the file'}))
                }
                else{
                    setData(res.data)
                }
            })
            .catch(()=>{
                setStatus(s=>({...s,msg:'error in parsing file'}))
            })
            .finally(()=>{
                setStatus(s => ({ ...s, loading: false }))
            })
    }
    return (
        <>
            <div className='upload-section'>
                <h2>Upload your Transactions Pdf</h2>
                <input
                    type='file'
                    onChange={handleFile}
                    accept="application/pdf"
                    className="file-input"
                />
                <button onClick={handleSubmit} className="upload-btn">Submit</button>
                {status.loading && <p className="status loading">Uploading your file...</p>}
                {status.msg && <p className="status">{status.msg}</p>}
            </div>
        </>
    )
}

export default UploadForm