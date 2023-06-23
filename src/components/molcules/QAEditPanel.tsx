import {
  Divider,
  Form,
  Grid,
  Progress,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { memo, useCallback, useContext, useState } from "react";
import { QABlock } from "../../types/Task";

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
    const handleTextareaChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newSrtBlock = {
          ...qaBlock,
          subtitle: e.target.value,
        };
        onQABlockChange(newSrtBlock);
      },
      [qaBlock, onQABlockChange]
    );

    const { id, question, answer } = qaBlock;
    return (
      <Segment className="text-left cursor-pointer">
        <Grid stackable>
          <Grid.Column width={16}>
            {id}
            <Form onClick={preventClickEvent}>
              <TextArea
                style={styles.textarea}
                value={question}
                onChange={handleTextareaChange}
              />
            </Form>
            <p style={{ textAlign: "right" }}>
              {question.length}文字 / {LIMIT_LENGTH}文字
            </p>
            <Divider />
            <Form onClick={preventClickEvent}>
              <TextArea
                style={styles.textarea}
                value={answer}
                onChange={handleTextareaChange}
              />
            </Form>
            <p style={{ textAlign: "right" }}>
              {answer.length}文字 / {LIMIT_LENGTH}文字
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
);
