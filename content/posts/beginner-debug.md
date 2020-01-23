---
title: デバッグを制するものは開発を制す
path: beginner-debug
created: 2019-11-02T00:00:00.000Z
updated: 2020-01-22T00:00:00.000Z
excerpt: 一見地味だけど開発効率・学習効率を高める上で非常に重要な「デバッグ」について簡単にまとめるよ。初心者の方には特に読んでほしいよ
featuredImage: ../assets/thumbs/debug.jpg
tags:
  - 入門
---

## デバッグを駆使して、闇雲なゴリ押し開発からお別れしよう
学びはじめの人がエラーが出ていた時の様子を見ているとエラーメッセージをよく読まずに思いついた方法を片っ端から試すようなやり方をしがちな傾向があるよ。このやり方は必ず息詰まる場面がくるし、学習効率的にもよくないよ。
効率よく原因を特定して、バグを治すためには`デバッグ`が効果的だよ。

> デバッグを制するものは開発を制す

と言っても過言ではないと個人的には思うよ。

### 「デバッグ」とは？？
デバッグとはバグの原因を特定し、取り除く作業のことを指すよ。上手にデバッグすることができれば調べるべき情報や箇所が明確になり、手探りでコードを書き直すよりも圧倒的にスムーズにバグを潰すことが可能だよ。

## デバッグでやることは2つ
と言っても難しいことではないよ。デバッグにおける大事なポイントは２つだけだよ。
### 1. エラーメッセージを読んで、ググろう
１つ目は**エラーメッセージをちゃんと読むこと**だよ。これだけで大半のエラーは解決できるよ。解決できないにしろどの辺のコードに問題があったのかぐらいの目星はつけることができるよ。

#### ・ググりさえすれば、(最悪)英語はわからなくても良い
ちなみにエラーメッセージは全て英語で出力されるよ。この時点で嫌悪してしまう人もいるかもしれないけど、わからなくてもなんとかなるよ。エラーメッセージをそのままググれば、その原因を日本語で解説してくれている記事は多いよ

###  2. breakpointとprintを駆使し、原因を特定しよう
エラーメッセージを読んで問題のありそうな箇所は分かった、だけどどこよくわからない場合はbreakpointとprintを駆使して可能性を潰していこう。

## 実際にデバッグしてみる
初心者が引っかかりやすい画面遷移する際のことを例にするよ。Storyboard上での設定がしっかりされていれば、次のコードで画面遷移ができるよ(詳細は[コードで行う画面遷移](https://saku-program.com/ios-transition)を参照)。

``` swift
let storyboard = UIStoryboard(name: "Next",bundle: nil)
guard let viewController =  storyboard.instantiateInitialViewController() as? NextViewController else { return }
navigationController?.pushViewController(viewController, animated: true)
```

### 画面遷移できない原因は3つ考えられる
コードはあっているはずなのにうまく画面遷移ができない時に考えられる原因は次の三つだよ。原因1によるエラーの場合はエラ〜メッセージが表示されるから把握しやすいけど原因2,原因3はエラーメッセージがでないよ。

> 原因1.  `UIStoryboard(name: "Next",bundle: nil)`でStoryboardを取得できていない
> 原因2. `storyboard.instantiateInitialViewController()`の返り値がのため、`guard let`による早期returnが実行されている(エラーが発生しない)
> 原因3. `navigationController?`がnilのため、`pushViewController`が呼び出されない(エラーが発生しない)

#### 原因1の検証
> printしてみる
``` swift
print(UIStoryboard(name: "Next",bundle: nil))
```

#### 原因2の検証
> `return`にbreakpointをおく

``` swift
guard let viewController = storyboard.instantiateInitialViewController() as? NextViewController else { return }
```
`guard let`によるアンラップを行っているわけだけど、storyboard.instantiateInitialViewController() の値が場合は`return`が実行されるよ。

#### 原因3の検証
> navigationControllerをprintしてみる
``` swift
print(navigationController?)
//nilがプリントされたら修正の必要があることがわかる
```