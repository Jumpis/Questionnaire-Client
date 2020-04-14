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

export default function PresentatorQuestionEntry() {
  const classes = useStyles();

  const [answered, setAnswered] = React.useState(false);

  const handleAnswered = () => {
    setAnswered(!answered);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            3PS
          </Avatar>
        }
        title="질문자명" //props.wr
        subheader="April 10, 2020"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          PPPS 런칭이벤트 질문입니다. Made By 김환, 전진철, 머지빌런
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
