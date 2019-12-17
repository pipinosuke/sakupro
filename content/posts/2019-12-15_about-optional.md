---
title: Swiftのoptinalについて。アンラップの仕方や他の型との違いを解説
path: about-optional
created: 2019-12-15T13:42:51.408Z
updated: 2019-12-15T13:42:51.458Z
excerpt: >-
  SwiftにおけるOptional型と非Optional型との違いやアンラップの仕方について解説しているよ。Optionalはアプリ開発においても使うことになるから是非抑えて欲しいよ
featuredImage: ../assets/thumbs/1_s4__g3knebuue6qhywibnq.png
tags:
  - Swift
---
そもそも`String`と宣言しますが、`String?`とすることでoptional型のStringとして宣言できます。

```
var string: String = "Stringだ"
var optionalString: String? = "Optional型のStringだ"
```
ここまでは良いでしょう。問題は「結局、optional型と非optional型は**何が違うの？**」ということではないでしょうか

## 違いはnilを許容するか否か
> - 非optionalはnilを許容しません
> - optionalはnilを許容します

### 「nil」は中身が無である状態
nilとは「そもそも値が入っていない状態のこと」を指します。本筋から逸れるためここでは詳しく解説しませんが、直感的に理解したい方のためにそこそこ有名な画像があるので紹介しておきます。
> ![nil or not nil](https://image.itmedia.co.jp/nl/articles/1702/22/senegal_zeroandnull001.jpg)
> 左のトイレットペーパーが「0」。右がnil

### つまりは初期値が必要ない
nilについての説明を踏まえて、そもそも非optional型の変数や定数を定義するとき、このように必ず初期値が必要でした。
``` swift
var string: String //エラー
var string: String = "ああああ" //OK
```
それに対してoptionalはnilを扱うことができます。したがって初期値は必要ありません。
``` swift
var optionalString: String? //OK
var optionalString: String? = "ああああ" //OK
```

``` swift
print(string) //"ああああ"
print(optinalString) //"Optional(ああああ)"
```

ややこしく感じるところです。optional型を通常の型と同様に扱うためには**アンラップ**(unwrapp)をする必要があるというところがポイントです。

### optionalから普通の型への変換(アンラップ)
では`String?`→`String`への変換はどのように行うと良いでしょうか？

## アンラップ(unwrapp)の仕方
### 1.  `!`(強制アンラップ/無条件アンラップ)
`Unconditional Unwrapping`
``` swift

```
重大な欠点があります。**値がnilの場合もアンラップしてしまう**ことです。エラーとなってしまいます。事前にnilであるかどうかをチェックする必要があります。
``` swift
if optinalString != nil {
   print(optinalString!)
}
```
こうすることでnilであるかどうかを事前にif文でチェックしているわけですから、`print(optinalString!)`はエラーにはなり得なず、安心して使えるわけです。

> 「ここでエラーが出るはずはない」というのをちゃんと検討した上で正しく使う ! は、危険信号ではなくて、前提条件を表す強い意思表示になる  
> 引用: [Swiftの `!` は危険信号か？](https://qiita.com/hironytic/items/0ca33b2c0415cdd38aff)

一概に「強制アンラップは危険！！」と考えるのではなくこのような捉え方をするとうまく扱うことができそうです。

### 2. `if let`構文
1の強制アンラップの説明で触れた事前のnillチェックをスマートに行うことができます。「Optional Binding」と呼ばれます。
``` swift
var optional: String? = "オプショナル"

if let unwrapped = optional {
    print(unwrapped) //実行結果:"オプショナル"
}
print(optional) //実行結果: Optional("オプショナル")
print(unwrapped) //ifのスコープ外なのでエラー
```

上記のコードを例にとると変数`optional`の値がnilでない場合、その値をString型の定数`unwrapped`として扱うことができます。これは`if let`のスコープ内でのみ適応されます。  使う機会は多くないですが`if let`に対して、変数バージョンの`if var`もあります。

### 3. `guard let`構文
これも`if let`構文と同じ「Optional Binding」と呼ばれるものです。`guard let`構文はメソッドの中でのみ使用できます。メソッドの中で早期リターンしたい場合は積極的に使うと良いでしょう。
``` swift
var optionalNil = Optional(nil)
var notNil = Optional(5)

func check(optionalString: String?) -> String {
    guard let string = optionalString else { return "nilだよ" }
    return string + "はnilじゃないよ"
}
```

``` swift
print(check(nil))  //実行結果: nilだよ
print(check(notNil))  //実行結果: nilじゃないよ
```

## 補足 そのほかのアンラップ
### 頻出 OptionalChaining
よく見ると思います。
``` swift

```
### ?? Nil Coalescing
紛らわしいものに`??`があります。
``` swift

```


## まとめ
> - `アンラップ`と言い、
> - nilをアンラップにするとエラーが起きる。事前にnilをチェックすることで安全にアンラップできる。
> -  

- [参考リンク](https://ut3.me/programming/swift-unwrap#toc3)
またoptionalのアンラップがわかればiOSアプリ開発の基本、[コードで行う画面遷移](#)についての理解もしやすいはずです。

