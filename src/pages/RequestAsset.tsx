import { Box } from '@mui/material';
import React from 'react';
import { getRequestAsset } from '../api/asset';
import NewRequest from '../components/NewRequest';
import RequestTable from '../components/RequestTable';

interface RequestAsset {
  id: number;
  category: string;
  date: string;
  status: string;
}

function RequestAsset() {
  const [rows, setRows] = React.useState<RequestAsset[]>([]);

  const getAssets = async () => {
    try {
      const requestAsset = await getRequestAsset();
      setRows(requestAsset);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getAssets();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'start',
        // background: '#EEE',
      }}
    >
      <RequestTable rows={rows} />
      <NewRequest update={getAssets} />
    </Box>
  );
}

export default RequestAsset;
