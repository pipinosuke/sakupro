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
再利用が可能な点がカスタムセルを利用する利点といえるよ。大まかな手順をリスト化するとこうなるよ。ちなみにTableViewもCollectionViewも同じ工程で実装が可能だよ。

>  1. Nibファイルの作成
>  2. Storyboardの実装
>  3. ViewControllerの実装

### 1. カスタムCell(Nib)の作成
まずカスタムCellとして使うNibファイルを作成するよ

#### ・ `CustomTableViewCell.xib`と`CustomTableViewCell.swift`を作成する
「New」→「File」→「Cocoa Touch Class」を選択。今回はCustomTableViewCellというクラスを生成するよ
![Create Xib](https://i.gyazo.com/c1f795c5dfb6fd6762779a59d18c90f2.png)

上画像の通り、以下の二点を忘れないようにしよう。
- 「Also create XIB file」にチェックマーク
- 「Subclass of」には`UITableViewCell`

ちなみに拡張子である`.xib`についてですが、ここは深く考えずに`nib`=`xib`と考えてもらえると良いよ

#### ・ xib上に任意のUIパーツの設置しoutlet接続しておく
正しくできていれば`CustomTableViewCell.xib`と`CustomTableViewCell.swift`が生成されているはずだよ。そしてお互いのファイルが対応しているものとして既に関連付けされていはずだよ。コードで加工しておきたい部品はoutlet接続しておこう。
![outlet](https://i.gyazo.com/839a69fdf47a6c58938db5ed5c6697db.png)

### 2 Storyboardの実装
通常の実装で行うTableViewのoutlet接続に加え、以下の二つの工程を行う必要があるよ。尚、TableViewのoutlet接続の仕方については[UIViewControllerでTableViewを実装する方法](https://saku-program.com/how-to-use-tableview#%E6%89%8B%E9%A0%861-%E9%96%A2%E9%80%A3%E4%BB%98%E3%81%91%E3%81%A8outlet%E6%8E%A5%E7%B6%9A)に記載されているからここでは割愛するよ。

> - TableViewにCellを追加する
> - Cellの関連付けと`ReuseIdentifier`の定義

順次解説するよ
#### ・TableViewにCellを追加する
![add cell](https://i.gyazo.com/1db7ff0f5bf7a141c243c9cc8a626214.png)
delegateとdatasourceの設定も忘れずに行おう。(詳しくは[UIViewControllerでTableViewを実装する方法](https://saku-program.com/how-to-use-tableview#%E6%89%8B%E9%A0%864-delegate%E3%81%AE%E8%A8%AD%E5%AE%9A)を参照)
#### ・Cellの関連付けと`ReuseIdentifier`の定義
下画像のように追加したセルの関連付けを行うよ
![relate](https://i.gyazo.com/7b61423c6688210c0602797bed692b03.png)

次に下画像のように`ReuseIdentifier`の定義を行うよ
![define ReuseIdentifier](https://i.gyazo.com/7259a629190d753a469d6b5b906a34c6.png)

### 3. ViewControllerの実装
Storyboardの実装が終了したらあとはViewControllerにコードを書いていくよ。主に行うことは次の二つだよ

> - `register`によるカスタムCellの登録
> - 各delegateメソッドの実装

順次解説していくよ
#### ・UITableViewのメソッド、`register`によるカスタムCellの登録
カスタムセルは登録する必要があるよ。登録には`register`というメソッドを使うよ。[公式ドキュメント](https://developer.apple.com/documentation/uikit/uitableview/1614888-register)を見ると登録したいCellクラスを渡す引数「cellClass」とIdentifierを渡す引数「forCellReuseIdentifier」があることがわかるよ。
```swift
func register(_ cellClass: AnyClass?, forCellReuseIdentifier identifier: String)
```
よってこのような感じで記述しよう
```swift
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    tableView.register(CustomTableViewCell, forCellReuseIdentifier: "CustomTableViewCell")  //ココ
}
```
#### ・各delegateメソッドの実装
行数を定義する`numberOfRows`と描画するセルの定義・加工を行う`cellForRowAt`を実装しよう。`cellForRowAt`の記述は一部異なるから注意。※で詳しく説明しているよ。

``` swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "CustomTableViewCell", for: indexPath) as! CustomTableViewCell    
    return cell
}
```

###### ※`dequeueReusableCell`について
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uitableview/1614891-dequeuereusablecell)を参照すると一個一個のCellは再利用される形で描画されており、再生成するためのラインから生成し終えたCellを取り除くための処理を行うメソッドだよ。これによって多くのCellを高速に描画できるっぽい。
> This method dequeues an existing cell if one is available or creates a new one using the class or nib file you previously registered. If no cell is available for reuse and you did not register a class or nib file, this method returns nil.
> (このメソッドは使用しているセルクラスや登録したNibファイルが使用可能あるいは生成可能な場合、既に生成されたセルをキューから外します)

``` swift
func dequeueReusableCell(withIdentifier identifier: String) -> UITableViewCell?
```

###### ※「`as`」によるキャストについて
`as`でキャストしておかないと、ViewController側から`xib`上で設置・outlet接続を行ったプロパティにアクセスできない。
