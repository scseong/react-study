import React, { useCallback } from 'react';
import GoogleLogin from 'react-google-login';

const Google = () => {
  const responseGoogle = useCallback((response) => {
    console.log(response);
    console.log(response.profileObj);
  }, []);
  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Google;
