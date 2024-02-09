import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLoginComponent() {
    const onGoogleLoginSuccess = async (response: any) => {
        console.log(response);
    
        const { credential } = response;
        try {
            const googleResponse = await axios.post('https://193.106.55.175/auth/google', {
                credential,
            });
    
            const { accessToken, refreshToken, user } = googleResponse.data;
          
    
            if (user.photo) {
                try {
                    const fileResponse = await axios.post<{ url: string }>('https://193.106.55.175/file', {
                        file: user.photo,
                    });
    
                    const updatedUser = {
                        ...user,
                        photo: fileResponse.data.url,
                    };
    
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (fileError) {
                    console.error('Failed to update fileUrl:', fileError);
                }
            }


            delete user.age;
            delete user.password;
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('isGoogleSignIn','true');

    
            // Provide feedback to the user
            setValidationError('Google registration successful!');
    
            const tokenResponse = await axios.get('https://193.106.55.175/user/token', {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
    
            console.log('User obtained using accessToken:', tokenResponse.data.user);
    
            // Optionally, you can navigate to the Movies page or close the modal
            navigate('/Movies');
            window.location.reload();
        } catch (error) {
            console.error('Google registration failed:', error);
    
            // Update the UI with an error message (you can add state for this)
            setValidationError('Google registration failed');
        }
    };

    const onGoogleLoginFailure = () => {
        console.log('Google login failed');
    };
  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      onSuccess={(response) => console.log('success', response)}
      onFailure={(response) => console.log('failure', response)}
    />
  );
}

export default GoogleLoginComponent;