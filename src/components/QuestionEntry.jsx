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

export default function QuestionEntry({ question }) {
  const classes = useStyles();

  const [selected, setSelected] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            3PS
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <DeleteIcon />
        //   </IconButton>
        // }
        title="PPPS 런칭이벤트 설문"
        subheader="April 10, 2020"
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
          onChange={() => {
            setSelected(!selected);
          }}
        >
          <Badge badgeContent={4} color="primary">
            <FavoriteIcon />
          </Badge>
        </ToggleButton>
      </CardActions>
    </Card>
  );
}
