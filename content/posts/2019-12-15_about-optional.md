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

nilとは「そもそも値が入っていない状態のこと」を指します。Stringの場合「""」でもInt型の場合の「0」でもありません。

### つまりは初期値が必要ない
そもそも非optional型の変数や定数を定義するとき、このように必ず初期値が必要でした。
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
重大な欠点があります。事前にnilであるかどうかをチェックする必要があります。
``` swift
if optinalString != nil {
   print(optinalString!)
}
```
### 2. `if let`
`Optional Binding`。nillチェックをスマートに行うことができます。

### 3. `guard let`
これも`if let`と同じ`Optional Binding`。メソッド内で早期リターンしたい場合は積極的に使いましょう。

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

