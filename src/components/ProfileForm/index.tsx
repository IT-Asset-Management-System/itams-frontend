import { Box, Typography, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { ImageListType } from 'react-images-uploading';
import { updateProfile, saveAvatar } from '../../api/user';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import InputField from './InputField';
import { UploadImage } from './UploadImage';
import { toast } from 'react-toastify';

function ProfileForm() {
  const { authContext } = useAuthContext();
  const [image, setImage] = useState<ImageListType>([]);
  const onImageChange = async (imageList: ImageListType) => {
    setImage(imageList);
  };

  const handleSave = async (profile: any) => {
    try {
      await updateProfile(profile);
      if (image.length > 0) await saveAvatar(image[0].file);
      toast.success('Update successfully');
    } catch (err: any) {
      console.log('update profile', err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        width: '800px',
        background: '#FFF',
        borderRadius: '10px',
        py: '32px',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '28px',
          textAlign: 'center',
        }}
      >
        My Profile
      </Typography>
      <Formik initialValues={authContext} onSubmit={handleSave}>
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <InputField
                  id="name"
                  fieldName="Name"
                  fullWidth
                  formik={formik}
                />
                <InputField
                  id="location"
                  fieldName="Location"
                  fullWidth
                  formik={formik}
                />
                <InputField id="phone" fieldName="Phone" formik={formik} />
                <UploadImage image={image} onImageChange={onImageChange} />
              </Box>
              <Box
                sx={{
                  mx: '60px',
                  mt: '20px',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    background: '#007aff',
                    boxShadow: '0px 8px 25px rgba(114, 56, 207, 0.15)',
                    borderRadius: '10px',
                    textTransform: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: 14,
                    '&:hover': {
                      background: '#005eff',
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

export default ProfileForm;
