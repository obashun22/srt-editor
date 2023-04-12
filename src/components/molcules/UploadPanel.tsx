import { Segment, Header, Icon } from "semantic-ui-react";

export const UploadPanel = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="file audio" className="inline-block" /> or
        <Icon name="file text" className="inline-block" />
        <p className="mt-6">音声ファイルをアップロードしてください。</p>
      </Header>
      <input className="mx-auto" type="file" accept=".wav,.mp3" />
    </Segment>
  );
};
