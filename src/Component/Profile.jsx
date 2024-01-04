// Profile.js
import React, { useContext } from 'react';
import { DataContext } from './DataProvider';

const Profile = () => {
  const { account } = useContext(DataContext);

  return (
    <div>
        <div>
          <h2>Welcome, {account.name}!</h2>
          <p>Your username: {account.username}</p>
        </div>
    </div>
  );
};

export default Profile;
