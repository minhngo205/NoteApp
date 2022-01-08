import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px',
    },
}))

export default function Popup(props) {
    const { title,children,openPopup,setOpenPopup } = props

    const classes = useStyles();

    return(
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant={"h5"} component={"div"} style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                    <Button color={"secondary"}
                        onClick={()=>{setOpenPopup(false)}}>
                        <Close/>
                    </Button>
                </div>
            </DialogTitle>

            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}