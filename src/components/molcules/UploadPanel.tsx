import { memo } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadPanel: React.VFC<Props> = memo((props) => {
  const { onChange } = props;
  return (
    <Segment placeholder>
      <Header icon>
        <Icon
          name="file audio"
          style={{ display: "inline-block", marginRight: "20px" }}
        />
        <p className="mt-6">音声ファイルをアップロードしてください。</p>
      </Header>
      <input
        className="mx-auto"
        type="file"
        accept=".wav,.mp3,.srt"
        onChange={onChange}
      />
    </Segment>
  );
});
