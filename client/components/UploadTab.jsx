import React, { useState } from 'react';
import { Button, Upload, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      console.log(`File size: ${file.size} bytes`);
      console.log(`File type: ${file.type}`);

      if (file.size > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.result) {
            resolve(reader.result);
          } else {
            reject(new Error('FileReader result is empty.'));
          }
        };
        reader.onerror = (error) => reject(error);
      } else {
        reject(new Error('File is empty.'));
      }
  });
const UploadTab = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const customUploadAction = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('image', file.originFileObj || file);
      
      const response = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response);
      onSuccess();
    } catch (error) {
      console.error('Upload error:', error);
      onError();
      message.error('Failed to upload image.');
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined style={{ color: 'white' }} />
      <div
        style={{
          marginTop: 8,
          color: 'white',
        }}
      >
        Upload Image
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: '50px',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
          }}
        >
          Upload Image
        </h2>
        <p
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: '20px',
            fontFamily: 'sans-serif',
            fontWeight: 'medium',
          }}
        >
          Upload upto 8 photos
        </p>
      </div>

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <center>
        <Upload
            multiple
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            customRequest={customUploadAction}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="Preview Image" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </center>
      </div>
    </>
  );
};

export default UploadTab;
