import { Box, TextField, Typography, Grid } from '@mui/material';

function InputField(props: any) {
  const { id, fieldName, disabled, fullWidth, formik, required } = props;
  return (
    <Box sx={{ flexGrow: 1, py: '16px' }}>
      <Grid container spacing={2}>
        <Grid
          xs={3}
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            pr: '16px',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            {required ? `${fieldName}*` : fieldName}
          </Typography>
        </Grid>
        <Grid xs={9}>
          <TextField
            id={id}
            size="small"
            disabled={disabled}
            fullWidth={fullWidth}
            value={formik.values[id]}
            onChange={formik.handleChange}
            required={required}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputField;
