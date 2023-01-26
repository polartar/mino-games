import { INft } from '../types/nft';
import { makeStyles } from '@mui/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles({
    root: {
        width: '230px',
        height: '270px',
        borderRadius: '5px',
        margin: '10px',
        boxShadow: '0px 0px 6px 0px grey',
    },
    img: {
        width: '230px',
        height: '230px'
    },
    text: {
        padding: '5px 7px',
        fontWeight: '600'
    }

});

const NftItem = ({ nft }: { nft: INft }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LazyLoadImage
                effect="blur"
                className={classes.img}
                placeholderSrc={"Loading image"}
                src={nft.image} />

            <div className={classes.text}>{nft.name}</div>
        </div>
    )
}

export default NftItem;