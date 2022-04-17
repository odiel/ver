import {useState, useEffect, useRef} from 'react';
import {
    Drawer,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import {LastPage} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';

import {ShoppingListItem} from '../business/list';
import {FONT_FAMILY_MAIN, FONT_FAMILY_SECONDARY} from "./constants";
import {ButtonMain, ButtonSecondary} from './';
import {ApplicationState, actions} from '../business';
import {log} from "util";

const NavBar = () => {
    return (
        <AppBar position="static" sx={{
            boxShadow: 'none',
            backgroundColor: '#FAFAFA',
            border: '0.5px solid #D5DFE9',
        }}>
            <Toolbar>
                <Typography component="div" sx={{
                    fontFamily: FONT_FAMILY_MAIN,
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#5C6269',
                    flexGrow: 1,
                }}>
                    SHOPPING LIST
                </Typography>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => {
                        }}
                        color="inherit"
                    >
                        <LastPage sx={{color: '#555F7C'}}/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

const FieldContainer = ({children}) => (
    <Grid item sx={{marginBottom: '18px'}}>
        {children}
    </Grid>
);

export default () => {
    const dispatch = useDispatch();
    const editItem = useSelector((state: ApplicationState) => state.shoppingList.editItem);

    const [isOpen, toggleDrawer] = useState(false);
    const nameInputRef = useRef();
    const [item, setItem] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [isPurchased, setIsPurchased] = useState(false);

    useEffect(() => {
        if (editItem !== null) {
            toggleDrawer(true);

            const timeout = setTimeout(() => {
                nameInputRef.current.focus();
            }, 100);

            if (editItem !== 'new') {
                setItem(editItem);
                setName(editItem.name);
                setDescription(editItem.description);
                setQuantity(editItem.quantity);
                setIsPurchased(editItem.isPurchased);
            } else {
                setItem(null);
                setName('');
                setDescription('');
                setQuantity('');
                setIsPurchased(false);
            }

            return () => clearTimeout(timeout);
        } else {
            toggleDrawer(false);
        }
    }, [editItem]);

    const cancelItem = () => dispatch(actions.list.cancelItem());

    const handleSave = () => {
        const eItem: ShoppingListItem = {
            id: item?.id,
            name,
            description,
            quantity,
            isPurchased: isPurchased || false,
        };

        dispatch(actions.list.saveItem(eItem));
    };

    let header = 'Add an Item';
    let subHeader = 'Add your item below';
    let ctaButton = 'Add';

    if (item) {
        header = 'Edit an Item';
        subHeader = 'Edit your item below';
        ctaButton = 'Save';
    }

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={cancelItem}
            PaperProps={{
                sx: {
                    width: '70%',
                    maxWidth: '560px',
                    boxShadow: '0px 0px 14px rgba(0, 0, 0, 0.25)',
                    borderBottom: '5px solid #4D81B7',
                    height: '100%'
                }
            }}
        >
            <NavBar/>
            <Grid container direction="column" justifyContent="space-between" sx={{
                padding: '28px 30px',
                height: '100vh'
            }}>
                <Grid container item direction="column">
                    <Grid item sx={{marginBottom: '18px'}}>
                        <Typography sx={{
                            fontSize: '18px',
                            fontFarce: FONT_FAMILY_SECONDARY,
                            lineHeight: '24px'
                        }}>{header}</Typography>
                        <Typography sx={{
                            fontSize: '16px',
                            fontFarce: FONT_FAMILY_SECONDARY,
                            lineHeight: '22px'
                        }}>{subHeader}</Typography>
                    </Grid>

                    <FieldContainer>
                        <TextField variant="outlined" placeholder="Item Name" fullWidth inputRef={nameInputRef}
                                   value={name} onChange={e => setName(e.target.value)}/>
                    </FieldContainer>

                    <FieldContainer>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            placeholder="Description"
                            fullWidth
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </FieldContainer>

                    <FieldContainer>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </FieldContainer>
                    {
                        item && (
                            <FieldContainer>
                                <FormControlLabel control={<Checkbox checked={isPurchased} onChange={e => setIsPurchased(e.target.checked)}/>} label="Purchased"/>
                            </FieldContainer>
                        )
                    }
                </Grid>

                <Grid container item justifyContent="flex-end" alignItems="center">
                    <ButtonSecondary text="Cancel" sx={{marginRight: '32px'}} onClick={cancelItem}/>
                    <ButtonMain text={ctaButton} onClick={() => handleSave()}/>
                </Grid>

            </Grid>
        </Drawer>
    )
}