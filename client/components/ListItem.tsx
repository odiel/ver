import {Typography, Grid, Checkbox, IconButton} from '@mui/material';
import {EditOutlined as EditIcon, DeleteOutlined as DeleteIcon} from '@mui/icons-material';
import {useDispatch} from "react-redux";

import {COLOR_BLACK, COLOR_GRAY_BLUEISH} from "./constants";
import {actions} from "../business";
import {ShoppingListItem} from "../business/list";

type Props = {
    item: ShoppingListItem;
}

export default ({item}: Props) => {
    const dispatch = useDispatch();

    return (
        <Grid container item alignItems="center" sx={{
            border: item.isPurchased ? '' : '0.5px solid #D5DFE9',
            height: '87px',
            marginTop: '12px',
            background: item.isPurchased ? 'rgba(213, 223, 233, 0.17)' : 'rgba(255, 255, 255, 1)'
        }}>
            <Grid item sx={{
                margin: '0 34px 0 21px'
            }}>
                <Checkbox checked={item.isPurchased} onChange={(e) => dispatch(actions.list.saveItem({...item, isPurchased: e.target.checked}))}/>
            </Grid>
            <Grid container item xs direction="column">
                <Typography sx={{
                    fontWeight: '16px',
                    color: COLOR_BLACK,
                    textDecoration: item.isPurchased ? 'line-through' : 'none'
                }}>{item.quantity} - {item.name}</Typography>
                <Typography sx={{
                    fontWeight: '14px',
                    color: '#7D7A7A',
                    textDecoration: item.isPurchased ? 'line-through' : 'none'
                }}>{item.description}</Typography>
            </Grid>
            <Grid item sx={{
                marginRight: '34px'
            }}>
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => dispatch(actions.list.editItem(item))}>
                    <EditIcon sx={{color: COLOR_GRAY_BLUEISH}}/>
                </IconButton>

                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => dispatch(actions.list.deleteItem(item.id))}>
                    <DeleteIcon sx={{color: COLOR_GRAY_BLUEISH}}/>
                </IconButton>
            </Grid>
        </Grid>
    )
}