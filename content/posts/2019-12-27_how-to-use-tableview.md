---
title: delegateを用いてTableViewをUIViewControllerで実装する方法を解説
path: how-to-use-tableview
created: 2019-12-27T14:14:17.247Z
updated: 2019-12-27T14:14:17.261Z
excerpt: アプリ開発においてもはやなくてはならないTableViewだけど、そのTableViewをUIViewController上に実装する方法を解説しているよ。
featuredImage: ../assets/thumbs/xcode.jpg
tags:
  - iOSアプリ
  - Swift
---
そもそもTableViewを実装する方法は次の二通りがあるよ。

- UIViewControllerでTableViewを実装する方法
- UITableViewControllerでTableViewを実装する方法

前者のやり方の方が後者のやり方に比べて**若干工数がかかるが、汎用性が高い実装をすることができる**ため多く使われているよ。よってこの記事では前者の方法を解説することにするよ。

## UIViewController上でTableViewを実装する流れ
実装の流れをざっくりとリスト化すると下のようになるよ

> 1. StoryboardとViewControllerの関連付け・outlet接続
> 2. UIViewControllerのプロトコル拡張
> 3. delegateメソッドの実装
> 4. delegate・dataSourceの設定

このリストに沿って手順を説明していくよ。

### 下準備
まずは新しいプロジェクトを作って`MainViewController`と`Main.storyboard`の二つのファイルを作成。Main.storyboardにUIViewControllerを配置して、上にTableViewを貼り付けておこう。あと「Is Initial ViewController」にチェックマークを入れることも忘れないように・・・！！
![enter image description here](https://i.gyazo.com/29f6c37ee30075ed37603ed8e4208e98.png)


### 手順1. 関連付けとOutlet接続
手順1で行うことは次の二つだよ。
> - StoryboardとViewControllerの関連付け
> - TableViewのOutlet接続

#### StoryboardとViewControllerの関連付け
まずはStoryboard常に表示されているViewControllerとコード上のViewControllerの関連付けを行うよ。 
Storyboard上の右メニューを開いて「Custom Class」→「Class」から設定できるよ。下画像のように「Inherit Module from Target」にチェックマークが付いていれば正しく設定できているはずだよ。正しく関連付けがされていないと次に説明するOutlet接続もうまくいかないから注意。
![relate](https://i.gyazo.com/96b1dc445ec9d0856d03a9ee2239e599.png)

#### UITableViewのOutlet接続
関連付けを行ったらStoryboard上に配置したTableViewのOutlet接続を行うよ。`control`を押しながらドラッグアンドドロップして設定するやつだよ  

![outlet](https://i.gyazo.com/407cd21a778e5c612d8ce6d9fd8e34b4.png)  

「Name」の欄には定義したい変数名を入力するよ。今回は`tableView`という変数として接続しているよ。

``` swift
class MainViewController: UIViewController {

    @IBOutlet weak var tableView: UITableView!
    //以下略
}
```

### 手順2. ViewControllerのプロトコル拡張
1に続いて手順2ではUITableViewのdelegateメソッドを実装するためにUIViewControllerのプロトコルを拡張するよ。大半の人が「Delegateってなんだ！？」と疑問に感じると思うのだけれどこれについては後述するとして、まずは手順を説明するよ。

``` swift
class MainViewController: UIViewController {
    //省略
}

// MARK: - UITableViewDelegate, UITableViewDataSource
extension MainViewController: UITableViewDelegate, UITableViewDataSource { }
```

Exntensionを使うことでUIViewControllerを`UITableViewDataSource`・`UITableViewDelegate`の二つのプロトコルに準拠させたよ。これによって各プロトコルに用意されているdelegateメソッドを呼び出せるようになるよ。そしてこの時点ではエラーが発生することになるけど問題ないよ

### 手順3. Delegateメソッドの実装
手順2でUIViewControllerをUITableViewDelegate準拠させたことによって、UIViewControllerにDelegateメソッドが実装できるようになったよ。

[UITableViewのデリゲートメソッドまとめ](https://qiita.com/kagemiku/items/22b74010365723c5c4fe)を眺めると様々なDelegateメソッドが用意されていることがわかるけど、実はあまり使わないものも多いよ。その中でも下の二つを定義するメソッドは必ず必要になるよ。逆を言えばこの二つさえ実装できればTableViewは実装できることになるよ。

> - 行数
> - セルの中身

次に上に挙げた二つの項目をどのメソッドで、どのように定義するのかを説明していくよ。

#### `numberOfRows`で行の数を定義する
このメソッドについて[Appleの公式ドキュメント](https://developer.apple.com/documentation/uikit/uitableview/1614952-numberofrows)
から実装を見ると、`section`という引数を取り返り値型は`Int`となっているよ。考えてみると`numberOfRowsは`行「数」を定義するのだから、返り値がInt型になるのは当たり前のことだよね
``` swift
func numberOfRows(inSection section: Int) -> Int
```
シンプルに行数の数字を返せば良いよ。例えば5行(5つのCell)にしたいときはこう
```swift
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 5
    }
```

#### `cellForRowAtIndexPath`でCellの中身を定義する
このメソッドについて[Appleの公式ドキュメント](https://developer.apple.com/documentation/uikit/uitableviewdatasource/1614861-tableview)から詳しい実装を見てみるとindexPathという引数をとって、返り値型は`UITableViewCell`となっていることがわかるよ
```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
```
indexPathについての説明は少し長くなるから別の記事に譲るよ。
```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell()  //あらかじめ用意されているCellクラスを使用しています。   
    return cell
}
```

今回はUIKitであらかじめ用意されているCellクラスを使っているが、自前で用意したカスタムCellを使うことが圧倒的に多いよ。カスタムCellを使ったTableViewの実装はまた別の記事で説明するつもりだよ。

###  Delegateの設定
再確認するけどここまで本来UITableView Contoller実装を行うUITableViewをUIViewControllerで実装してきたよ。最後にdelegateの設定を行うよ。

[Delegateとその必要性について解説](#)しているのでまずこちらを見て欲しいよ。

#### delegate・dataSourceの設定
続いてTableViewを右クリック(二本指クリック)し、delegateとdataSourceの設定を行うよ。画像のように「Outlets」の項目内の「dataSource」と「delegate」がMainViewControllerに紐付いていれば正しく設定できているよ。

![delegate/dataSource](https://i.gyazo.com/3baff4cdbca9ccbe18fcbbd93b7a7379.png)

ちなみにコードで設定する方法でも構わないが、ViewControllerへの記述はなるべく減らすのがベターなので、自分としてはStoryboardから設定する方法を推奨するよ

``` swift
class MainViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.delegate = self  //ココ
        tableView.dataSource = self  //ココ
    }
}
```


## まとめ
> - delegateの設定を行い、delegateメソッドを実装することでUIViewController上にTableViewを実装できる
> - `extension`を用いてUIViewControllerを `UITableViewDelegate` と`UITableViewDateSource`の二つのプロトコルに準拠させることで、TableViewのDelegateメソッドを実装することができる
> - TableViewを実装するにあたって最低限実装が必要なDelegateメソッドは次の二つある
>   - セルの個数(行数)を定義する`NumberOfRows`
>   -  Cellの中身を定義する`CellForRowAtIndexPath`delegateを用いてTableViewをUIViewControllerで実装する方法を解説