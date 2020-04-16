import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Badge from '@material-ui/core/Badge';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  answeredBtn: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: blueGrey[500],
  },
}));

export default function PresentatorQuestionEntry({ question, sendAnswered }) {

  const classes = useStyles();
  const firstUpdate = useRef(true);

  const [answered, setAnswered] = useState(question.answered)

  useEffect(() => {
      if(firstUpdate.current){
        firstUpdate.current = false;
      return;
    }
    sendAnswered(answered, question.id);
  }, [answered]);
  
  const handleAnswered = () => {
    setAnswered(!answered)
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            3PS
          </Avatar>
        }
        title='question' //props.wr
        subheader={question.createdAt.slice(0,16).replace('T',' ')}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {question.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Badge badgeContent={question.numberOfLikes}  color="primary">
          <FavoriteIcon />
        </Badge>
        <ToggleButton
          className={classes.answeredBtn}
          value="check"
          selected={answered}
          onChange={handleAnswered}
        >
          <CheckIcon />
        </ToggleButton>
      </CardActions>
    </Card>
  );
}
