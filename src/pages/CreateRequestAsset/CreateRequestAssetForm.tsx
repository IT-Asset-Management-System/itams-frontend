import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Actions,
  AssetModel,
  NewRequestAsset,
} from '../../interface/interface';
import SelectField from '../../components/FormComponent/SelectField';
import { createNewRequestAsset, updateRequestAsset } from '../../api/asset';
import { useNavigate } from 'react-router-dom';
import { getAllAssetModels } from '../../api/assetModel';
import InputField from '../../components/FormComponent/InputField';

function CreateAssetForm(props: any) {
  const { data, action } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [assetModels, setAssetModels] = useState<AssetModel[]>([]);
  const initialValues: NewRequestAsset = {
    assetModelId:
      assetModels.find((assetModel: AssetModel) => {
        return assetModel.name === data?.assetModel;
      })?.id ?? 0,
    note: '',
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const assetModels: AssetModel[] = await getAllAssetModels();
        setAssetModels(assetModels);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (newRequestAsset: NewRequestAsset) => {
    setLoading(true);
    try {
      if (action === Actions.UPDATE)
        await updateRequestAsset(data.id, newRequestAsset);
      else await createNewRequestAsset(newRequestAsset);
      navigate(-1);
      toast.success(
        action === Actions.UPDATE
          ? 'Update successfully'
          : 'Create successfully',
      );
    } catch (err: any) {
      console.log('Create asset', err);
      toast.error(err.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: { md: '1000px', xs: '100%' },
        background: '#FFF',
        borderRadius: '5px',
        py: '32px',
        margin: 'auto',
      }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <Box sx={{ mx: '60px', mt: '20px' }}>
                <SelectField
                  id="assetModelId"
                  fieldName="Asset Model"
                  formik={formik}
                  data={assetModels}
                  required
                />
                <InputField
                  id="note"
                  fieldName="Note"
                  formik={formik}
                  multiline
                  fullWidth
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
                <LoadingButton
                  loading={loading}
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
                </LoadingButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

export default CreateAssetForm;
