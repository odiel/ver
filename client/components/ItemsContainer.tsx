import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Typography, Grid, Alert} from '@mui/material';

import {FONT_FAMILY_SECONDARY, COLOR_BLACK} from './constants';
import {ButtonMain, ListItem, EmptyList, InputItem} from './';
import {ApplicationState, actions} from '../business';

const ItemsContainer = () => {
    const dispatch= useDispatch();
    const list = useSelector((state: ApplicationState) => state.shoppingList.list);
    const error = useSelector((state: ApplicationState) => state.shoppingList.error);

    let content = <EmptyList />;

    if (list && list.length > 0) {
        content = (
            <>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography component="span" gutterBottom sx={{
                            fontFamily: FONT_FAMILY_SECONDARY,
                            fontWeight: 600,
                            fontSize: '18px',
                            color: COLOR_BLACK,
                            lineHeight: '24px',
                        }}>
                            Your Items
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ButtonMain text="Add item" onClick={() => dispatch(actions.list.addItem())}/>
                    </Grid>
                </Grid>
                <Grid container direction="column" sx={{
                    padding: '12px 0'
                }}>
                    {
                        list.map(e => (
                            <ListItem key={e.id} item={{...e}}/>
                        ))
                    }
                </Grid>
            </>
        )
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            borderRadius: '5px',
            margin: '48px auto 0 auto',
        }}>
            {
                error && <Alert severity="error" sx={{ margin: "8px 0"}}>{error.message}</Alert>
            }
            {content}
            <InputItem />
        </Box>
    );
};

export default ItemsContainer;
