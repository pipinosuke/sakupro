---
title: UICollectionViewの実装
path: collection-view
created: 2019-12-17T14:06:24.468Z
updated: 2019-12-17T14:06:24.485Z
excerpt: グリッド状に羅列することができるUICollectionViewはUITableViewと並んで頻繁に使うことになるパーツだよ。抑えておこう
featuredImage: /content/assets/thumbs/xcode.jpg
tags:
  - iOSアプリ
  - Swift
---

グリッド状に羅列することができるCollectionViewはTableViewと並んで頻繁に使うことになるパーツと言えるよ。CollectionViewの実装の仕方はUITableViewの実装と類似する部分が多くあるよ。そのためまずはTableViewの実装を理解してから、CollectionViewの実装を理解するようにすると頭に入ってきやすいよ。

### 手順 1  プロトコル拡張とdelegateメソッドの実装
`UICollectionViewDelegate`,`UICollectionViewDataSource`を継承するよ
```swift
extension ViewController: UICollectionViewDelegate, UICollectionViewDataSource {
}
```
CollectionViewを実装するにあたって最低限必要なdelegateメソッドを2つ紹介するよ
#### 個数を定義するdelegateメソッド、`numberOfitemsforSectionAt`
#### 描画するcellを定義するdelegateメソッド、`cellForItemAt`
### CollectionViewのレイアウトについて
`UICollectioViewDelegateFlowLayout`を継承することで、主に以下４つのdelegateメソッドを宣言できるようになるよ
#### minimumLineSpacingForSectionAt
#### minimumInterItemSpacingForSectionAt
#### sizeForItemAt
#### insetForSectionAt

##### 参考リンク集
- [flowlayoutについて](https://techlife.cookpad.com/entry/2017/06/29/190000)
- [collectionView](https://qiita.com/takehilo/items/f7130693f5943c126f7e)
