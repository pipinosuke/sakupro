---
title: 【CarthageとCocoadpods】 2種類のライブラリ管理の導入方法とその使い分けについて解説
path: carthage-cocoapods
created: 2019-12-17T12:02:35.248Z
updated: 2019-12-17T12:02:35.301Z
excerpt: CarthageとCocoapodsがあるよ。それぞれの使い方、使い分けについて解説
featuredImage: ../assets/thumbs/xcode.jpg
tags:
  - iOSアプリ
---
# Carthageを使ったライブラリの導入方法 iOSアプリ開発
ライブラリを用いるのが普通だよ。
## Carthageの導入方法
Homebrewでインストールするよ
```bash
brew install carthage
```
`brew`コマンドが使えない場合は、[homebrewの解説](#)を参考にインストールを済ませておこう


# CocoaPodsを使ったライブラリの導入方法 iOSアプリ開発
### おまけ CarthageとCocoaPodsとの使い分けについて
正解はないのだけれど、そのライブラリが`Carthageで導入できるものであれば優先的にCarthageで導入し、それ以外はCocoapods`という使い分けが良いとされているよ。
理由はCarthageの方がその仕組みがシンプルかつ軽量であることが挙げられるよ。
