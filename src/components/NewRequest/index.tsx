import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { getCategories } from '../../api/category';
import { newRequestAsset } from '../../api/asset';

interface Category {
  id: number;
  name: string;
}

interface Request {
  categoryId: number;
}

export default function NewRequest(props: any) {
  const [newRequest, setNewRequest] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const initialValues: Request = { categoryId: 0 };
  const { update } = props;
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res: Category[] = await getCategories();
        console.log(res);
        setCategories(res);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCategories();
  }, []);

  const handleRequest = () => {
    setNewRequest(!newRequest);
  };

  const handleSubmit = async (request: Request) => {
    try {
      await newRequestAsset(request.categoryId);
      handleRequest();
      await update();
      toast.success('Request asset successfully');
    } catch (err: any) {
      console.log('create new request', err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Box>
      <Button
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
        onClick={handleRequest}
      >
        {newRequest ? 'Cancel' : 'New request'}
      </Button>

      {newRequest && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(formik) => {
            return (
              <Form>
                <Box sx={{ mx: '60px', mt: '20px' }}>
                  <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>
                    Category
                  </Typography>
                  <Select
                    id="categoryId"
                    name="categoryId"
                    sx={{
                      background: '#F5F5F5',
                      width: '150px',
                      height: '48px',
                    }}
                    onChange={formik.handleChange}
                  >
                    {categories?.map((category: Category, index: number) => {
                      return (
                        <MenuItem key={index} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
                <Box
                  sx={{
                    mx: '60px',
                    mt: '20px',
                    display: 'flex',
                    justifyContent: 'right',
                    gap: '10px',
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
                    Create
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      )}
    </Box>
  );
}
