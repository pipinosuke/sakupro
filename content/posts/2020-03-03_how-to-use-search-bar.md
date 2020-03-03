---
title: 【iOS】UISearchBarで検索機能を実装する
path: how-to-use-search-bar
created: 2020-03-03T08:50:35.442Z
updated: 2020-03-03T08:50:35.470Z
excerpt: ここではSearchBarを使って検索機能を実装する方法を解説しているよ
featuredImage: ../assets/thumbs/スクリーンショット 2020-03-03 17.49.29.png
tags:
  - iOSアプリ
---
- [インクリメンタルサーチ](https://qiita.com/Night___/items/de25d6c0130cc2fa6e86)
- [UISearchDisplayController](https://qiita.com/yimajo/items/1ca179083edddb25df55)はdeprecated(非推奨)

## 解説
先に大まかな流れを解説するよ。

> 1. SearchBarの設置・Outlet接続
> 2. SearchBarDelegateのプロトコル拡張
> 3. Delegateメソッドの実装

### 手順1. SearchBarの設置
 - StoryboardにSearchBarを設置
 - Outlet接続

詳しい解説は割愛しますが、特にdelegateの設定を忘れないように！↓
![enter image description here](https://i.gyazo.com/bee01db3cb477c8898b4ae016770937c.png)

### 手順2. ViewControllerのプロトコル拡張
``` swift
// Mark: UISearchBarDelegate
extension MainViewController: UISearchBarDelegate { }
```

`UISearchBarDelegate`の拡張を行います

### 手順3. SearchBarのDelegateメソッドを拡張
seachBarに入力した文字を確定したタイミングで呼び出されるメソッド`searchBarSearchButtonClicked`を活用します。

#### ・searchBarの文字列の取得
オプショナル型での取得となるので`guard let`を使うと良いです。
``` swift
   guard let searchText = searchBar.text else {
        return
   }
```

#### ・サンプルコード
最終的なコードはこんな感じになると思います。
``` swift
// Mark: UISearchBarDelegate
extension MainViewController: UISearchBarDelegate {
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        guard let searchText = searchBar.text else {
            return
        }
        search(searchText)
    }
    
    private func search(_ text: String) {
	    //検索処理
	}
}
```

## 補足: インクリメンタルサーチを行う方法
追記予定
