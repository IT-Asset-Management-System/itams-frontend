import { Box } from '@mui/material';
import AssetTable from '../components/AssetTable';

function MyAssets() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        // background: '#EEE',
      }}
    >
      <AssetTable />
    </Box>
  );
}

export default MyAssets;
