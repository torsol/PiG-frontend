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

// load the content of the tutorial
var tutorialContent = require('../data/tutorial.json');

// styles that came witht he Material UI template
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

/** 
*The tutorial is the component in the top-right corner 
*/
function Tutorial() {
  const classes = useStyles();

  // the state of the tutorial, controlling visibility and step
  const [step, setStep] = useState(0);
  const [visible, setVisibility] = useState(false);

  // incrementing the step
  const nextStep = () => {
    if (step + 1 < tutorialContent.length) {
      setStep(step + 1);
    }
  };

  // decrement the step
  const prevStep = () => {
    if (step - 1 >= 0) {
      setStep(step - 1);
    }
  };

  // toggle the visibility
  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  return visible ? (
    <Card className="tutorial">
      {/*The card is a material UI component containing the tutorial*/}
      <CardMedia
        className={classes.media}
        image={require("../images/" + tutorialContent[step].image)}
      />
      {/*THe cardmedia is responsible for showing the correct image for each step*/}
      <CardActions className={classes.actions}>
        {/*The card actions contains the title of the step, including the step forward and backward-functionality*/}
        <IconButton className={classes.backward} onClick={prevStep}>
          <ArrowForward />
        </IconButton>
        <CardHeader title={tutorialContent[step].title} titleTypographyProps={{variant:'h6' }}/>
        <IconButton className={classes.forward} onClick={nextStep}>
          <ArrowForward />
        </IconButton>
      </CardActions>
      <CardContent className={classes.content}>
        {/*All the paragraphs are rendered here*/}
        <Typography variant="body2" color="textSecondary" component="p">
          {tutorialContent[step].detailed.split("\n").map((i, key) => {
            return <p key={key}>{i}</p>;
          })}
          {tutorialContent[step].link ? (<a href={tutorialContent[step].link}>Get file here</a>): <p/>}
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
      {/*The button that is shown when the tutorial is hidden*/}
      <Button size="large" onClick={toggleVisibility}>
        Show Tutorial
      </Button>
    </Card>
  );
}

export default Tutorial;
