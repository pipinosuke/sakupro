---
title: 'UITableViewのキホン ,デリゲート'
path: table-view
created: 2019-12-17T14:10:47.280Z
updated: 2019-12-17T14:10:47.299Z
excerpt: >-
  ありとあらゆるところで使用されているパーツがUITableViewだよ。TableViewなしにはiOSアプリは作れないと言っても過言ではないぐらいと言っても良いぐらいよく使うからしっかり抑えて欲しいよ
featuredImage: /content/assets/thumbs/xcode.jpg
tags:
  - iOSアプリ
---
### 手順1. 関連づけ
- outlet接続
- delegate
- datasource

### 参考リンク
- [UITableViewの使い方](https://qiita.com/abouch/items/3617ce37c4dd86932365)

### 手順2. プロトコル拡張とdelegateメソッド
- セルの中身 
- 行数
- タップした時の挙動

#### 参考
- [UITableViewのデリゲートメソッドまとめ](https://qiita.com/kagemiku/items/22b74010365723c5c4fe)

### プロトコル
- `UITableViewDelegate`
	- rowHeight
	- spacingInSection
- `UITableViewDateSourse`
	- numberOfRowsInSection
	- cellForRowAt

```swift
let cell: UITableViewCell = UI
```

### 手順3 実装
#### 「`IndexPath`」について
`IndexPath`は「目次(index)」+「道(Path)」という名前の通りセルの場所を特定するための情報を保持しているよ。具体的には「`section`」と「`row`」の２つのプロパティを保持しているよ

## カスタムセル
[xibファイルでビューを作成して、ストーリーボードやコードから利用する方法(Swift3編)](https://dev.classmethod.jp/smartphone/xib/)の3から
### 1. CustomTableViewCell.xibとCustomTableViewCell.swiftを作成
諸々加工
### 2. 関連ずけ
### 3. ResuseIdentifierの定義
### 4. ViewControllerにTableViewを貼り付けてTableViewCellを投入f
#### 関連ずけ
### 5. TableViewのアウトレット接続
### 6.  registerCellする
viewDidLoadに書く。
```swift
  tableView.register(UINib(name: ,bundle:nil),)
```
### 7. `cellforRowAt`でカスタムセルの定義・加工
```swift
let cell = tableView.dequeReuseableCell()
```
#### 「`as`」によるキャストについて
https://fukatsu.tech/automatic-cell-height
