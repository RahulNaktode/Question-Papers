import React, { useState, useRef, useEffect } from 'react' // useEffect add kiya
import axios from 'axios'
import Navbar from '../../components/Navbar'
import Input from '../../components/Input'
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import PhotoViwer from '../../components/PhotoViwer';
import Button from '../../components/Button';
import toast, { Toaster } from 'react-hot-toast';

function Electrical() {
  const [uploadedPapers, setUploadedPapers] = useState([])
  const [formData, setFormData] = useState({
    subject: "",
    semester: "",
    year: "",
    paperUrl: []
  })

  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    getQuestionPapers();
  }, []);

  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:8030/auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      toast.error("Please select a file to upload");
      return;
    }

    const file = fileInput.files[0];
    setIsUploading(true);

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      setIsUploading(false);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
      });

      setFormData((prev) => ({
        ...prev,
        paperUrl: [...prev.paperUrl, uploadResponse.url],
      }));

      setProgress(0);
      setIsUploading(false);
      fileInput.value = "";
    } catch (error) {
      setIsUploading(false);
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    }
  };

  const addQuestionPaper = async () => {
    if (!formData.subject || formData.paperUrl.length === 0) {
      toast.error("Please fill subject and upload at least one image");
      return;
    }

    const dataToSend = { 
    ...formData, 
    department: "Electrical" // Department field set karein
  };

    const response = await axios.post('http://localhost:8030/questions', dataToSend);
    
    if (response.data.success) {
      toast.success('Question paper uploaded successfully');
      setFormData({
        department: "Electrical", // Department field set karein
        subject: "",
        semester: "",
        year: "",
        paperUrl: []
      })
      getQuestionPapers();
    } else {
      toast.error('Failed to upload question paper');
    }
  }

  const getQuestionPapers = async () => {
  try {
    const response = await axios.get('http://localhost:8030/questions', {
      params: { department: "Electrical" } // Yeh backend mein ?department=Electrical ban jayega
    });
    if (response.data.success) {
      setUploadedPapers(response.data.data);
    }
  } catch (error) {
    console.error("Error fetching papers:", error);
  }
};

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <div className='p-4 max-w-7xl mx-auto'>
        <h1>⚡ Electrical Engineering</h1>
        <p className='text-gray-500 mb-3'>
          Complete semester-wise question papers and study materials for Electrical
        </p>

        {uploadedPapers.length > 0 && (
          <div className='my-10'>
            <h2>🎓 Student Uploaded Papers</h2>
            <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-6 overflow-y-auto max-h-96'>
              {uploadedPapers.map((paper) => (
                <div key={paper._id || paper.id} className='border rounded-lg p-4 bg-white border-green-500 shadow-md'>
                  <h3 className='text-lg font-semibold mb-2'>{paper.subject}</h3>
                  <p className='text-gray-600 mb-1'>Semester: {paper.semester}</p>
                  <p className='text-gray-600 mb-2'>Year: {paper.year}</p>

                  <div className='flex flex-wrap gap-2'>
                    {Array.isArray(paper.paperUrl) ? paper.paperUrl.map((url, index) => (
                      <PhotoViwer key={index} imageUrl={url} />
                    )) : <p className='text-gray-500'>No images available</p>

                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='p-6 rounded-lg shadow-md bg-[#e3f2fd]'>
          <h2 className='mb-4'>📤 Upload Question Papers & Photos</h2>
          <Input
            type="text"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Semester"
            value={formData.semester}
            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
          />
          <Input
            type="date"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />

          <div className='flex flex-wrap gap-4 my-4'>
            {formData.paperUrl?.map((photo, index) => (
              <PhotoViwer
                imageUrl={photo}
                key={index}
                onDelete={(url) => {
                  setFormData({
                    ...formData,
                    paperUrl: formData.paperUrl.filter((p) => p !== url)
                  })
                }}
                showDelete
              />
            ))}
          </div>
          <div className='my-4' >
            <label className='block font-bold'>📸 Upload Photo</label>
            <input type="file"
              ref={fileInputRef}
              disabled={isUploading}
              onChange={(e) => {
                if (e.target.files.length > 0) handleUpload();
              }}
              className='bg-[#e3f2fd] border border-gray-300 rounded px-2 py-1 mx-2 w-full mb-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 '
            />

            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                <p className='text-sm mt-1 text-blue-600 font-medium'>Uploading: {progress}%</p>
              </div>
            )}
          </div>

          <Button
            title={isUploading ? "Uploading Images..." : "Save All Pages"}
            varient='primary'
            size='medium'
            onClick={addQuestionPaper}
            disabled={isUploading || formData.paperUrl.length === 0}
          />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Electrical