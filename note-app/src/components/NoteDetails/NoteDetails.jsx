import React, { useEffect,useState } from 'react';
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getNote, updateNote } from '../../actions/notes';
import StarIcon from '@material-ui/icons/Star';
import useStyles from './styles';
import RateReviewIcon from '@material-ui/icons/RateReview';
import {Tooltip, withStyles, Zoom} from "@material-ui/core";
import Popup from "../PopupDialog/Popup";
import {PopupForm} from "../PopupDialog/PopupForm";

const WhiteTooltip = withStyles({
  tooltip: {
    backgroundColor: '#ffc30b',
    color: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
  }
})(Tooltip);

const BlueTooltip = withStyles({
  tooltip: {
    backgroundColor: '#3f51b5',
    color: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
  }
})(Tooltip);

const Note = () => {
  const { note, notes, isLoading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getNote(id));
  }, [id]);


  const [openPopup,setOpenPopup] = useState(false)

  if (!note)
    return(
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );

  const editNote = (noteData) => {
    dispatch(updateNote(id, { ...noteData }));
    setOpenPopup(false)
    window.location.reload();
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {note.title} {note.isImportant ? (
                <WhiteTooltip title="This note is Important !!!" placement={"right-start"} TransitionComponent={Zoom}>
                  <StarIcon className={classes.iconImportant}/>
                </WhiteTooltip>
          ): (<></>) }
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{note.tags.map((tag) => (
            <Link key={note.tags.indexOf(tag)} to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography variant="body1">
            <strong>Created at: {moment(note.createAt).format("DD/MM/YYYY")}</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography gutterBottom variant="h6" component="p" className={classes.messageContent}>{note.message}</Typography>
          <BlueTooltip title={`Last edit: ${moment(note.updateAt).format("DD/MM/YYYY")}`} placement={"top-start"}>
            <Button className={classes.buttonEdit} onClick={()=>setOpenPopup(true)}>
              <RateReviewIcon className={classes.iconEdit} />
            </Button>
          </BlueTooltip>
          
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={note.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={note.title} />
        </div>
      </div>
      <Popup title = "Editing Note" openPopup = {openPopup} setOpenPopup = {setOpenPopup}>
        <PopupForm Data={note} editNote={editNote}/>
      </Popup>
    </Paper>
  );
};

export default Note;
