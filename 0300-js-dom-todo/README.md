
# 01-0300-JS-DOM-TODO

このリポジトリ はHTML, CSS(SASS), JavaScriptの練習用リポジトリです。

デモ: https://version1-workspace.github.io/ws-01-0100-fe-materials/0300-js-dom-todo

デモをみながら同じようなアプリを実装してください。

## 準備

課題に取り組む前にnode.jsのインストールが必要です。下記記事にしたがってインストールをしてください。

- [nvm +  Node.js + npmのインストール - Qiita](https://qiita.com/sansaisoba/items/242a8ba95bf70ba179d3#mac%E3%81%AE%E5%A0%B4%E5%90%88)


## 課題で身に着けること

- DOM への基本的な理解
- DOM操作
- データと振る舞いの分離
- EventListenerの使い方
- HTML, CSS, JSの分離

## 課題の進め方

#### 準備

また、下記概念を理解して課題を行うようにしてください。

#### DOMについて

- [MDN | DOM の紹介](https://developer.mozilla.org/ja/docs/Web/API/Document_Object_Model/Introduction)
- [MDN | ドキュメントの操作](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

#### イベントについて

- [MDN | イベントの紹介](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Building_blocks/Events)
- [EventTarget.addEventListener() - Web APIs | MDN](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)

#### 関数型プログラミングの基礎(データと振る舞いの分離)

- [関数型プログラミング入門]()

#### 1. 留意事項を確認する

1. JavaScriptでのイベントの実装はaddEventListenerを利用することhtml内でのイベントの登録は行わない。

英語: [EventTarget.addEventListener() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

日本語: [EventTarget.addEventListener() - Web APIs | MDN](https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener)

2. htmlのDOMに直接スタイルをあてない、またはjsでDOMのスタイルを書き換えるのではなく、クラスを付与することでスタイルを変化させること。
3. 関数型プログラミングの考え方にのっとって、状態と振る舞いを分離させること
4. 成果物はGithub Pagesにて公開する。(gh-pagesブランチをつくってPUSHするだけ）
5. cssのスタイルはSASS記法でBEMの考えに則って実装する
6. 上記ルールに則りながら必要に応じて自分でファイルを追加・編集する


#### 3. sassのコンパイル

```
cd 0300-js-dom-todo
npm install
npm run compile:css
```

サーバが起動していることを確認して、HTMLを開く。以降はnodeのサーバを起動しながら開発を行う。

#### 4. github pagesにてサイトを公開

作業が終わったら変更をコミット & pushしてリモートリポジトリ に変更を反映させます。 masterへの変更が終わったら下記手順でサイトをgithub ページ上に公開してください。

https://docs.github.com/ja/pages/getting-started-with-github-pages/creating-a-github-pages-site


### FAQ
