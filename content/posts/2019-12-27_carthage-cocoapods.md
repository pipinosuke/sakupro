---
title: 【CarthageとCocoadpods】 2種類のライブラリ管理ツールとその使い分けについて解説
path: carthage-cocoapods
created: 2019-12-27T12:57:21.342Z
updated: 2020-01-04T12:57:21.364Z
excerpt: >-
  iOSに限らずアプリ開発では何らかのライブラリを用いるのが普通だよ。iOS開発ではCarthageとCocoapods、二種類のライブラリ管理ツールが用意されており、ここではその使い分けについて解説しているよ。
featuredImage: ../assets/thumbs/xcode.jpg
tags:
  - iOSアプリ
---
## 使い分けはCarthageを優先する
まず両者の運用やパフォーマンスについての要点を簡単にまとめるとこうなるよ

> - CocoaPodsとCarthageは併用可能
> - CocoaPodsでしかインストールできないライブラリも存在する
> - Carthageの方がCocoaPodsと比較して軽量である

両者の使い分けについて明確な正解があるわけではないけど、上記のことを鑑みると一般に「**Carthageで導入できるライブラリは優先的にCarthageで導入し、それ以外はCocoaPodsで導入する**」という使い分けが良いとされているよ

### Carthage・CocoaPodsの導入方法
Carthageは`Homebrew`、CocoaPodsは`Gem`でインストールすることができるよよ。
#### ・Carthageの導入
`brew`コマンドが使えない場合は[homebrewの解説](#)を参考にインストールを済ませておこう。
```bash
brew install carthage
```
#### ・CocoaPodsの導入
CocoaPodsはgemを使ってインストールする。`gem`コマンドが使えない場合は、
```bash
sudo gem install cocoapods
pod setup
```

付随してコマンドラインツールのインストールも必要だよ。まだの人はやっておこう
``` bash
xcode-select --install
```
次にそれぞれの仕様と使い方についてまとめておくよ

## CocoaPodsの仕様と使い方
CocoaPodsはCarthageと比べて比較的楽に導入できるので、先に解説してしまうよ

### ・CocoaPodsの仕様
まずCocoaPodsの主な仕様をまとめるとこんな感じだよ

> - 導入するライブラリの情報は`Podfile`に記述する
> - 各ライブラリのバージョン情報はインストール時に自動生成される`Podfile.lock`に保存されている
> - インストール時に拡張子`.xworkspace`のファイルが自動生成される。CocoaPodsでインストールしたライブラリをインポートし使うことができる
> - ライブラリのソースファイルは`Pods/`内に保存されるが、gitの管理対象からは外す

### ・CocoaPodsの使い方
仕様がわかったところで次に実際の使い方について説明するよ

#### 1. Podfileの編集
まずプロジェクトのルートディレクトリ下で以下のコマンドを実行するよ
``` bash
pod init
```
すると`Podfile`というファイルが自動生成されるよ。この`Podfile`にインポートしたいライブラリの情報を記述するよ。例えば定番ライブラリのRealmSwiftをインストールしたい時はPodfileはこのようになるよ
``` 
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Sample' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for Sample
  pod 'RealmSwift'  #追記
end
```

まぁ簡単だね

#### 2. インストール
Podfileの編集が完了したら、以下のコマンドでライブラリのインストールを行うよ
``` bash
pod install
```
インストールが終了すると拡張子が`.xcworkspace`というファイルが自動生成されるよね。以後、cocoapodsでインストールしたライブラリを使って開発する際はこのファイルをプロジェクトファイルとして使うよ。

#### 3. .gitignoreファイルの編集
最後にインストールが完了すると`Pods`というフォルダが生成されているはず。このフォルダの中にはライブラリのソースファイルが格納されているけど、このソースファイルはgitで管理しないよ。  
ではどうするかというと`.gitignore`を編集し、**「Pods」以下のファイル群はgit管理下から外しておけばおk**だよ。その代わりにライブラリとそのバージョン情報が記述されている`Podfile`と`Podfile.lock` のみを管理するようにするのが良いよ。

``` bash
vim .gitignore
```
等のコマンドでエディタを開いて追記
``` vim
Pods/*
```

## Carthageの仕様と使い方
続いてCarharthageの仕様と使い方について説明していくよ。Cocoapodsと比べると若干工数がかかるよ

### ・Carthageの仕様
まずCarthageの主な仕様をまとめるとこうなるよ

> - 導入するライブラリの情報は`Cartfile`に記述する
> - 各ライブラリのバージョン情報はライブラリのビルド時に自動生成される`Cartfile.resolved`に保存される
> - ライブラリのソースファイルたちは`Carthage/`内に保存されるが、gitの管理対象からは外す

### ・Carthageの使い方
続いてCarthageの使い方について説明するよ。まずプロジェクトファイルのルートディレクトリに移動します。
#### 1. `Cartfile`の作成と記述
touchコマンドでCartfileを作成するよ。
``` bash
touch Cartfile
```
Cartfileには下のように導入したいライブラリのgithubレポジトリ名を記述するよ。
```vim
github "ishkawa/APIKit"
github "onevcat/Kingfisher"
```
####  2. ビルド
Cartfileへの記述が終わったら次はビルドコマンドを打ち込むよ。
``` bash
carthage install --platform iOS --no-use-binaries
```
ビルドする際は`carthage install`にオプションを2つつけておくと良いです。簡単に解説すると`--platform iOS`のようにデバイスを指定することでビルド時間を短縮できます。`--no-use-binaries`を付けるとバイナリデータからのビルドではなく、ソースコードからコンパイルすることでビルドを行うことができます。そこそこ時間はかかります。

- [カルタゴの「--no-use-binaries」の目的は何ですか](https://www.code-adviser.com/detail_41442601)

#### 3. Build Phasesの設定で.frameworkファイルのインポートを行う
CocoaPodsと違いCarthageでビルドしたライブラリをインポートするためにはxcodeでプロジェクトファイルを選択し「TARGETS」→「Build Phases」の項目にいくつか設定を追加する必要があります。

「Link Binary with Libaries」の欄を選択し、「＋ボタン」→「add other...」→「add Files」と進み、「Carthage/Build/iOS」フォルダ内にある拡張子が`.framework`のものを選択します。下の画像を例にするとAPIKit.frameworkというライブラリが追加されているのがわかると思います

![enter image description here](https://i.gyazo.com/f1b2f9b7f414c021633791fb45f651de.png)

続いて左上の「＋ボタン」→「New Run Script Phase」を選択します。すると「Run Script」という項目が追加されるので、まずShellの欄に以下のスクリプトを記入します
``` bash
/usr/local/bin/carthage copy-frameworks
```
次に「Input files」の欄でファイルパスを記入します。hogehoge.frameworkのところは導入するライブラリに応じて適宜変更してください。
``` vim
$(SRCROOT)/Carthage/Build/iOS/hogehoge.framework
```
例えばAPIKitというライブラリを導入したい時は下のように設定します。
![enter image description here](https://i.gyazo.com/06861701e15a077758ae92853376310c.png)

#### 4 .gitignoreファイルの編集
最後に、ビルドが完了すると`Carthage`というフォルダが生成されているはず。このフォルダの中にはライブラリのソースファイルが格納されているけど、このソースファイルをgitで管理しないよ。`.gitignore`を編集し、**Carthage以下のファイル群はgit管理下から外しておけばおk**だよ。その代わりにライブラリの情報が記述されている`Cartfile`と`Cartfile.resolved` のみを管理するようにしよう

``` bash
vim .gitignore
```
等のコマンドでエディタを開いて以下を追記
``` vim
Carthage/*
```


## まとめ
> - CarthageはCocoapodsに比べて軽量。よってCarthageでインストールできるライブラリはCarthageを使おう
> - 両者ともにライブラリのソースファイル自体を管理するのではなく、`Cartfile`や`Podfile`のような各ライブラリのバージョン情報が記述されたファイルのみ管理しよう## 使い分けはCarthageを優先する
まず両者の運用やパフォーマンスについての要点を簡単にまとめるとこうなるよ

> - CocoaPodsとCarthageは併用可能
> - CocoaPodsでしかインストールできないライブラリも存在する
> - Carthageの方がCocoaPodsと比較して軽量である

両者の使い分けについて明確な正解があるわけではないけど、上記のことを鑑みると一般に「**Carthageで導入できるライブラリは優先的にCarthageで導入し、それ以外はCocoaPodsで導入する**」という使い分けが良いとされているよ

### Carthage・CocoaPodsの導入方法
Carthageは`Homebrew`、CocoaPodsは`Gem`でインストールすることができるよよ。
#### ・Carthageの導入
`brew`コマンドが使えない場合は[homebrewの解説](#)を参考にインストールを済ませておこう。
```bash
brew install carthage
```
#### ・CocoaPodsの導入
CocoaPodsはgemを使ってインストールする。`gem`コマンドが使えない場合は、
```bash
sudo gem install cocoapods
pod setup
```

付随してコマンドラインツールのインストールも必要だよ。まだの人はやっておこう
``` bash
xcode-select --install
```
次にそれぞれの仕様と使い方についてまとめておくよ

## CocoaPodsの仕様と使い方
CocoaPodsはCarthageと比べて比較的楽に導入できるので、先に解説してしまうよ

### ・CocoaPodsの仕様
まずCocoaPodsの主な仕様をまとめるとこんな感じだよ

> - 導入するライブラリの情報は`Podfile`に記述する
> - 各ライブラリのバージョン情報はインストール時に自動生成される`Podfile.lock`に保存されている
> - インストール時に拡張子`.xworkspace`のファイルが自動生成される。CocoaPodsでインストールしたライブラリをインポートし使うことができる
> - ライブラリのソースファイルは`Pods/`内に保存されるが、gitの管理対象からは外す

### ・CocoaPodsの使い方
仕様がわかったところで次に実際の使い方について説明するよ

#### 1. Podfileの編集
まずプロジェクトのルートディレクトリ下で以下のコマンドを実行するよ
``` bash
Pod init
```
すると`Podfile`というファイルが自動生成されるよ。この`Podfile`にインポートしたいライブラリの情報を記述するよ。例えば定番ライブラリのRealmSwiftをインストールしたい時はPodfileはこのようになるよ
``` 
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'Sample' do
  # Comment the next line if you don't want to use dynamic frameworks
  use_frameworks!

  # Pods for Sample
  pod 'RealmSwift'  #追記
end
```

まぁ簡単だね

#### 2. インストール
Podfileの編集が完了したら、以下のコマンドでライブラリのインストールを行うよ
``` bash
pod install
```
インストールが終了すると拡張子が`.xcworkspace`というファイルが自動生成されるよね。以後、cocoapodsでインストールしたライブラリを使って開発する際はこのファイルをプロジェクトファイルとして使うよ。

#### 3. .gitignoreファイルの編集
最後にインストールが完了すると`Pods`というフォルダが生成されているはず。このフォルダの中にはライブラリのソースファイルが格納されているけど、このソースファイルはgitで管理しないよ。  
ではどうするかというと`.gitignore`を編集し、**「Pods」以下のファイル群はgit管理下から外しておけばおk**だよ。その代わりにライブラリとそのバージョン情報が記述されている`Podfile`と`Podfile.lock` のみを管理するようにするのが良いよ。

``` bash
vim .gitignore
```
等のコマンドでエディタを開いて追記
``` vim
Pods/*
```

## Carthageの仕様と使い方
続いてCarharthageの仕様と使い方について説明していくよ。Cocoapodsと比べると若干工数がかかるよ

### ・Carthageの仕様
まずCarthageの主な仕様をまとめるとこうなるよ

> - 導入するライブラリの情報は`Cartfile`に記述する
> - 各ライブラリのバージョン情報はライブラリのビルド時に自動生成される`Cartfile.resolved`に保存される
> - ライブラリのソースファイルたちは`Carthage/`内に保存されるが、gitの管理対象からは外す

### ・Carthageの使い方
続いてCarthageの使い方について説明するよ。まずプロジェクトファイルのルートディレクトリに移動します。
#### 1. `Cartfile`の作成と記述
touchコマンドでCartfileを作成するよ。
``` bash
touch Cartfile
```
Cartfileには下のように導入したいライブラリのgithubレポジトリ名を記述するよ。
```vim
github "ishkawa/APIKit"
github "onevcat/Kingfisher"
```
####  2. ビルド
Cartfileへの記述が終わったら次はビルドコマンドを打ち込むよ。
``` bash
carthage install --platform iOS --no-use-binaries
```
ビルドする際は`carthage install`にオプションを2つつけておくと良いです。簡単に解説すると`--platform iOS`のようにデバイスを指定することでビルド時間を短縮できます。`--no-use-binaries`を付けるとバイナリデータからのビルドではなく、ソースコードからコンパイルすることでビルドを行うことができます。そこそこ時間はかかります。

- [カルタゴの「--no-use-binaries」の目的は何ですか](https://www.code-adviser.com/detail_41442601)

#### 3. Build Phasesの設定で.frameworkファイルのインポートを行う
CocoaPodsと違いCarthageでビルドしたライブラリをインポートするためにはxcodeでプロジェクトファイルを選択し「TARGETS」→「Build Phases」の項目にいくつか設定を追加する必要があります。

「Link Binary with Libaries」の欄を選択し、「＋ボタン」→「add other...」→「add Files」と進み、「Carthage/Build/iOS」フォルダ内にある拡張子が`.framework`のものを選択します。下の画像を例にするとAPIKit.frameworkというライブラリが追加されているのがわかると思います

![enter image description here](https://i.gyazo.com/f1b2f9b7f414c021633791fb45f651de.png)

続いて左上の「＋ボタン」→「New Run Script Phase」を選択します。すると「Run Script」という項目が追加されるので、まずShellの欄に以下のスクリプトを記入します
``` bash
/usr/local/bin/carthage copy-frameworks
```
次に「Input files」の欄でファイルパスを記入します。hogehoge.frameworkのところは導入するライブラリに応じて適宜変更してください。
``` vim
$(SRCROOT)/Carthage/Build/iOS/hogehoge.framework
```
例えばAPIKitというライブラリを導入したい時は下のように設定します。
![enter image description here](https://i.gyazo.com/06861701e15a077758ae92853376310c.png)

#### 4 .gitignoreファイルの編集
最後に、ビルドが完了すると`Carthage`というフォルダが生成されているはず。このフォルダの中にはライブラリのソースファイルが格納されているけど、このソースファイルをgitで管理しないよ。`.gitignore`を編集し、**Carthage以下のファイル群はgit管理下から外しておけばおk**だよ。その代わりにライブラリの情報が記述されている`Cartfile`と`Cartfile.resolved` のみを管理するようにしよう

``` bash
vim .gitignore
```
等のコマンドでエディタを開いて以下を追記
``` vim
Carthage/*
```


## まとめ
> - CarthageはCocoapodsに比べて軽量。よってCarthageでインストールできるライブラリはCarthageを使おう
> - 両者ともにライブラリのソースファイル自体を管理するのではなく、`Cartfile`や`Podfile`のような各ライブラリのバージョン情報が記述されたファイルのみ管理しよう

