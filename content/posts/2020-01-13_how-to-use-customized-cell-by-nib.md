---
title: 'Nibを活用しTableViewやCollectionViewでカスタムセルを使う方法を解説 '
path: how-to-use-customized-cell-by-nib
created: 2020-01-13T04:33:39.440Z
updated: 2020-01-13T04:33:39.451Z
excerpt: >
  UIKitにはテンプレート用のCellが既に用意されているけど、自前で実装したカスタムセルを使用することでより柔軟な実装が可能になるよ。そんなカスタムセルの使い方を今回はTableViewを例に解説するよ。
featuredImage: ../assets/thumbs/xcode.jpg
tags:
  - iOSアプリ
  - Swift
  - WIP
---

## カスタムセルを使用するための手順
再利用が可能な点がカスタムセルを利用する利点といえるよ。大まかな手順をリスト化するとこうなるよ。ちなみにTableViewもCollectionViewも同じだよ。再利用が可能な点がカスタムセルを利用する利点といえるよ。大まかな手順をリスト化するとこうなるよ。ちなみにTableViewもCollectionViewも同じだよ。


>  1. Nibファイルの作成
>  2. Storyboardの実装
	>  - TableViewにCellを追加する
	> - Cellの関連付けと`ReuseIdentifier`の定義
>  3. ViewControllerの実装
	> - `register`によるカスタムCellの登録
	> - 各delegateメソッドの実装
