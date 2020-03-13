---
title: SwiftUI基本編① Creating and Combining Views
path: swiftui-tutorial1
created: 2020-03-13T00:38:26.453Z
updated: 2020-03-13T00:38:26.488Z
excerpt: >-
  この記事はSwiftUIのためのいくつか用意されている公式チュートリアルのうち、[【SwiftUI Essentials】Creating and
  Combining
  Views](https://developer.apple.com/tutorials/swiftui/creating-and-combining-views)の内容を自分なりにまとめたものになります。
featuredImage: /content/assets/thumbs/swift-ui-eyecatch.png
tags:
  - Swift
---

### 注） プロジェクトの作成
プロジェクトを作成する際は、下画像のように「User Interface」の項目をSwiftUIにしておくことを忘れないようにしましょう。
![make project](https://i.gyazo.com/8c945ebb229a79e6bfe740c13160bef9.png)

このような感じになっていればおk。

![Hello World](https://i.gyazo.com/e4fd45d03fbb22a2a7640d12cff2e63e.png)

``` swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, World!")
    }
}

//ContentView_Previewsはプレビュー用のコードなので今後弄る必要はない
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

ポイントとなる箇所は次の３つです

> ポイント
> 1. SwiftUIパーツの加工
> 2. Stackでパーツをまとめる
> 3. UIKitとSwiftUIを共存させる

順次解説していきます。

## ポイント1. SwiftUIパーツの加工
下画像のようにHello Worldを加工してみる。ここで加工しているTextに加えてImageView等も同様のやり方で加工が可能なので割愛。
![Changed Hello World](https://i.gyazo.com/ac105656562a7b4b2f4d835a43f81e91.png)

やり方は二種類ある
> - コードから変更を加える方法
> - GUIから変更を加える方法

### 方法1. コードから変更を加える方法
直接コードを書く方法が一つ
``` swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, World!")
            .foregroundColor(.blue) //ココ
            .font(.largeTitle)  //ココ
    }
}
```

### 方法2. GUIから変更を加える方法
加工したいパーツを⌘クリック→「Show SwiftUI Inspecter」と開くことで各プロパティをいじることができる。GUI上で設定すると対応するコードが自動的に記入される
![Change Property](https://i.gyazo.com/a1cf8ae63f4c15ee7cc1f64b5f0ddf45.png)

## ポイント2. Stackでパーツをまとめる
三つのTextをStackでまとめています。

![Arrange Stack](https://i.gyazo.com/4a5dd89603bf0276ab5543fd065c66e2.png)

注目すべきポイントは次の三つでしょうか。

> - `VStack`には左揃えのAlignmentを設定している
> - `Spacer()`で「ヤッホ」と「あああ」の間隔を作っている
> - `padding()`で枠からの間隔を作っている

``` swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading) {  //ココ
            Text("Hello, World!")
                .font(.largeTitle)
                .foregroundColor(.blue)
            HStack {
                Text("ヤッホ")
                    .font(.subheadline)
                Spacer()  //ココ
                Text("あああ")
                    .font(.subheadline)
            }
        }
    .padding()  //ココ
    }
}
```

## ポイント3. `UIViewRepresentable`でUIKitとSwiftUIを共存させる
``` swift
UIViewRepresentable
```
このプロトコルを継承させることでUIKitとSwiftUIの画面を統合することができます！！

### 手順1. Viewの制作
![create new interface](https://i.gyazo.com/4b1909e115c3daebbc03a3fb9a1b6047.png)

`makeUIView`今回はMapViewをして欲しいので、

``` swift
import SwiftUI
import MapKit

struct MapView: UIViewRepresentable {
	//UIKitViewの描画を行う
    func makeUIView(context: Context) -> MKMapView {
        MKMapView(frame: .zero)
    }
    
	//更新されたときの挙動
    func updateUIView(_ uiView: MKMapView, context: Context) {
        let coordinate = CLLocationCoordinate2D(
            latitude: 34.011286, longitude: -116.166868)
        let span = MKCoordinateSpan(latitudeDelta: 2.0, longitudeDelta: 2.0)
        let region = MKCoordinateRegion(center: coordinate, span: span)
        uiView.setRegion(region, animated: true)
    }
}
```

### 手順2 制作したViewをStack内に埋め込む
`MapView()`特にVSStackでまとめていることに注意する
``` swift
struct ContentView: View {
    var body: some View {
        VStack {
            MapView()
                .edgesIgnoringSafeArea(.top)
                .frame(height: 300)
                
            VStack(alignment: .leading) {
                Text("Hello, World!")
                    .font(.largeTitle)
                    .foregroundColor(.blue)
                HStack {
                    Text("ヤッホ")
                        .font(.subheadline)
                    Spacer() 
                    Text("あああ")
                        .font(.subheadline)
                }
            }
            .padding()
            Spacer()
        }
    }
}
```
![result](https://i.gyazo.com/8dee5d062a41fd260c35605e77bd7798.png)
### まとめ
> - パーツはStackでまとめられ、`.padding`や`Spacer()`で位置の調整を行うことができる
> - 各パーツはコード及びGUIからも簡単にプロパティの設定を行うことができて便利
> - `UIViewRepresentable`を継承したViewはSwiftUIに統合が可能
