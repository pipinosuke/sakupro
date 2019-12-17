---
title: コードで行う画面遷移
path: ios-transition
created: 2019-12-17T11:06:33.664Z
updated: 2019-12-17T11:06:33.694Z
excerpt: ここではコードで行う画面遷移の方法を解説しているよ。セグエを使った遷移よりもコードの遷移を使いこなせるようになると、複雑なアプリも作りやすいよ
featuredImage: /content/assets/thumbs/xcode.jpg
tags:
  - UIKit
  - Swift
---
画面遷移はアプリ開発における基本と言っても良いので、しっかりと押さえておくと良いよ。大まかな手順はこうだよ

> 1. 遷移先のStoryboardを取得する
> 2. 取得したStoryboardから、ViewControllerをインスタンス化する
> 3. 遷移のコードを実行する

### 手順1. 遷移先のStoryboardを取得する
```swift
let storyboard = UIStoryboard(name: "Next",bundle: nil)
```

### 手順2. `instantiateInitialViewController`メソッドでViewControllerをインスタンス化する
```swift
guard let viewController = storyboard.instantiateInitialViewController() as? SecondViewController else { return }
```
#### Optional型に注意!!
`instantiateInitialViewController()`の返り値が**Optional型であることに注意**しよう
``` swift
let viewController = storyboard.instantiateInitialViewController() as! SecondViewController
```
このような強制アンラップは使わずに、`if let`あるいは`guard let`を使った安全なアンラップを行おう。 Swiftにおいて`Optional`は非常に重要な概念なので、良くわからないという人は[解説](#)を良く見ておくことをお勧めするよ。

### 手順3. 遷移する
#### 遷移のパターン1. `NavigationController`を使って遷移
```swift
let storyboard = UIStoryboard(name: "Second",bundle: nil)
```
#### 遷移のパターン2. `ViewController`のメソッドを使って遷移 
```swift
let storyboard = UIStoryboard(name: "Second",bundle: nil)
present
pop
```

### 頻発するエラーを紹介
を2つ紹介
#### ViewControllerにEntrypointをつけ忘れる
#### navigationControllerがnil
