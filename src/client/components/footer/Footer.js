import React from "react";
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Footer = () => {
  return (
    <Box>
      <Typography variant="h6" style={{padding: "0px 0 10px", fontSize: "18px"}} align="center">
        {'Copyright © Talk It Out.'}
      </Typography>
    </Box>
  )
}

export default Footer;
