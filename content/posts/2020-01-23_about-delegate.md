---
title: 「Delegate」とは？
path: about-delegate
created: 2020-01-23T03:09:54.147Z
updated: 2020-01-23T03:09:54.162Z
excerpt: >-
  当たり前のようにDelegateという言葉が使われていて戸惑った経験があるよ。今となっては感覚的に理解したつもりだけど、整理するためにもわかりやすく文章化してみることにするよ。Delegateについて同じくピンときていない人はぜひ参考にして欲しいよ
featuredImage: ../assets/thumbs/1_s4__g3knebuue6qhywibnq.png
tags:
  - Swift
  - iOSアプリ
---


## キーワードは「移譲」！！
よくわからない時は直訳してみると良いよ。そもそも「delegate」を直訳すると「移譲」と言う意味になるよ。うん、ピンとこないね。  
移譲といえば、そもそも「**何を**移譲しているのか」。そして「**何から何に**移譲しているのか」。この2点を理解することができればきっと`Delegate`についてよくわかるはずだよ。この記事では先ほど挙げた二点を焦点に当てて、わかりやすい解説に努めることにするよ


## delegateを用いて実装を行う手順
### 1. UIViewControllerにプロトコルを準拠させ、delegateメソッドの実装する
``` swift
extension MainViewController: UITableViewDelegate, UITableViewDataSource { }
```
まず最初に実装を行うViewController(今回は`MainViewController`)に対して`UITableViewDelegate`と`UITableViewDataSource`の二つを準拠させるよ。これにより**delegateメソッドの実装が可能になる**よ。


### 2. delegateを宣言する
delegateメソッドを実装するだけでなく、そのdelegateを宣言することで初めて読み込まれることになるよ。delegateを宣言する方法は次の二つあるよ

> - コードでdelegateを宣言する方法
> - Storyboradでdelegateを宣言する方法

順次解説

#### ・コードでdelegateを宣言する方法
TableViewを実装する場合を考えてみよう。元々はUITableViewControllerで実装するものだが、それをUIViewControllerで実装していることになる。

今回はTableViewを例に考えてみることにするよ。[UIViewControllerでTableViewの実装](https://saku-program.com/how-to-use-table-view)を行った場合、こういったコードを見かけたことはないかな。

``` swift
tableView.delegate = self
tableView.dataSource = self
```

#### ・Storyboradでdelegateを宣言する方法

![set delegate](https://i.gyazo.com/0d0a44f54540904be473f8ffa917abd1.png)

#### 1. 「何を移譲しているのか」
delegateメソッドを宣言することで実装が可能だったよ。実装を移譲

#### 2. 「何から何に移譲しているのか」
UITableViewControllerからUIViewControllerに

## まとめ
>  - delegateとはdelegateメソッドによる「実装の移譲」である
>  - 移譲先のViewControllerでは
