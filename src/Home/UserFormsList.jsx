import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import TrashIcon  from '../images/TrashIcon';
import CopyLinkIcon from '../images/CopyLinkIcon';  
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

const UserFormsList = () => {
  const [user, loading] = useAuthState(auth);
  const [userForms, setUserForms] = useState([]);

  useEffect(() => {
    const fetchUserForms = async () => {
      if (user) {
        try {
          const formsCollection = collection(db, 'users', user.uid, 'forms');
          const formsSnapshot = await getDocs(formsCollection);
          const formsList = formsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setUserForms(formsList);
        } catch (error) {
          console.error('Error fetching user forms:', error);
        }
      }
    };

    fetchUserForms();
  }, [user]);

  const handleDeleteForm = async (formId) => {
    try {
      const formRef = doc(collection(db, 'users', user.uid, 'forms'), formId);
      await deleteDoc(formRef);
      setUserForms((prevForms) => prevForms.filter((form) => form.id !== formId));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const copyLinkToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert('Form link copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying link to clipboard:', error);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bg-none pt-10 pl-[60px]'>
      <h2 className='text-[20px] pb-5 font-bold text-blue-300'>Your Forms:</h2>
      {userForms.length > 0 ? (
        <table className='table-auto w-[70%]'>
          <thead>
            <tr className='text-[#3B9C9C] text-[20px]'>
              <th className='border px-4 py-2'>Title</th>
              <th className='border px-4 py-2'>Number of Questions</th>
              <th className='border px-4 py-2'>View Questions</th>
              <th className='border px-4 py-2'>Copy Link</th>
              <th className='border px-4 py-2'>Delete</th>
            </tr>
          </thead>
          <tbody className="text-[#EDE275]">
            {userForms.map((form) => (
              <tr key={form.id}>
                <td className='border px-4 py-2 text-center'>{form.title}</td>
                <td className='border px-4 py-2 text-center'>{form.questions.length}</td>
                <td className='border px-4 py-2 text-center'>
                  <Link to={`/display-questions?link=${form.link}`}>View</Link>
                </td>
                <td className='border px-4 py-2 text-center'>
                  <div className="flex justify-center items-center cursor-pointer">
                    <CopyLinkIcon onClick={() => copyLinkToClipboard(`${window.location.origin}/display-questions?link=${form.link}`)} />
                  </div>
                </td>
                <td className='border px-4 py-2 text-center'>
                  <div className="flex justify-center items-center cursor-pointer">
                    <TrashIcon onClick={() => handleDeleteForm(form.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No forms available.</p>
      )}
    </div>
  );
};

export default UserFormsList;
