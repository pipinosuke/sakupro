---
title: コードで行う画面遷移
path: ios-transition
created: 2019-12-17T11:06:33.664Z
updated: 2019-01-22T11:06:33.694Z
excerpt: ここではコードで行う画面遷移の方法を解説しているよ。セグエを使った遷移よりもコードの遷移を使いこなせるようになると、複雑なアプリも作りやすいよ
featuredImage: /content/assets/thumbs/thumb_transition_ios.jpg
tags:
  - iOSアプリ
  - Swift
---
### 画面遷移の際に呼び出すメソッド
画面遷移したいときは次の2つのメソッドの内、どちらかを呼び出す必要があるよ。
- [pushViewController](https://developer.apple.com/documentation/uikit/uinavigationcontroller/1621887-pushviewcontroller?language=swift)
``` swift
func pushViewController(_ viewController: UIViewController, 
               animated: Bool)
```
- [present](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621380-present)
``` swift
func present(_ viewControllerToPresent: UIViewController, 
    animated flag: Bool, 
  completion: (() -> Void)? = nil)
```

二つのメソッドのコードを見ると両者どちらのメソッドも遷移先のUIViewControllerを引数に取ることがわかると思うよ。つまりこれらメソッドを呼び出す前に、**遷移先のViewControllerのインスタンス化**という作業が必要になるよ。(後述)つまり大まかな流れとしてはこうなるよ

> 1. 遷移先のStoryboardを取得する
> 2. 取得したStoryboardから、ViewControllerをインスタンス化する
> 3. 遷移のメソッドを実行する

## 手順
それでは本題に入るよ。先ほど挙げた流れに沿って手順を説明していくよ。FirstViewController→NextViewControllerへ遷移するものとするよ。

### 手順1. 遷移先のStoryboardを取得する
まずは遷移先のstoryboardを取得しよう。例えば遷移先のStoryboardのファイル名が`Next.storyboard`の場合、引数`name`の値は`"Next"`になるよ

```swift
let storyboard = UIStoryboard(name: "Next",bundle: nil)
```

### 手順2. `instantiateInitialViewController`メソッドで遷移先のViewControllerをインスタンス化する
次に手順1で取得したstoryboardからViewControllerをインスタンス化しよう。`instantiateInitialViewController`というメソッドを用いるよ。

#### ・ 遷移先のViewControllerにEntry Pointをつける
StoryboardのViewControllerを選択し、右メニューの「Is Initial ViewController」にチェックマークをつけよう。下の画像のように「→」マークが確認できればおk。
![enter image description here](https://i.gyazo.com/a60ac3b2ba5d011e59825e0a433f5d29.png)

#### ・`instantiateInitialViewController()`でViewControllerをインスタンス化する
```swift
let storyboard = UIStoryboard(name: "Next",bundle: nil)  //手順1で説明済
guard let viewController = storyboard.instantiateInitialViewController() as? NextViewController else { return }  //インスタンス化したものを定数viewControllerとして定義
```
このメソッドはstoryboardのInitial ViewControllerをインスタンス化して返すというものだよ。「Is Initial ViewController」にチェックマークが入っているViewControllerがなければ返り値はnilとなってしまうので気をつけよう。

##### 返り値型Optionalに注意!!
くどいようだが`instantiateInitialViewController()`の返り値が**Optional型であることに注意**しよう。返り値がoptiona lの場合は下のような強制アンラップは使わずに、`if let`あるいは`guard let`を使った安全なアンラップを行おう。  
Swiftにおいて`Optional`は非常に重要な概念なので、良くわからないという人は[オプショナルについての解説](https://saku-program.com/about-optional)を見ておくことをお勧めするよ
``` swift
let viewController = storyboard.instantiateInitialViewController() as! NextViewController
```
 
### 手順3. 遷移のコードを記述する
いよいよ遷移するよ。遷移の方法には冒頭で紹介した次の2パターンがあるよ。それぞれ解説するよ

-  `NavigationController`のメソッド(`push`)で遷移  
-  ViewControllerのメソッド(`present`)で遷移

#### ・ `NavigationController`のメソッドで遷移する方法
1. 遷移元のViewControllerにNavigationControllerを埋め込む  
「Editor」→「Embed In」→「Navigation Controller」と選びます
![Alt text](./embedin.png)
2. `pushViewController`で遷移
```swift
let storyboard = UIStoryboard(name: "Next",bundle: nil)
guard let viewController =  storyboard.instantiateInitialViewController() as? NextViewController else { return }
navigationController?.pushViewController(viewController, animated: true)
```

#### ・ `ViewController`のメソッドで遷移する方法
```swift
let storyboard = UIStoryboard(name: "Next",bundle: nil)
guard let viewController =  storyboard.instantiateInitialViewController() as? NextViewController else { return }
present(viewController, animated: true)
```

### 頻発するエラーを紹介
> - Entrypointのつけ忘れ
> - navigationControllerを埋め込み忘れる

この二つをよく見かけるよ。解説しておくよ。
#### ・遷移先のViewControllerにEntrypointをつけ忘れる
右メニューの**「Is Initial View Controller」にチェックマークをつけ忘れる**ミスが非常に多いよ。Entry Pointがないと`instantiateInitialViewController`の返り値がnilになってしまうよ。

#### ・遷移元のnavigationControllerを埋め込み忘れる
navigationControllerで遷移したい場合、ViewControllerへの埋め込みを忘れると`navigatoinController?`の値がnilになってしまうよ。  
すると`navigationController?.pushViewController`が実行されずに、結果遷移できないよ。(詳しくは[OptionalChainingの解説](https://saku-program.com/about-optional)を参照)

## まとめ
> - コードでの遷移は`pushViewController`か`present`どちらかのメソッドを呼び出して行う
> - この二つのメソッドを呼び出す前に、`instantiateInitialViewController()`で遷移先のViewControllerをインスタンス化しておく必要がある
> - 「EntryPoint」・「NavigationController」のつけ忘れには注意
