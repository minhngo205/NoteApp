import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Grid, TextField} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import FileBase from 'react-file-base64';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)
        },
        justifyContent: 'space-between',
        flexDirection: "column",
        display: "flex"
    },
    previewImg:{
        marginTop: theme.spacing(2),
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        height: '250px',
    },
    button: {
        margin: theme.spacing(0.5)
    },
    buttonGroup: {
        justifyContent: 'flex-end',
        display: 'flex'
    }
}))

export const PopupForm = ({ Data, editNote }) => {
    const [noteData, setNoteData] = useState(Data);
    const classes = useStyles()

    const clear = () => {
        setNoteData({ title: '', message: '', tags: [], selectedFile: '' });
    };

    const handleSubmit = async (e) => {
        console.log(noteData)
        e.preventDefault();

        editNote(noteData);
    };

    useEffect(() => {
        if (!Data?.title) clear();
        if (Data) setNoteData(Data);
    }, [Data]);

    const handleAddChip = (tag) => {
        setNoteData({ ...noteData, tags: [...noteData.tags, tag] });
    };

    const handleDeleteChip = (chipToDelete) => {
        setNoteData({ ...noteData, tags: noteData.tags.filter((tag) => tag !== chipToDelete) });
    };

    return(
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField name="title" variant="outlined" label="Title" fullWidth
                               value={noteData.title}
                               onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />

                    <TextField name="message" variant="outlined" label="Message" fullWidth
                               multiline rows={6}
                               value={noteData.message} onChange={(e) => setNoteData({ ...noteData, message: e.target.value })} />

                    <div style={{ padding: '5px 0', width: '100%' }}>
                        <ChipInput
                            name="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth
                            value={noteData.tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                        />
                    </div>

                </Grid>

                <Grid item xs={6}>
                    <div>
                        <FileBase style={{display: 'none'}} id='file-input' type="file" multiple={false} onDone={({ base64 }) => setNoteData({ ...noteData, selectedFile: base64 })} />
                    </div>

                    <img alt={noteData.title} className={classes.previewImg} src={ noteData.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' } />

                    <ButtonGroup className={classes.buttonGroup} >
                        <Button className={classes.button}
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            text="Submit">Submit</Button>
                        <Button className={classes.button}
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={clear}>Clear</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </form>
    )
}