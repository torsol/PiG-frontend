import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForwardIosOutlined";

var tutorialContent = require('../data/tutorial.json');

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  forward: {},
  backward: {
    transform: "rotate(-180deg)",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "0px"
  },
  content: {
    paddingTop: "0px",
    paddingBottom: "0px"
  }
}));

function RecipeReviewCard() {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [visible, setVisibility] = useState(false);

  const nextStep = () => {
    if (step + 1 < tutorialContent.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step - 1 >= 0) {
      setStep(step - 1);
    }
  };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  return visible ? (
    <Card className="tutorial">
      <CardMedia
        className={classes.media}
        image={require("../images/" + tutorialContent[step].image)}
      />
      <CardActions className={classes.actions}>
        <IconButton className={classes.backward} onClick={prevStep}>
          <ArrowForward />
        </IconButton>
        <CardHeader title={tutorialContent[step].title} titleTypographyProps={{variant:'h6' }}/>
        <IconButton className={classes.forward} onClick={nextStep}>
          <ArrowForward />
        </IconButton>
      </CardActions>
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {tutorialContent[step].detailed.split("\n").map((i, key) => {
            return <p key={key}>{i}</p>;
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="black" onClick={toggleVisibility}>
          Hide tutorial
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Card className="showtutorial">
      <Button size="large" onClick={toggleVisibility}>
        Show Tutorial
      </Button>
    </Card>
  );
}

export default RecipeReviewCard;
