import * as React from 'react';
import {Box, Typography} from '@mui/material';
import {useDispatch} from 'react-redux';

import {FONT_FAMILY_SECONDARY, COLOR_PALE_GRAY} from './constants';
import {ButtonMain} from './';
import {actions} from '../business';

const EmptyList = () => {
    const dispatch = useDispatch();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #C6C6C6',
            width: '100%',
            maxWidth: '614px',
            height: '290px',
            borderRadius: '5px',
            margin: '174px auto 0 auto',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography component="div" gutterBottom sx={{
                fontFamily: FONT_FAMILY_SECONDARY,
                fontWeight: 400,
                fontSize: '18px',
                color: COLOR_PALE_GRAY,
                lineHeight: '24px',
                textAlign: 'center'
            }}>
                Your shopping list is empty :(
            </Typography>
            <ButtonMain text="Add your first item" sx={{margin: '10px 0 0 0'}}
                        onClick={() => dispatch(actions.list.addItem())}/>
        </Box>
    );
};

export default EmptyList;
