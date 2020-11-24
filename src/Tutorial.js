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

const content = [
  {
    title: "Welcome",
    image: "polygon.png",
    detailed:
      'This is a webGis created in the course TBA4251 at NTNU. To get a quick overview of the different functionality this GIS has to offer, I have created this tutorial. You can show and hide it as you please by using the "HIDE TUTORIAL" button at the bottom. \n Follow along with the instructions, using the arrows to go forwards or backwards. Enjoy! ',
  },
  {
    title: "Control Panel",
    image: "control_panel.png",
    detailed: "The main element of the app is the control panel in the top left corner. From this panel, you can add, remove, and manipulate layers in numerous ways. \n We will go through all the available functionality in this tutorial, but the functions themselves comes with a short tooltip if you hover over their \"question mark\" later on as well.",
  },
];

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
  },
}));

function RecipeReviewCard() {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [visible, setVisibility] = useState(false);

  const nextStep = () => {
    if (step + 1 < content.length) {
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
        image={require("./images/" + content[step].image)}
      />
      <CardActions className={classes.actions}>
        <IconButton className={classes.backward} onClick={prevStep}>
          <ArrowForward />
        </IconButton>
        <CardHeader title={content[step].title} titleTypographyProps={{variant:'h6' }}/>
        <IconButton className={classes.forward} onClick={nextStep}>
          <ArrowForward />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content[step].detailed.split("\n").map((i, key) => {
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
