---
title: 「メソッド」を完全に理解するための3つの概念
path: describe-method
created: 2020-01-23T00:11:07.662Z
updated: 2020-03-06T00:11:07.675Z
excerpt: >
  メソッドはプログラミングにおける基本中の基本だけど「分かったようで意外と分かっていない」、「ノリでやってる」という人も多いんじゃないかな？たった3つの概念をしっかり押さえておけば、メソッドは完璧に理解できるよ
featuredImage: ../assets/thumbs/1_s4__g3knebuue6qhywibnq.png
tags:
  - 入門
  - Swift
---
## メソッドに登場する3つの概念
メソッドを理解する上で必要な概念は次の三つしかないよ

> 1. 定義と呼び出し
> 2. 引数
> 3. 返り値

この中でも特に大事なのが**引数**と**返り値**だよ。まずはこの二つについて説明を始める前に1の「メソッドの定義と呼び出し」について簡単に解説しておくよ。

###  メソッドの定義と呼び出し
例えばこんなスクリプトがあったとするよ。
``` swift
func hello() {
   print("HelloWorld")
}
//実行結果: なし
```
このスクリプトを実行しても何も起きないよ。なぜかというとメソッドは**定義するだけではなく、呼び出すことで初めて実行される**ものだからだよ
``` swift
func hello() {
   print("HelloWorld")
}
hello()  //メソッドを呼び出している
//実行結果: "HelloWorld"
```

## 「引数」と「返り値」を理解する
という事で本題に入るよ。定義と呼び出しについて理解してもらったところで、ここからは引数と返り値の説明をしていくよ。  
そもそも引数と返り値は**ある場合とない場合があるよ**。そこで引数と返り値の役割を理解するために、次の4つのメソッドのサンプルを順番に紹介するよ。段階を追った形で理解しやすいはずだよ。

> A. 引数のみのメソッド
> B.  返り値のみのメソッド
> C. 引数も返り値もないメソッド
> D.  引数・返り値の両方があるメソッド

### パターンA. 引数があるメソッド
まず初めに引数があるメソッドを見てみるよ。
``` swift
func say(words: String) {
    print(words)
}
```

ここで注目して欲しいのがカッコの中身。ここが引数を表している部分になるよ。
``` swift
(words: String)
```
そもそも引数は**引数名**と**引数型**で構成されているよ。そして今回の場合、引数名と引数型は下の通りとなるよ

- `words`は**引数名**
- `words`の**引数型**は`String`

つまり「`words`という引数には`String`型の値しか渡すことができない」ということになるよ

#### ・メソッドの呼び出し
それを踏まえてメソッドの呼び出しを見てみよう。呼び出し時に引数`words`に文字列`"やーい"`を渡していることがわかるよ。また、先ほど述べた通り引数`words`には**String以外の値は渡せない**よ。

``` swift
say(words: "やーい") //実行結果: "やーい"
say(words: "おおおお") //実行結果: "おおおお"
say(words: 1) //1はIntなのでエラー
```

### パターンB. 返り値のみがあるメソッド
続いて返り値があるメソッドを見てみよう
``` swift
func pikachu() -> String {
    return "ピカー"
}
```

ここで注目して欲しいのが`return "ピカー"`の部分で、これは`"ピカー"`という文字列を`return`(返却)しているよ。さらに`-> String`の部分にも注目して欲しいよ

- `-> String`は**返り値型**
- 文字列`"ピカー"`が**返り値**

返り値は返り値型と一致している必要があるよ。ダメな例をあげるとこうなるよ
``` swift
func pikachu() -> String {
    return 1  //返り値「1」はStringじゃないのでエラー
}
```

#### ・呼び出し
``` swift
let pika = pikachu()
print(pika)//実行結果: ピカー
```

### パターンC. 引数も返り値もないメソッド
これは一番シンプルな形とも言えるかもしれない。この`hello`というメソッドに引数・返り値はないよ。
``` swift
func hello() {
    print("こんにちは")
}
```
`()`に違和感を感じる人もいたと思うけど、この理由は引数が存在しないからだよ

#### ・呼び出し
そしてこのメソッドを呼び出すときはこう呼び出すよ
``` swift
hello() //実行結果: "こんにちは"
```
まぁ簡単だね

### パターンD 引数・返り値の両方があるメソッド
続いて引数と返り値の両方があるメソッドを見てみるよ。A~Cを組み合わせれば、次のメソッドも何をやっているか理解できるはずだよ。
``` swift
func countCharacters(characters: String) -> Int {
     return characters.count
}
print(countCharacters(characters: "ああああ")) //実行結果: 4
```

### 補足
#### 補足1： 引数が複数個存在するケース
`apples`と`baskets`の二つが引数として存在している。その際の引数宣言は`,`で区切る。
```swift
func countApplesInTheBaskets(apples: Int, baskets: Int) -> Int {
   let numberOfApples = apples * baskets
   return String(numberOfApples) + "個です"
}
print(countApplesInTheBaskets(apples: 5, baskets: 3)) //実行結果: 15個です
```

#### 補足2: 引数名を省略するケース
このように引数宣言の前に`_`をつける。
```swift
func countCharacters(_ characters: String) -> Int {
	return characters.count
}
```
呼び出しの際、引数を明示的に宣言せずともメソッドに値を渡すことができる。
``` swift
let charactersNumber = countCharacters("ああああ")
print(charactersNumber) //実行結果: 4
```

#### 補足3: 引数にデフォルトの値が設定されているケース
引数宣言する際に値を代入する
```swift
func makeQery(_ query: String? = nil) -> [String: String?] {
	return ["title":query]
}
```
引数に渡してない場合は代入されていた値が渡される。

``` swift
print(makeQuery()) //実行結果: ["title":nil]
print(makeQuery("Swift")) //実行結果: ["title":"Swift"]
```
通信絡みの実装で使われることが多い気がします。

 
## まとめ
- メソッドは定義するだけでなく、それを呼び出す事で初めて実行される。
- **引数**と**返り値**はある場合とない場合がある。
- `return`で返却される返り値の型はメソッドの宣言時に定義される「返り値型」と一致している必要がある
- 同様に、引数に渡される値はその引数型と一致している必要がある
- 引数は複数個あったり、省略して呼び出したりもできる
