---
title: Macで開発する際よく使う「ターミナル」の使い方についてと主要なコマンドを解説
path: terminal
created: 2019-10-19T00:00:00.000Z
updated: 2019-10-19T00:00:00.000Z
excerpt: Macで開発を行う際には必ず使うことになる「ターミナル」を最低限使うことができるように主要なコマンドを解説するよ。
featuredImage: ../assets/thumbs/Terminal.jpg
tags:
  - 入門
  - ターミナル
---
### 「ターミナル」でできること
みんなんはファイルを移動したりコピーしたりする時、Macであれば「Finder」,Windowsであれば「FileExplorer」を使ったことがあると思うよ。  
それに対してターミナルでは黒い画面上に様々なコマンドを打ち込むことで、それと同様の操作を行うことができるよ。その他にもアプリケーションをインストールしたり様々な処理を行うことができるるよ。

#### 〜コラム〜 GUIとCUI
本筋からは逸れるけど、ファイルを操作する際に使う「Finder」と言うアプリは直感的にわかりやすい外観から操作するGUI(Graphical User Interface)と呼ばれるのに対して、ターミナルは主にコマンドなどの文字情報から操作するCUI(Character User Interface)と呼ばれるよ。

## 代表的なターミナルコマンド
真っ黒な背景に文字だけの画面でとっつきにくく感じるかもしれないけど、全く難しいものでは無いよ。コマンドは沢山あるのだけど、その都度調べて使えば問題ないよ。ここではその中でも頻繁に使う、最低限覚えておくと良いコマンドを紹介するよ。

#### ターミナルを開くその前に
Mac標準搭載されている「Terminal」アプリでも良いんだけど、その代わりに「**iTerm2**」というアプリを使うことを猛烈にオススメするよ。見た目の良さや補完機能が備わっていたりと標準搭載のターミナルの上位互換と言っても良いよ。iTerm2は下のリンクからダウンロードできるよ。
- [iTerm2 - macOS Terminal Replacement](https://iterm2.com/)

### pwd: 現在地の確認
``` bash
pwd
```

### ls: フォルダ・ファイルを一覧表示
由来は「list」。
``` bash
ls
```

###  mkdir: ディレクトリの作成
由来は「make directory」。
``` bash
mkdir directory
```

### cd: 参照するディレクトリを移動
由来は「change directory」。`pwd`コマンドで現在参照しているディレクトリを確認するとわかると思うよ。
``` bash
cd directory
pwd
```
上の階層に戻りたい時は`../`
``` bash
cd ../
pwd
```

### touch: ファイルの作成
``` bash
touch newfile
ls
```

### rm: ファイル・ディレクトリの消去
ファイルを消去するコマンドだよ。由来は「remove(消去する)」。ディレクトリとその中身ごと消去したい時は`-r`が必要だよ。
``` bash
rm newfile
rm -r directory
```

## ターミナルでこれだけはやっておこう！
ターミナルの使い方がわかったところでCUIツールをインストールしておこう。必ず使うよ。
### homebrewのインストール
``` bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
homebrewについての詳細はこちらです。[homebrewのインストールと使い方](#)
### XCode CommandLineTool
``` bash
xcode-select install
```
### Carthageのインストール

``` bash
brew install carthage
```
- [carthageのインストールと使い方](#)
### Git
- [gitの使い方](#)
