import { Button } from '@mui/material';
import { FONT_FAMILY_SECONDARY, COLOR_DARK_GRAY } from "../constants";


type Props = {
    text: string;
    sx?: any;
    onClick: any;
};

export default ({ text, sx, onClick }: Props) => (
    <Button variant="contained" sx={{
        boxShadow: 'none',
        backgroundColor: '#FFF',
        fontFamily: FONT_FAMILY_SECONDARY,
        fontWeight: 600,
        fontSize: '14px',
        textTransform: 'none',
        color: COLOR_DARK_GRAY,
        ...sx
    }} onClick={onClick}>{text}</Button>
);