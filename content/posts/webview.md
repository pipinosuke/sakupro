---
title: アプリ内でWebページを開く、WebView(WKWebView)の使い方
path: how-to-use-webview
created: 2019-12-15T07:46:53.401Z
updated: 2019-12-15T07:46:53.443Z
excerpt: アプリ内でWebページを開きたい時に使う、WKWebViewについての解説をしているよ。ちなみにWebViewは非推奨になったから注意して欲しいよ。
featuredImage: ../assets/thumbs/webkitview.png
tags:
  - iOSアプリ
---
### 前置き
元々はUIKitで提供されていた[WebView](https://developer.apple.com/documentation/uikit/uiwebview)ですが、数年程前からdeprecated(非推奨)になっています。ですのでこちらは使用せず、代わりに[WebKit](https://developer.apple.com/documentation/webkit)で提供されている[WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)を使いましょう

## 手順
早速使い方の手順を説明していきます。流れとしてはこうです。

> 1. WebKitをインポートする
> 2. WKWebViewをoutlet接続する
> 3. WKWebViewでurlを開く

### 1. WebKitをインポートする
「TARGETS」→「General」→「Frameworks, Libraries, and Embedded Content」から＋を押してWebKitを追加します。
![enter image description here](https://i.gyazo.com/fe7bceeeab1663214a57c70bebaec59e.png)
状態はDo not Embedのままでおkです。WebViewを使う時はこのようにインポートして使います。
```swift
import WebKit
```
WebKitViewを扱いたいViewControllerのファイルに追記しておきましょう。

### 2. WKWebViewをoutlet接続する
選ぶのは下です！！deprecatedの方を選ばないように・・・！！
![select wkwebview](https://i.gyazo.com/ee9819205dc3e0f429c573628b97064c.jpghttps://i.gyazo.com/ee9819205dc3e0f429c573628b97064c.jpg)  
最終的にこんな感じになるでしょう。
```swift
import UIKit
import WebKit

class WebViewController: UIViewController {
    @IBOutlet weak var webView: WKWebView!    
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
}
```

### 3. WKWebViewでURLを開く
`load()`というメソッドでURLを読み込むことができます。コードを見るとこう。
``` swift
//apple公式ドキュメントより抜粋
func load(_ request: URLRequest) -> WKNavigation?
```
urlを引数として渡す際にはString型をURLRequest型に変換する必要があるようです。実際のコードはこうなります。
``` swift
override func viewDidLoad() {
    let url = URL(string: "https://google.com")!
    let urlRequest = URLRequest(url: url)
    webView.load(urlRequest)
}
```
viewDidLoad()で読み込んでいます。String型から直接URLRequest型に変換することはできないので「String」→「URL」→「URLRequest」と変換しています。少し冗長な感じが否めませんが、かといって無理やり一行に収めるのも可読性の観点からお勧めできません。  このようにメソッドに切り分けておくと少しはましでしょうか
```swift
override func viewDidLoad() {
    super.viewDidLoad()

    // Do any additional setup after loading the view.
    openURL("https://google.com")
}

private func openURL(_ string: String?) {
    guard let string = string else { return }
    let url = URL(string: urlStr)!
    let request = URLRequest(url: url)
    webView.load(request)
}
```

#### 注: 読み込むURLが「http://~」の場合に必要な設定手順
http://~から始まるURLを開く場合、下画像のように設定が必要です！！気を付けましょう
![enter image description here](https://i.gyazo.com/0d4ddd0b648c1b7b149c2c6a1634ea7c.png)
簡単な手順としてはまず`Info.plist`を開きまして、「App Transport Security Settings」→「Allow Arbitrary Loads」の値をYESとします。項目は＋ボタンで追加可能です。わからなければ下の記事を見るのがわかりやすいです。
- [XcodeでiOSアプリのhttp通信を許可する方法](https://fukatsu.tech/permit-http-ios)

## まとめ
> - WebViewは非推奨！！WKWebViewを使おう
> - WKWebViewはWebKitというライブラリをインポートしないと使えない
> - WebViewのメソッド、`load()`の引数はURLRequest型。String型から変換して渡そう

ありがとうございました

#### 参考
- [WKWebView公式ドキュメント](https://developer.apple.com/documentation/webkit/wkwebview)
