---
title: 【Delegate】CollectionViewをUIViewControllerで実装する方法を解説
path: how-to-use-collection-view
created: 2020-01-13T04:12:40.654Z
updated: 2020-01-13T04:12:40.665Z
excerpt: >-
  グリッド状に羅列することができるCollectionViewはTableViewと並んで頻繁に使うことになるパーツだよ。UIViewControllerでCollectionViewを実装する方法を解説するよ
featuredImage: ../assets/thumbs/thumb_collection_view.png
tags:
  - iOSアプリ
  - Swift
---
CollectionViewの実装の仕方はUITableViewの実装と類似する部分が多くあるよ。そのためまずはTableViewの実装を理解してから、CollectionViewの実装を理解するようにすると頭に入ってきやすいよ  そもそもCollectionViewを実装する方法は次の二通りがあるよ。

- UIViewControllerでCollectionViewを実装する方法
- UICollectionViewControllerでCollectionViewを実装する方法

前者のやり方の方が後者のやり方に比べて**若干工数がかかるが、汎用性が高い実装をすることができる**ため多く使われているよ。よってこの記事では前者の方法を解説することにするよ。

## UIViewController上でCollectionViewを実装する流れ
実装の流れをざっくりとリスト化すると下のようになるよ。流れとしては[UIViewControllerでTableViewを実装する方法](https://saku-program.com/how-to-use-tableview)と全く一緒だから、TableViewを理解している人は読み飛ばしてFlowLayoutの項目をみて欲しいよ。

> 1. StoryboardとViewControllerの関連付け・outlet接続
> 2. UIViewControllerのプロトコル拡張
> 3. delegateメソッドの実装
> 4. delegate・dataSourceの設定

このリストに沿って手順を説明していくよ。

### 下準備
- 新しいプロジェクトを作成
- `MainViewController`と`Main.storyboard`の二つのファイルを作成
- Main.storyboardにUIViewControllerを配置して、さらにその上にCollectionViewを貼り付ける
- 「Is Initial ViewController」にチェックマークを入れる(チェックマークが入ると下画像の「→」マークが表示される)

![initial collection view sample](https://i.gyazo.com/29f6c37ee30075ed37603ed8e4208e98.png)

- 「Targets」→「Deployment Info」→「Main Interface」を`Main`に設定
![Main Interface Setting](https://i.gyazo.com/2ce18e7c8f00c44dc84e51485387ca59.png)

### 手順1. outlet接続
以下3つの設定をStoryboard上から行います。

> - outlet接続
> 
> 

### 手順 2  プロトコル拡張とdelegateメソッドの実装
`UICollectionViewDelegate`,`UICollectionViewDataSource`を継承するよ
```swift
extension ViewController: UICollectionViewDelegate, UICollectionViewDataSource {
}
```
CollectionViewを実装するにあたって最低限必要なdelegateメソッドを2つ紹介するよ。ちなみに**TableViewの実装で使ったdelegateメソッドの名前の「Rows」が「Items」に置き換わっただけで他はほとんど変わっていない**よ。

#### ・`numberOfItemsInSection`でcellの個数を定義する
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uicollectionviewdatasource/1618058-collectionview)の実装を見てみると、
``` swift
func collectionView(_ collectionView: UICollectionView, 
numberOfItemsInSection section: Int) -> Int
```
返り値は`Int`であることがわかると思うよ

#### ・`cellForItemAt`で描画するcellを定義する
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uicollectionviewdatasource/1618029-collectionview)の実装を見てみると
``` swift
func collectionView(_ collectionView: UICollectionView, 
      cellForItemAt indexPath: IndexPath) -> UICollectionViewCell
```
返り値はUICollectionViewCellを継承している必要があるよ

### 補足: 【UICollectionViewDelegateFlowLayout】Delegateを使ってCollectionViewのレイアウトを調整する
`UICollectioViewDelegateFlowLayout`を継承することで、CollectionViewのレイアウトに関するdelegateメソッドを宣言できるようになるよ。主なものとしては以下の４つだよ。これはTableViewにはなかった要素なので、要注意。

> - `minimumLineSpacingForSectionAt`
> - `minimumInteritemSpacingForSectionAt`
> - `sizeForItemAt`
> - `insetForSectionAt`

順次解説していくよ。ちなみにこれらのメソッドはCollectionViewを実装する上で必ずしも宣言しなくても良いメソッドであるからオプショナルのメソッド(`optional func`)として定義されているよ。
またCollectionViewのレイアウトについてもっと詳しく知りたい人は[UICollectionView の Layout で悩んだら](https://techlife.cookpad.com/entry/2017/06/29/190000)を参照すると良いと思うよ

#### ・`minimumLineSpacingForSectionAt`でcell同士の縦の間隔を定義する
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uicollectionviewflowlayout/1617717-minimumlinespacing)を参照すると`CGFloat`型を返り値に持つことがわかるよ。また引数に`section`を持っているので、switch文などでセクション毎に間隔を変更させることも可能だよ。
``` swift
optional func collectionView(_ collectionView: UICollectionView,  layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat
```
#### ・`minimumInteritemSpacingForSectionAt`でcell同士の横の間隔を定義する
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uicollectionviewdelegateflowlayout/1617696-collectionview)を参照すると`minimumLineSpacingForSectionAt`と同様に、`CGFloat`型を返り値に持つことがわかるよ。また引数に`section`を持っているので、switch文などでセクション毎に感覚を変更させることも可能だよ。
``` swift
optional func collectionView(_ collectionView: UICollectionView,  layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat
```

#### ・`insetForSectionAt`でinsetを定義する
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uicollectionviewdelegateflowlayout/1617718-collectionview)を参照すると`UIEdgeInsets`型を返り値として持つことがわかるよ。
``` swift
optional func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets
```
##### ※`UIEdgeInsets`型
`UIEdgeInsets`は四方向のプロパティを持っていて以下のように定義できるよ。詳しくは[公式ドキュメント](https://developer.apple.com/documentation/uikit/uiedgeinsets)を参照
``` swift
let inset = UIEdgeInsets(top: 5, left: 4, bottom: 9.0, right: 0)
```

#### ・`sizeForItemAt`でcellのサイズを定義する
[公式ドキュメント](https://developer.apple.com/documentation/uikit/uicollectionviewdelegateflowlayout/1617708-collectionview)
``` swift
optional func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize
```

##### ※`CGSize`型
CGSizeは`width`と`height`二つのプロパティを持つ構造体で、以下のように定義できるよ。詳しくは[公式ドキュメント](https://developer.apple.com/documentation/coregraphics/cgsize)を参照
``` swift
let size = CGSize(width: 10, height: 10) //10 x 10の正方形型
```

