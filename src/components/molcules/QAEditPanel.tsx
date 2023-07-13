import { Divider, Form, Grid, Segment, TextArea } from "semantic-ui-react";
import { memo, useCallback } from "react";
import { QABlock } from "../../types/QA";

type Props = {
  qaBlock: QABlock;
  onQABlockChange: (qaBlock: QABlock) => void;
};

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
    backgroundColor: "inherit",
  },
  input: {
    outline: "none",
    textAlign: "center",
    width: "22px",
    fontFamily: "inherit",
    // backgroundColor: "#f3f3f3",
  },
};

const LIMIT_LENGTH = 300;

export const QAEditPanel: React.VFC<Props> = memo(
  ({ qaBlock, onQABlockChange }) => {
    const preventClickEvent = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
    }, []);
    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const newQABlock = {
        ...qaBlock,
        [e.target.name]: e.target.value,
      };
      onQABlockChange(newQABlock);
    };

    const { id, question, answer } = qaBlock;
    return (
      <Segment className="text-left">
        <Grid stackable>
          <Grid.Row className="bg-gray-100">
            <Grid.Column width={3}>No.{id + 1}</Grid.Column>
            <Grid.Column width={13}>
              <Form onClick={preventClickEvent}>
                <div className="flex">
                  <strong className="text-lg">Q.</strong>
                  <TextArea
                    name="question"
                    style={styles.textarea}
                    value={question}
                    onChange={handleTextareaChange}
                  />
                </div>
              </Form>
              <p style={{ textAlign: "right" }}>
                {question.length}文字 / {LIMIT_LENGTH}文字
              </p>
            </Grid.Column>
          </Grid.Row>
          <Divider style={{ margin: 0 }} />
          <Grid.Row className="">
            <Grid.Column width={3} />
            <Grid.Column width={13}>
              <Form onClick={preventClickEvent}>
                <div className="flex">
                  <strong className="text-lg">A.</strong>
                  <TextArea
                    name="answer"
                    style={styles.textarea}
                    value={answer}
                    onChange={handleTextareaChange}
                  />
                </div>
              </Form>
              <p style={{ textAlign: "right" }}>
                {answer.length}文字 / {LIMIT_LENGTH}文字
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
);
