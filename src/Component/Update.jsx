// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';


// const Update = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({
//     title: '',
//     desc: '',
//     email: ''
//   });
  
//   const navigate = useNavigate()
  
//   useEffect(() => {
//     const getSinglePost = async () => {
//       try {
//         const response = await axios.get(`https://blogback-qong.onrender.com/api/v1/users/posts/${id}`);
//         const { title, desc, email } = response.data.data;
//         console.log(response, 'new');
//         setFormData({ title, desc, email });
//       } catch (error) {
//         console.error(error.message);
//       }
//     };

//     getSinglePost();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       console.log('Form Data:', formData);
//       const response = await axios.put(
//         `https://blogback-qong.onrender.com/api/v1/users/update/${id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
  
//       navigate('/');
  
//       if (response.data.success) {
//         console.log('Post successfully updated!', response.data.message);
//       } else {
//         console.error('Failed to update post. Response:', response.data.message);
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
  
  

//   return (
//     <div className="container mt-5">
//       <h2>Update Post</h2>
//       <form onSubmit={handleFormSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Title:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="desc"
//             value={formData.desc}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email:</label>
//           <input
//             type="text"
//             className="form-control"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Update;




import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileRef = useRef();

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const response = await axios.get(`https://blogback-qong.onrender.com/api/v1/users/posts/${id}`);
        const { title, desc, email } = response.data.data;
        setFormData({ title, desc, email });
      } catch (error) {
        console.error(error.message);
      }
    };

    getSinglePost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `https://blogback-qong.onrender.com/api/v1/users/update/${id}`;

    try {
      // Display loading indicator or disable submit button
      setLoading(true);

      const blogUpdateData = new FormData();
      blogUpdateData.append('title', formData.title);
      blogUpdateData.append('desc', formData.desc);
      blogUpdateData.append('email', formData.email);
      blogUpdateData.append('blogimg', fileRef.current.files[0]);
      

      const response = await axios.put(apiUrl, blogUpdateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirect after successful submission
      navigate('/');

      if (response.data && response.data.success) {
        console.log('Form data successfully submitted!');
        // Handle the updated post data
        const updatedPostData = response.data.data;
        setFormData({
          title: updatedPostData.title,
          desc: updatedPostData.desc,
          email: updatedPostData.email,
        });
      } else {
        console.error('Error submitting form data', response.data.msg);
        // Display error message to the user
        // ...
      }
    } catch (error) {
      console.error('Error:', error.message || 'Unknown error');
      // Display error message to the user
      // ...
    } finally {
      // Remove loading indicator or enable submit button
      setLoading(false);
    }
    navigate('/')
  };

  return (
    <div className="container mt-5">
      <h2>Update Post</h2>
      <div className='blog-wraps'>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label">Blog Image</label>
            <input type="file" name="blogimg" accept="image/*" ref={fileRef} />

          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      </div>
      
    </div>
  );
};

export default Update;









