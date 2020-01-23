---
title: 【iOS】ライフサイクルイベントについて解説
path: ios-lifecycle
created: 2020-01-23T10:51:50.465Z
updated: 2020-01-23T10:51:50.482Z
excerpt: 定義したメソッドを適切なタイミングで呼び出すためにもライフサイクル を理解しておくことは重要だよ
featuredImage: /content/assets/thumbs/thumb_lifecycle.jpg
tags:
  - iOSアプリ
---
> ![lifecycle](https://i.gyazo.com/8441244b8ff4655d6309b55bb000a1da.png)
> 出典: [UIViewControllerのライフサイクル](https://qiita.com/motokiee/items/0ca628b4cc74c8c5599d)

## 1. viewが現れるタイミング
次の順番に呼び出されます。

> - viewDidLoad
> - viewWillAppear
> - viewDidAppear

それぞれについて解説
### ・`viewDidLoad`
> viewが読み込まれた直後に呼び出される
最も早いタイミングで呼び出されるメソッド
### ・`viewWillAppear`
### ・`viewDidApper`

###  2. レイアウトの処理が行われるタイミングで呼び出されるメソッド
#### viewWillLayoutSubViews
#### viewDidLayoutSubViews

## 3. viewが消えるタイミング
### ・`viewWillDisappear`
### ・`viewDidDisappear`
