import { Form, Grid, Segment, TextArea } from "semantic-ui-react";

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
    textAlign: "right",
    width: "20px",
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
        <Grid.Column width={4}>
          <div className="inline-block" onClick={cancelClickEvent}>
            <DigitInput />
            :
            <DigitInput />
            :
            <DigitInput />-
          </div>
          <div className="inline-block" onClick={cancelClickEvent}>
            <DigitInput />
            :
            <DigitInput />
            :
            <DigitInput />
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <Form onClick={cancelClickEvent}>
            <TextArea style={styles.textarea} />
          </Form>
        </Grid.Column>
      </Grid>
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
