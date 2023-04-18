import { memo } from "react";
import { Icon, Segment } from "semantic-ui-react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AudioUploadPanel: React.VFC<Props> = memo((props) => {
  const { onChange } = props;
  return (
    <div className="mt-6">
      <Segment>
        <p>
          <Icon name="file audio" size="big" />
          音声ファイルをアップロードしてください。
        </p>
        <input
          className="mx-auto"
          type="file"
          accept=".wav,.mp3"
          onChange={onChange}
        />
      </Segment>
    </div>
  );
});
