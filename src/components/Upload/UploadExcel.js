import React, {useEffect, useState} from 'react';
import axios from 'axios';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://127.0.0.1:8000/attendance/upload_students/', formData, {
        headers: {
          'Authorization': 'Token ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data);
      window.open('/', '_self');
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage(true);
    }
  };

  useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message ? <p style={{color: "red"}}>upload error</p> : <p></p>}
    </div>
  );
};

export default UploadExcel;
