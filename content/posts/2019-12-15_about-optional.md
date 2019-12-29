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
### 前置き

今回は文字列を扱うString型を例に考えてみます。String型を定義する時は`String`と宣言します。それに対して、OptionalのString型を定義したい時は`String?`とすることで宣言できます。

```swift
var string: String = "Stringだ"
var optionalString: String? = "Optional型のStringだ"
```

ここまでは良いでしょう。問題は「結局、optional型と非optional型は**何が違うの？**」ということではないでしょうか

## 決定的な違いは「nilを許容するか否か」

> * 非optionalはnilを許容しません
> * optionalはnilを許容します

### 「nil」は中身が無である状態

nilとは「そもそも値が入っていない状態のこと」を指します。本筋から逸れるためここでは詳しく解説しませんが、nilの状態について直感的に理解したい方のためにそこそこ有名な画像があるので紹介しておきます。

> ![nil or not nil](https://image.itmedia.co.jp/nl/articles/1702/22/senegal_zeroandnull001.jpg)\
> 左のトイレットペーパーが「0」。右がnil

### Optionalは初期値が要らない

先ほどのnilの説明を踏まえて、そもそも非optional型の変数や定数を定義するとき下のように必ず初期値が必要でした。なぜなら初期値がなくては定義した段階で値がnilになってしまうからです

```swift
var string: String = "ああああ"
var string: String //エラー
```

それに対してoptionalはnilを許容するので、初期値は必要ありません。

```swift
var optionalString: String? = "ああああ"
var optionalString: String?
```

### さらに詳しくみてみる

さらにOptionalと非Optional両方の値をprintしてみます。

```swift
var string: String = "ああああ"
print(string) //実行結果: "ああああ"

var optionalString: String? = "ああああ"
print(optinalString) //実行結果: "Optional(ああああ)"
```

実行結果が異なることがわかります。さらに

```swift
var string: String = "ああああ"
var optionalString: String? = "ああああ"
string = optionalString //エラー
```

Optional型を通常の型と同様に扱うためには**アンラップ**(unwrapp)をする必要があるというところがポイントであると同時に、ややこしく感じてしまうところです。

### optionalから普通の型への変換(アンラップ)

では`String?`→`String`への変換はどのように行うと良いでしょうか？

## アンラップ(unwrapp)の仕方
よく使うのは次の3つです

> - !(強制アンラップ)
> - Optinoal Binding(オプショナル拘束)
>    - if let構文
>    - guard let構文

### 1.  `!`(強制アンラップ)

シンプルかつわかりやすい方法がこの方法です。アンラップする対象の末尾に`!`を付けるとアンラップができます。どうでもいいですが英名では「Unconditional Unwrapping(無条件アンラップ)」と言います

```swift
var optionalStr: String? = "ああ"
print(otionalStr!) //実行結果: "ああ"
```

一見簡単で使いやすそうに見えますが、この強制アンラップには重大な欠点があります。それは**optionalの値がnilの場合もアンラップし、エラーを起こしてしまう**ことです。Optionalでしか扱えないnilを強制的に通常の型へと変換しようとするわけですから、当然エラーとなるわけです。これを防ぐためにはアンラップする前にnilであるかどうかをチェックする必要があります。

```swift
if optinalString != nil {
   print(optinalString!) //安心してアンラップできる
}
```

このようにnilであるかどうかをアンラップする前にif文でチェックすることで、`print(optinalString!)`はエラーにはなり得なず、安心して使えるわけです。一概に「強制アンラップは危険！！」と考えるのではなくこのような捉え方をするとうまく扱うことができそうです。

> 「ここでエラーが出るはずはない」というのをちゃんと検討した上で正しく使う ! は、危険信号ではなくて、前提条件を表す強い意思表示になる\
> 引用: [Swiftの `!` は危険信号か？](https://qiita.com/hironytic/items/0ca33b2c0415cdd38aff)

### 2. `if let`構文

Swiftには先ほどの強制アンラップの説明で触れた事前のnillチェックをスマートに行うことができる構文が用意されています。それが`If let`構文です。

```swift
var optional: String? = "オプショナル"

if let unwrapped = optional {
    print(unwrapped) //実行結果: "オプショナル"
}
print(optional) //実行結果: Optional("オプショナル")
print(unwrapped) //ifのスコープ外なのでundefinedエラー
```

上記のコードを例にとると変数`optional`の値がnilでない場合、その値をString型の定数`unwrapped`として扱うことができます。これは`if let`のスコープ内でのみ適応されます。  スコープ内でのみoptionalをアンラップして扱えることから、この構文は「Optional Binding(オプショナル拘束)」とも呼ばれます。 また使う機会は多くないですが`if let`に対して、変数バージョンの`if var`もあります。

### 3. `guard let`構文

これも`if let`構文と同じ「Optional Binding」と呼ばれるものです。`guard let`構文はメソッドの中でき、のみ使用できます。メソッドの中で早期リターンしたい場合は積極的に使うと良いでしょう。

```swift
var optionalNil = Optional(nil)
var notNil = Optional(5)

func check(optionalString: String?) -> String {
    guard let string = optionalString else { return "nilだよ" }
    return string + "はnilじゃないよ"
}
```

```swift
print(check(nil))  //実行結果: nilだよ
print(check(notNil))  //実行結果: nilじゃないよ
```

## 補足 そのほかのアンラップ

### 頻出 Optional Chaining

よく見ると思います。ちなみに「Chainning」を直訳すると「連鎖」と言う意味になります。メソッドは呼び出されず、nilが返されます。

```swift
var optionalString: String? = "ああああ"
print(optionalString?.count) //実行結果: "Optional(4)"
```

### ?? Nil Coalescing

`??`はSwiftで用意されている演算子の１つで、アンラップに使います。

```swift
let hoge = (A ?? B)  //この時のAはOptional
```

上記のコードでは、まずAがnilであるかを評価し、次のような処理を行います。

* `A`がnilでない時、hogeの値は`A!`
* `A`がnilの時、hogeの値は`B`

具体的な例として次のようなメソッドを考えてみましょう。

```swift
func check(value : String?) {
    print(value ?? "いや、nilやん。")
}
```

`(value ?? "いや、nilやん。")`をprintしているところに注目です。こうなります。

```swift
check(value: Optional("aaa")) //実行結果: "aaaa"
check(value: nil) //実行結果: "いや、nilやん。"
```

## まとめ

> * optional型を通常の型に変換することを`アンラップ`と言う
> * nilをアンラップするとエラーが起きる。事前にnilをチェックすることでこれを回避し、安全にアンラップができる。
> * 安全なアンラップは「Optoinal Binding」等、Swiftの構文として数種類用意されているので状況に応じてうまく使い分けて活用する

### 最後に

optionalのアンラップがわかればiOSアプリ開発の基本、[コードで行う画面遷移](#)についての理解もしやすいはずです。\
また、Optionalについてさらに極めたい人は下の記事が参考になるでしょう。

* [SwiftのOptional型を極める](https://qiita.com/koher/items/c6f446bad54442a28bf4)
