import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForwardIosOutlined";

const content = [
  {
    title: "Step 1 - Draw Polygon",
    subheader: "We will learn to draw a polygon",
    detailed: "Just do it idiot",
  },
  {
    title: "Step 1 - Draw Polygon",
    subheader: "We will learn to draw a polygon",
    detailed: "Ok, I will tell you how to do it",
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

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step -1);
  };

  return (
    <Card className={"tutorial"}>
      <CardMedia
        className={classes.media}
        image={require("./images/polygon.png")}
      />
      <CardHeader
        title={content[step].title}
        subheader={content[step].subheader}
        
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          The first step of the tutorial is to draw a polygon.
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton className={classes.backward} onClick={prevStep}>
          <ArrowForward />
        </IconButton>
        <IconButton className={classes.forward} onClick={nextStep}>
          <ArrowForward />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography paragraph>{content[step].detailed}</Typography>
      </CardContent>
    </Card>
  );
}
