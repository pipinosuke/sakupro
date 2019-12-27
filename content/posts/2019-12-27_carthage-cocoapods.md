---
title: 【CarthageとCocoadpods】 2種類のライブラリ管理ツールとその使い分けについて解説
path: carthage-cocoapods
created: 2019-12-27T12:57:21.342Z
updated: 2019-12-27T12:57:21.364Z
excerpt: >-
  iOSに限らずアプリ開発では何らかのライブラリを用いるのが普通だよ。iOS開発ではCarthageとCocoapods、二種類のライブラリ管理ツールが用意されており、ここではその使い分けについて解説しているよ。
featuredImage: ../assets/thumbs/xcode.jpg
tags:
  - iOSアプリ
---

## 使い分けはCarthageを優先する
両者の使い分けについて明確な正解があるわけではないけど比較すると

> - Carthageの方がCocoapodsと比較して軽量である

と言えるよ。したがってそのライブラリが「Carthageで導入できるものであれば優先的にCarthageで導入し、それ以外はCocoapodsで導入する」という使い分けが良いとされているよ。

### Carthage・Cocoapodsの導入方法
どちらもHomebrewでインストールすることができるよよ。`brew`コマンドが使えない場合は、[homebrewの解説](#)を参考にインストールを済ませておこう。
```bash
brew install carthage
brew install cocoapods
```

付随してコマンドラインツールのインストールも必要だよ
``` bash
xcode-select --install
```
それぞれの仕様と使い方についてまとめておくよ

## Carthageの仕様と使い方

### Carthageの仕様
- 導入するライブラリの情報は`Cartfile`に記述する
- バージョン情報は`Cartfile.resolved`が自動生成される
- ライブラリのソースファイルたちは`Carthage/`内に保存されるが、gitの管理対象からは外す

### Carthageの使い方
プロジェクトファイルのルートディレクトリに移動します。
#### `Cartfile`の作成と記述
``` bash
touch Cartfile
```
Cartfile内の記述は下のように導入したいライブラリのgithubレポジトリ名を指定します。
```vim
github "ishkawa/APIKit"
github "onevcat/Kingfisher"
```
####  ビルド
Cartfileへの記述が終わったら次はビルドコマンドを打ち込みます。
``` bash
carthage install --platform iOS --no-use-binaries
```
ビルドする際は`carthage install`にオプションを2つつけておくと良いです。簡単に解説すると`--platform iOS`のようにデバイスを指定することでビルド時間を短縮できます。`--no-use-binaries`を付けるとバイナリデータからのビルドではなく、ソースコードからコンパイルすることでビルドを行うことができます。そこそこ時間はかかります。

- [カルタゴの「--no-use-binaries」の目的は何ですか](https://www.code-adviser.com/detail_41442601)

#### .gitignoreファイルの編集
ビルドが完了すると`Carthage`というフォルダが生成されているはずです。このフォルダの中にはライブラリのソースファイルが格納されていますが、このソースファイルをgitで管理しません。`.gitignore`を編集し、**Carthage以下のファイル群はgit管理下から外しておく**のを忘れないようにしましょう。その代わりにライブラリの情報が記述されている`Cartfile`と`Cartfile.resolved` のみを管理するようにしましょう

``` bash
vim .gitignore
```
等のコマンドでエディタを開いて
``` vim
Carthage/
```
を追記


## Cocoapodsの仕様と使い方
現在執筆中・・・
### 仕様
- 導入するライブラリの情報は`Cartfile`に記述する
- バージョン情報は`Cartfile.resolved`が自動生成される
- ライブラリのソースファイルたちは`Pods/`内に保存されるが、gitの管理対象からは外す
- xcodeproj

### 使い方
``` bash
touch Podfile
```

### Cocoapods


## まとめ
> - Carthageを優先的に使う
> - 両者ともにライブラリのソースファイル自体を管理するのではなく、`Cartfile`や`Podfile`のような各ライブラリのバージョン情報が記述されたファイルのみ管理する