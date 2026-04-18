import React, { useState, useRef, useEffect } from 'react'
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
import Search from '../../components/Search';

function Aero() {
  const [uploadedPapers, setUploadedPapers] = useState([])
  const [searchTerm, setSearchTerm] = useState(""); // New State for Search
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

  // Filter Logic: Filters by Subject OR Semester
  const filteredPapers = uploadedPapers.filter((paper) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      paper.subject.toLowerCase().includes(searchLower) ||
      paper.semester.toString().toLowerCase().includes(searchLower)
    );
  });

  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:8030/auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      return { signature: data.signature, expire: data.expire, token: data.token, publicKey: data.publicKey };
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

    try {
      const { signature, expire, token, publicKey } = await authenticator();
      const uploadResponse = await upload({
        expire, token, signature, publicKey, file,
        fileName: file.name,
        onProgress: (event) => setProgress(Math.round((event.loaded / event.total) * 100)),
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
      toast.error("Upload failed");
    }
  };

  const addQuestionPaper = async () => {
    if (!formData.subject || formData.paperUrl.length === 0) {
      toast.error("Please fill subject and upload at least one image");
      return;
    }
    const dataToSend = { ...formData, department: "Aero" };
    const response = await axios.post('http://localhost:8030/questions', dataToSend);
    
    if (response.data.success) {
      toast.success('Question paper uploaded successfully');
      setFormData({ subject: "", semester: "", year: "", paperUrl: [] });
      getQuestionPapers();
    }
  }

  const getQuestionPapers = async () => {
    try {
      const response = await axios.get('http://localhost:8030/questions', {
        params: { department: "Aero" }
      });
      if (response.data.success) setUploadedPapers(response.data.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <div className='p-4 max-w-7xl mx-auto'>
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <div>
            <h1 className='text-2xl font-bold'>✈️ Aeronautical Engineering</h1>
            <p className='text-gray-500'>Complete semester-wise question papers</p>
          </div>
          
          {/* SEARCH BAR UI */}
          <div className="w-full md:w-1/3">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </div>
        </div>

        {/* DISPLAY FILTERED RESULTS */}
        <div className='my-10'>
          <h2 className='mb-4 font-bold text-xl'>🎓 Student Uploaded Papers</h2>
          {filteredPapers.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 overflow-y-auto max-h-96 p-2'>
              {filteredPapers.map((paper) => (
                <div key={paper._id || paper.id} className='border rounded-lg p-4 bg-white border-green-500 shadow-md hover:scale-105 transition-transform'>
                  <h3 className='text-lg font-semibold mb-2'>{paper.subject}</h3>
                  <p className='text-gray-600 mb-1 text-sm'>Semester: {paper.semester}</p>
                  <p className='text-gray-600 mb-2 text-sm'>Year: {paper.year}</p>
                  <div className='flex flex-wrap gap-2'>
                    {Array.isArray(paper.paperUrl) ? paper.paperUrl.map((url, index) => (
                      <PhotoViwer key={index} imageUrl={url} />
                    )) : <p className='text-gray-500 text-xs'>No images</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-10 bg-white rounded-lg border">
              <p className="text-gray-500 italic">No papers found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* UPLOAD FORM */}
        <div className='p-6 rounded-lg shadow-md bg-[#e3f2fd]'>
          <h2 className='mb-4 font-bold'>📤 Upload New Paper</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>

          <div className='flex flex-wrap gap-4 my-4'>
            {formData.paperUrl?.map((photo, index) => (
              <PhotoViwer
                imageUrl={photo}
                key={index}
                onDelete={(url) => setFormData({ ...formData, paperUrl: formData.paperUrl.filter((p) => p !== url) })}
                showDelete
              />
            ))}
          </div>

          <div className='my-4' >
            <label className='block font-bold mb-1'>📸 Upload Photo</label>
            <input type="file" ref={fileInputRef} disabled={isUploading}
              onChange={(e) => { if (e.target.files.length > 0) handleUpload(); }}
              className='bg-white border border-gray-300 rounded px-2 py-1 w-full cursor-pointer'
            />
            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                <p className='text-xs mt-1 text-blue-600 font-medium'>Uploading: {progress}%</p>
              </div>
            )}
          </div>

          <Button
            title={isUploading ? "Uploading..." : "Save All Pages"}
            varient='primary'
            size='large'
            onClick={addQuestionPaper}
            disabled={isUploading || formData.paperUrl.length === 0}
          />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Aero