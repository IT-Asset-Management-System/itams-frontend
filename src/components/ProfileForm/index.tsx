import { Box, Typography, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { ImageListType } from 'react-images-uploading';
import { updateProfile, saveAvatar } from '../../api/user';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { UploadImage } from './UploadImage';
import { toast } from 'react-toastify';
import { changePassword } from '../../api/auth';
import { resetPasswordValidationSchema } from '../../helpers/validationSchema';
import InputField from '../FormComponent/InputField';

function ProfileForm() {
  const { authContext, updateAuth } = useAuthContext();
  const [image, setImage] = useState<ImageListType>([]);
  const onImageChange = async (imageList: ImageListType) => {
    setImage(imageList);
  };

  const initialValues = {
    ...authContext,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSave = async (profile: any) => {
    try {
      const { currentPassword, newPassword, confirmPassword, ...info } =
        profile;
      await updateProfile(info);
      if (image.length > 0) await saveAvatar(image[0].file);
      if (newPassword.length > 0)
        await changePassword(currentPassword, newPassword);
      toast.success('Update successfully');
      await updateAuth();
    } catch (err: any) {
      console.log('update profile', err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        width: { md: '800px', xs: '100%' },
        background: '#FFF',
        borderRadius: '5px',
        py: '32px',
        margin: 'auto',
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
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSave}
      >
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
