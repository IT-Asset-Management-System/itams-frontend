import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { resetPasswordValidationSchema } from '../../helpers/validationSchema';
import PasswordField from '../FormComponent/PasswordField';
import { changePassword } from '../../api/auth';

function ChangePasswordForm() {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (formik: any) => {
    try {
      const { currentPassword, newPassword } = formik;
      await changePassword(currentPassword, newPassword);
      toast.success('Change password successfully');
    } catch (err: any) {
      console.log('Change password', err);
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
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <PasswordField
                  id="currentPassword"
                  fieldName="Current password"
                  formik={formik}
                  required
                />
                <PasswordField
                  id="newPassword"
                  fieldName="New password"
                  formik={formik}
                  required
                />
                <PasswordField
                  id="confirmPassword"
                  fieldName="Confirm password"
                  formik={formik}
                  required
                />
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

export default ChangePasswordForm;