### 1. カスタムCell(Nib)の作成
まずカスタムCellとして使うNibファイルを作成しよう。
#### ・ `CustomTableViewCell.xib`と`CustomTableViewCell.swift`を作成する
「New」→「File」→「Cocoa Touch Class」を選択。今回はCustomTableViewCellというクラスを生成するよ
![Create Xib](https://i.gyazo.com/c1f795c5dfb6fd6762779a59d18c90f2.png)

上画像の通り、以下の二点を忘れないようにしよう。`CustomTableViewCell.xib`と`CustomTableViewCell.swift`が生成されているはずだよ。
- 「Also create XIB file」にチェックマーク
- 「Subclass of」には`UITableViewCell`

ちなみに拡張子である`.xib`についてですが、ここは深く考えずに`nib`=`xib`と考えてもらえると良いよ
#### ・ xib上に任意のUIパーツの設置しoutlet接続しておく
`CustomTableViewCell.xib`と`CustomTableViewCell.swift`は既に対応しているものとして関連付けされていはずだよ。コードで加工しておきたい部品はoutlet接続しておこう。
![outlet](https://i.gyazo.com/839a69fdf47a6c58938db5ed5c6697db.png)

### 2 Storyboardの実装
通常の実装で行うTableViewのoutlet接続に加え、以下の二つの工程を行う必要があるよ。尚、TableViewのoutlet接続の仕方については[UIViewControllerでTableViewを実装する方法](https://saku-program.com/how-to-use-tableview)に記載されているからここでは割愛するよ。
> - TableViewにCellを追加し関連付けを行う
> - `ReuseIdentifier`の定義

順次解説するよ
#### ・TableViewにCellを追加する
![add cell](https://i.gyazo.com/1db7ff0f5bf7a141c243c9cc8a626214.png)
#### ・Cellの関連付けと`ReuseIdentifier`の定義
下画像のように追加したセルの関連付けを行うよ
![relate](https://i.gyazo.com/7b61423c6688210c0602797bed692b03.png)

次に下画像のように`ReuseIdentifier`の定義を行うよ
![define ReuseIdentifier](https://i.gyazo.com/7259a629190d753a469d6b5b906a34c6.png)

### 3. ViewControllerの実装
- `register`によるカスタムCellの登録
- 各delegateメソッドの実装
#### ・UITableViewのメソッド、`register`によるカスタムCellの登録
`viewDidLoad`に書く。register
```swift
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    tableView.register(CustomTableViewCell, forCellReuseIdentifier: "CustomTableViewCell")
}
```
#### ・各delegateメソッドの実装
 `cellforRowAt`でカスタムセルの定義・加工
``` swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "CustomTableViewCell", for: indexPath) as! CustomTableViewCell    
    return cell
}
```
###### ※`dequeueReusableCell`について
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uitableview/1614891-dequeuereusablecell)を参照すると一個一個のセルは再利用される形で描画されており、再生成するためのラインから取り除くための処理らしくこれによって多くのCellを高速に描画できるそうです
> This method dequeues an existing cell if one is available or creates a new one using the class or nib file you previously registered. If no cell is available for reuse and you did not register a class or nib file, this method returns nil.
> (このメソッドは使用しているセルクラスや登録したNibファイルが使用可能あるいは生成可能な場合、既に生成されたセルをキューから外します)

``` swift
func dequeueReusableCell(withIdentifier identifier: String) -> UITableViewCell?
```

###### ※「`as`」によるキャストについて
`as`でキャストしておかないと、ViewController側から`xib`上で設置・outlet接続を行ったプロパティにアクセスできない。

https://fukatsu.tech/automatic-cell-height@(サクプロ)
# Nibを活用しTableViewやCollectionViewでカスタムセルを使う方法を解説
TableViewもCollectionViewも同じだよ。今回はTableViewを例に解説するよ。

## カスタムセルを使用するための手順
再利用が可能な点がカスタムセルを利用する利点といえるよ。大まかな手順をリスト化するとこうなるよ

>  1. Nibファイルの作成
>  2. Storyboardの実装
	>  - TableViewにCellを追加する
	> - Cellの関連付けと`ReuseIdentifier`の定義
>  3. ViewControllerの実装
	> - `register`によるカスタムCellの登録
	> - 各delegateメソッドの実装
### 1. カスタムCell(Nib)の作成
まずカスタムCellとして使うNibファイルを作成しよう。
#### ・ `CustomTableViewCell.xib`と`CustomTableViewCell.swift`を作成する
「New」→「File」→「Cocoa Touch Class」を選択。今回はCustomTableViewCellというクラスを生成するよ
![Create Xib](https://i.gyazo.com/c1f795c5dfb6fd6762779a59d18c90f2.png)

上画像の通り、以下の二点を忘れないようにしよう。`CustomTableViewCell.xib`と`CustomTableViewCell.swift`が生成されているはずだよ。
- 「Also create XIB file」にチェックマーク
- 「Subclass of」には`UITableViewCell`

ちなみに拡張子である`.xib`についてですが、ここは深く考えずに`nib`=`xib`と考えてもらえると良いよ
#### ・ xib上に任意のUIパーツの設置しoutlet接続しておく
`CustomTableViewCell.xib`と`CustomTableViewCell.swift`は既に対応しているものとして関連付けされていはずだよ。コードで加工しておきたい部品はoutlet接続しておこう。
![outlet](https://i.gyazo.com/839a69fdf47a6c58938db5ed5c6697db.png)

### 2 Storyboardの実装
通常の実装で行うTableViewのoutlet接続に加え、以下の二つの工程を行う必要があるよ。尚、TableViewのoutlet接続の仕方については[UIViewControllerでTableViewを実装する方法](https://saku-program.com/how-to-use-tableview)に記載されているからここでは割愛するよ。
> - TableViewにCellを追加し関連付けを行う
> - `ReuseIdentifier`の定義

順次解説するよ
#### ・TableViewにCellを追加する
![add cell](https://i.gyazo.com/1db7ff0f5bf7a141c243c9cc8a626214.png)
#### ・Cellの関連付けと`ReuseIdentifier`の定義
下画像のように追加したセルの関連付けを行うよ
![relate](https://i.gyazo.com/7b61423c6688210c0602797bed692b03.png)

次に下画像のように`ReuseIdentifier`の定義を行うよ
![define ReuseIdentifier](https://i.gyazo.com/7259a629190d753a469d6b5b906a34c6.png)

### 3. ViewControllerの実装
- `register`によるカスタムCellの登録
- 各delegateメソッドの実装
#### ・UITableViewのメソッド、`register`によるカスタムCellの登録
`viewDidLoad`に書く。register
```swift
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    tableView.register(CustomTableViewCell, forCellReuseIdentifier: "CustomTableViewCell")
}
```
#### ・各delegateメソッドの実装
 `cellforRowAt`でカスタムセルの定義・加工
``` swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "CustomTableViewCell", for: indexPath) as! CustomTableViewCell    
    return cell
}
```
###### ※`dequeueReusableCell`について
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uitableview/1614891-dequeuereusablecell)を参照すると一個一個のセルは再利用される形で描画されており、再生成するためのラインから取り除くための処理らしくこれによって多くのCellを高速に描画できるそうです
> This method dequeues an existing cell if one is available or creates a new one using the class or nib file you previously registered. If no cell is available for reuse and you did not register a class or nib file, this method returns nil.
> (このメソッドは使用しているセルクラスや登録したNibファイルが使用可能あるいは生成可能な場合、既に生成されたセルをキューから外します)

``` swift
func dequeueReusableCell(withIdentifier identifier: String) -> UITableViewCell?
```

###### ※「`as`」によるキャストについて
`as`でキャストしておかないと、ViewController側から`xib`上で設置・outlet接続を行ったプロパティにアクセスできない。


