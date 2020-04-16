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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: blueGrey[500],
  },
}));

export default function QuestionEntry({ question, sendLike }) {
  const classes = useStyles();

  const [selected, setSelected] = useState(false)
  const firstUpdate = useRef(true);

  const handleLike = () => {
    setSelected(!selected)
  }

  useEffect(() => {
    if(firstUpdate.current){
      firstUpdate.current = false;
      return;
    }
    sendLike(question.id);
  }, [selected]);

  let characters = ['무지', '콘', '어피치', '제이지', '프로도', '네오', '튜브', '라이언']
  let adj = ['부끄러운', '배고픈', '화난', '졸린', '기쁜', '저기여기들어오시면안되는', ''];

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            3PS
          </Avatar>
        }
        title={
          `${adj[Math.floor(Math.random() * (adj.length - 1) )]} ${characters[Math.floor(Math.random() * (characters.length - 1))]}`  
        }
        subheader={question.createdAt.slice(0,16).replace('T',' ')}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {question.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ToggleButton
          value="check"
          selected={selected}
          onChange={handleLike}
        >
          <Badge badgeContent={question.numberOfLikes} color="primary">
            <FavoriteIcon />
          </Badge>
        </ToggleButton>
      </CardActions>
    </Card>
  );
}
