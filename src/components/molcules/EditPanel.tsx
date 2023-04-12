import { Form, Grid, Progress, Segment, TextArea } from "semantic-ui-react";

type stylesType = {
  textarea: React.CSSProperties;
  input: React.CSSProperties;
};

const styles: stylesType = {
  textarea: {
    padding: "5px",
    border: "none",
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
  },
  input: {
    outline: "none",
    textAlign: "center",
    width: "22px",
    fontFamily: "inherit",
    backgroundColor: "#f3f3f3",
  },
};

export const EditPanel = () => {
  const onPanelClick = () => {
    console.log("panel clicked");
  };
  const cancelClickEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <Segment className="text-left cursor-pointer" onClick={onPanelClick}>
      <Grid>
        <Grid.Column width={5}>
          <div
            className="inline-block cursor-default"
            onClick={cancelClickEvent}
          >
            <DigitInput />
            {" : "}
            <DigitInput />
            {" : "}
            <DigitInput />
            {" -  "}
          </div>
          <div
            className="inline-block cursor-default"
            onClick={cancelClickEvent}
          >
            <DigitInput />
            {" : "}
            <DigitInput />
            {" : "}
            <DigitInput />
          </div>
        </Grid.Column>
        <Grid.Column width={11}>
          <Form onClick={cancelClickEvent}>
            <TextArea
              style={styles.textarea}
              value={
                "ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
              }
            />
          </Form>
        </Grid.Column>
      </Grid>
      <Progress percent={Math.random() * 100} attached="bottom" color="blue" />
    </Segment>
  );
};

const DigitInput: React.VFC = () => {
  return (
    <input
      // value={0}
      min={0}
      max={99}
      style={styles.input}
    />
  );
};
