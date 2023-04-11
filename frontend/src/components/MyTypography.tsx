import React from 'react';
import { Typography } from '@mui/material';

export function MyTypography() {
  return (
    <div>
      <Typography variant='h1'>h1 Heading</Typography>
      <Typography variant='h2'>h2 Heading</Typography>
      <Typography variant='h3'>h3 Heading</Typography>
      <Typography variant='h4' component='h1' gutterBottom>h4 Heading</Typography>
      <Typography variant='h5'>h5 Heading</Typography>
      <Typography variant='h6'>h6 Heading</Typography>

      <Typography variant='subtitle1'>Subtitle 1</Typography>
      <Typography variant='subtitle2'>Subtitle 2</Typography>

      <Typography variant='body1'>In publishing and graphic design,
        Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
        of a document or a typeface without relying on meaningful content. Lorem ipsum
        may be used as a placeholder before final copy is available.
      </Typography>
      <Typography variant='body2'>In publishing and graphic design,
        Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
        of a document or a typeface without relying on meaningful content. Lorem ipsum
        may be used as a placeholder before final copy is available.
      </Typography>
    </div>
  )
}
