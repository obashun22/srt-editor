# SRT Editor

## 起動方法

1. `.env.sample`を`.env`に書き換える
1. 適切な環境変数を設定する
1. サーバを立ち上げる

   開発環境の場合

   1. `yarn install && yarn start`を実行

   本番環境の場合

   1. `yarn install && yarn build`を実行
   1. 生成された`build`ディレクトリをウェブサーバで公開
