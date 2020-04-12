---
title: 【iOS】UISearchBarで検索機能を実装する
path: how-to-use-search-bar
created: 2020-03-03T08:50:35.442Z
updated: 2020-03-03T08:50:35.470Z
excerpt: >-
    ここではSearchBarを使って検索機能を実装する方法を解説しているよ。主に通信処理などにも応用可能だよ
featuredImage: ../assets/thumbs/search.png
tags:
  - iOSアプリ
---
## 目標
> SearchBarに入力した文字列検索の結果をTableViewに表示する

### 検索機能を実装前のTableView
配列`array`の中身をTableViewで表示しているサンプルを活用して説明するよ。このViewContollerに検索機能を実装していくよ。

``` swift
import UIKit

class MainViewController: UIViewController {
    @IBOutlet weak var tableView: UITableView!
    
    private var array = [
        "リンゴ",
        "ゴリラ",
        "Orange",
        "桃",
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view
        
    }
}

// Mark: TableViewDelegate,DataSource
extension MainViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return array.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = UITableViewCell.init(style: .default, reuseIdentifier: "Cell")
        cell.textLabel?.text  = array[indexPath.row]
        return cell
    }
}
```

## 手順解説

やり方としては大きく分けて次の二通りがあるよ
- UISearchControllerに`searchResultsController`をセットして実装する方法(画面遷移あり)
- SearchBarのDelegateメソッドとTableViewのreloadDataを使って実装する

前者の方は工数がかかるかつ説明が大変そうなので後者のやり方を説明するよ。まずは大まかな流れを示すよ

> 1. SearchBarの設置・Outlet接続
> 2. SearchBarDelegateのプロトコル拡張
> 3. DelegateメソッドでSeachBarに入力された文字列を取得する
> 4. `array`の要素のうち3で取得した文字列にマッチした要素を先頭に並び替える

詳細は順次解説

### 手順1. SearchBarの設置
 - StoryboardにSearchBarを設置
 - Outlet接続

詳しい解説は割愛しますが、特にseachbarのdelegateの設定を忘れないように！↓
![enter image description here](https://i.gyazo.com/bee01db3cb477c8898b4ae016770937c.png)

### 手順2. ViewControllerのプロトコル拡張
``` swift
// Mark: UISearchBarDelegate
extension MainViewController: UISearchBarDelegate { }
```

`UISearchBarDelegate`の拡張を行います

### 手順3. DelegateメソッドでSeachBarに入力された文字列を取得する
UISearchBarに入力した文字を確定したタイミングで呼び出されるメソッド`searchBarSearchButtonClicked`を活用するよ

``` swift
func searchBarSearchButtonClicked(_ searchBar: UISearchBar) { }
```

#### 文字列の取得
SearchBarに入力された文字列は`searchBar.text`で取得できるよ。オプショナル型での取得となるので`guard let`等を使ってランラップするとよいよ。

``` swift
func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        guard let searchText = searchBar.text else {
            return
        }
        print(searchText)  //SeachBarに入力された文字列が出力されるはず
}
```

### 手順4.  検索処理の実装
文字列の取得できたら後は検索処理のためのメソッドを定義し、呼び出せば良いだけだよ。今回はマッチする文字列を先頭に持ってくるのみに留めるよ。ポイントは2つ

- SearchBarの文字列情報を渡す引数を用意する
- `tableView.reloadData`を忘れない(忘れると結果が反映されない)

``` swift
private func search(_ text: String) {
    var newArray: [String] = []
    array.forEach({
        if $0.contains(text) {
            newArray.insert($0, at: 0)  
        } else {
            newArray.append($0)
        }
    })
    array = newArray  //新しい配列を代入
    tableView.reloadData()  //反映させる
}
```

#### ・最終的なサンプルコード
検索処理のメソッドが定義できたら、引数に渡しつつ呼び出すだけ

``` swift
//MARK-: UISearchBarDelegate
extension MainViewController: UISearchBarDelegate {
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        guard let searchText = searchBar.text else {
            return
        }
        search(searchText)
    }
    
    private func search(_ text: String) {
        var newArray: [String] = []
        array.forEach({
            if $0.contains(text) {
                newArray.insert($0, at: 0)
            } else {
                newArray.append($0)
            }
        })
        array = newArray
        tableView.reloadData()
    }
}
```

## まとめ
結局はプロトコルを拡張して対応したDelegateメソッドを使ってあーだーこーだするだけだね。

> - SearchBarの文字列は`searchBar.text`で取得できる
> - `searchBarSearchButtonClicked`はSearchBarの入力が確定されたタイミングで呼び出される
> - 最後に`reloadData`を忘れない

### 補足: インクリメンタルサーチとは？？
> リアルタイムで検索結果が表示されるやつ

実装の方法は二種類あります
1. `textDidChange`を使う方法
2. `RxSwift`を使う

#### 方法1. `textDidChange`を活用する
今回使用するDelegateメソッドは`textDidChange`。このメソッドは`UISearchBar`のDelegateメソッドで、SearchBarに文字が入力されるたびに呼び出されるメソッドだよ。`searchBarSearchButtonClicked`の代わりにこちらを使うとインクリメンタルサーチっぽくなるよ。

- [公式ドキュメント](https://developer.apple.com/documentation/uikit/uisearchbardelegate/1624299-searchbar)

#### 方法2. RxSwiftを使う
リアクティブプログラミングという手法で実装する方法です。`RxSwift`というライブラリをインポートする必要があります。`RxSwift`については、別の記事に譲ることにします