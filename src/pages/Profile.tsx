import { Box } from '@mui/material';
import ProfileForm from '../components/ProfileForm';

function Profile() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        background: '#EEE',
        width: '100%',
        flexGrow: 1,
        py: '30px',
      }}
    >
      <ProfileForm />
    </Box>
  );
}

export default Profile;
