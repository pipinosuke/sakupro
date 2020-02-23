---
title: 「IndexPath」で理解するTableViewとCollectionView
path: about-indexpath
created: 2020-02-23T05:27:52.614Z
updated: 2020-02-23T05:27:52.664Z
excerpt: >-
  iOSアプリ開発ではなくてはならないといってもいいUITableViewとUICollectionViewだけど、これらを理解する上で重要な概念が`IndexPath`だよ。初見では「IndexPathってなんだよ！！」って思った人も多いのではないかな？？  
featuredImage: ../assets/thumbs/thumb_indexpath.png
tags:
  - iOSアプリ
---
### IndexPathはCellの位置情報を握っている
先に結論を言うとIndexPathは「**TableView/CollectionViewのCellの位置情報**をプロパティとして持つ構造体」だよ。IndexPathについて理解することで、TableViewCollectionViewについてもより深く理解できるはずだよ。

## TableViewおよびCollectionViewの構成要素
indexPathを理解するにあたってまずはTableView・CollectionViewそれぞれの構造とその構成要素について知ってく必要があるよ。


### 「Section」と「Cell」
その手っ取り早く構造を理解するためにTableViewの構造を表した図を作ってみたよ。

![table view diagram](https://i.gyazo.com/2b1723eab013c8eab71ccebbc4a19d34.png)

そしてこの図で注目してもらいたいポイントは次の通りだよ。

> - TableViewはSectionとCell(Row)の二つのパーツで構成されている
> - Sectionが二つある
> - Section0の中には3つのRow、Section1には2つのRowがある
> - 各Section及び各Rowには**番号**が割り振られている

番号についてが特に大事なので太字にしたよ。番号が割り振られることで、例えば一番下の「Row」であれば「Section0・Row1」と言った形で表現したり特定したりが可能になるよ。そして特定する際に必要な「Section」と「Row」、この二つの情報を持っているのが`IndexPath`だよ。

※Cellの呼び方はTableViewの場合`Row`、CollectionViewの場合は`Item`となる。

##  IndexPathの活用
では、どのような形でIndexPathを活用していけば良いかを説明するよ。上記で説明してきたように`IndexPath`先ほど紹介した二つの情報をプロパティとして持っているよ。実際にコードを見てみよう。
``` swift
struct IndexPath {
	var section: Int
	var row: Int  //TableViewの場合
	var item: Int //CollectionViewの場合	
	...
}
```

それぞれの値は以下のように取り出すことができるよ。
```swift
print(indexPath.section) //セクション数
print(indexPath.row)  //行数
```


### ・メソッド内で「`IndexPath`」の値を参照・取得する
頻繁にIndexPathを活用するメソッドとして挙げられるのがcellの中身を定義したり加工したりする際に呼び出す`cellForRowAt`だよ。例えば`cellForRowAt`内でセクション数と行数を取得することで下のようなTableViewを作ることができる。
![enter image description here](https://i.gyazo.com/4345c7528ac18fa48e3226337e1da08c.png)

#### サンプルコード
``` swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell()
    let sectionNumber = indexPath.section //セクション数の取得
    let rowNumber = indexPath.row  //行数の取得
    cell.titleLabel?.text = "このセルはセクション\(indexPath.section)の\(indexPath.row)行目です"

    return cell
}
```


### ・メソッド内で条件分岐する
 IndexPathが参照できれば、その値によって条件分岐が可能になるよ

![indexPath sample](https://i.gyazo.com/3ff9463b5c1c3e9d4792c465dc3ba8dc.png)

#### サンプルコード
``` swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell()
    //省略
    switch indexPath.row { //行の数で条件分岐
    case 0:
        cell.backgroundColor = .red
    case 1:
        cell.backgroundColor = .blue
    case 2:
        cell.backgroundColor = .black
    default:
        cell.backgroundColor = .green
    }
    return cell
}
```

#### ・応用
別記事で掲載している[ハンズオン](#)に詳しく載っているのでそちらを参照

## まとめ
- IndexPathは「Section」とCell(「Row」/「Item」)のナンバリング情報を保持している。この二つのナンバリング情報でセルの特定が可能。
- indexPathを引数として持つメソッド内では、indexPathが持つプロパティの値を取得したり、その値よって行う処理の条件分岐を行うことができる。
