import {
  Form,
  Grid,
  Icon,
  Progress,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { SrtBlock } from "../../types/Srt";
import { memo, useCallback, useEffect, useState } from "react";

type Props = {
  srtBlock: SrtBlock;
  onSrtBlockChange: (srtBlock: SrtBlock) => void;
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

export const EditPanel: React.VFC<Props> = memo((props) => {
  const { srtBlock, onSrtBlockChange } = props;

  const onPanelClick = useCallback(() => {
    console.log("panel clicked");
  }, []);
  const preventClickEvent = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);
  const handleTimecodeChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      type: "start" | "end",
      scale: "hours" | "minutes" | "seconds"
    ) => {
      const newSrtBlock = {
        ...srtBlock,
        [type]: {
          ...srtBlock.start,
          [scale]: parseInt(e.target.value.toString().slice(-2)),
        },
      };
      onSrtBlockChange(newSrtBlock);
    },
    [srtBlock, onSrtBlockChange]
  );
  const handleSubtitleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newSrtBlock = {
        ...srtBlock,
        subtitle: e.target.value,
      };
      onSrtBlockChange(newSrtBlock);
    },
    [srtBlock, onSrtBlockChange]
  );

  const { start, end, subtitle } = srtBlock;
  return (
    <Segment className="text-left cursor-pointer" onClick={onPanelClick}>
      <Grid stackable>
        <Grid.Column width={4}>
          <div className="">
            <div
              className="inline-block cursor-default mr-1"
              onClick={preventClickEvent}
            >
              <DigitInput
                digits={start.hours}
                onChange={(e) => handleTimecodeChange(e, "start", "hours")}
              />
              {" : "}
              <DigitInput
                digits={start.minutes}
                onChange={(e) => handleTimecodeChange(e, "start", "minutes")}
              />
              {" : "}
              <DigitInput
                digits={start.seconds}
                onChange={(e) => handleTimecodeChange(e, "start", "seconds")}
              />
              {" - "}
            </div>
            <div
              className="inline-block cursor-default"
              onClick={preventClickEvent}
            >
              <DigitInput
                digits={end.hours}
                onChange={(e) => handleTimecodeChange(e, "end", "hours")}
              />
              {" : "}
              <DigitInput
                digits={end.minutes}
                onChange={(e) => handleTimecodeChange(e, "end", "minutes")}
              />
              {" : "}
              <DigitInput
                digits={end.seconds}
                onChange={(e) => handleTimecodeChange(e, "end", "seconds")}
              />
            </div>
          </div>
        </Grid.Column>
        <Grid.Column width={11}>
          <Form onClick={preventClickEvent}>
            <TextArea
              style={styles.textarea}
              value={subtitle}
              onChange={handleSubtitleChange}
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={1} className="text-right">
          <Icon name="trash" color="grey" link onClick={preventClickEvent} />
        </Grid.Column>
      </Grid>
      <Progress percent={Math.random() * 100} attached="bottom" color="blue" />
    </Segment>
  );
});

type DigitInputProps = {
  digits: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DigitInput: React.VFC<DigitInputProps> = memo((props) => {
  const { digits, onChange } = props;
  return (
    <input
      value={digits.toString().padStart(2, "0").slice(-2) ?? "00"}
      min={0}
      max={99}
      style={styles.input}
      onChange={onChange}
    />
  );
});
