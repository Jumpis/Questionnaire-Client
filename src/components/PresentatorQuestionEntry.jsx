import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Badge from '@material-ui/core/Badge';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import useStateWithCallback from 'use-state-with-callback';

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

  const [answered, setAnswered] = useStateWithCallback(question.answered, answered => {
    // 소켓아이오 연결해서 서버를 통해 DB asnwered 부분 변경 요청 보내기
    sendAnswered(answered, question.id);
  })

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
        title={question.questioner} //props.wr
        subheader={question.createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {question.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Badge badgeContent={4} color="primary">
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
