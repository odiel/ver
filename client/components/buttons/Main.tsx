import React from 'react';
import {Button} from '@mui/material';
import {FONT_FAMILY_SECONDARY} from '../constants';


type Props = {
    text: string;
    sx?: any;
    onClick: any,
};

export default ({text, sx, onClick}: Props) => (
    <Button variant="contained" sx={{
        boxShadow: 'none',
        backgroundColor: '#1871E8',
        fontFamily: FONT_FAMILY_SECONDARY,
        fontWeight: 600,
        fontSize: '14px',
        textTransform: 'none',
        ...sx
    }} onClick={onClick}>{text}</Button>
);