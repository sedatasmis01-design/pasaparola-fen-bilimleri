# 🔬 Fen Bilimleri Pasaparola Yarışması (Akıllı Tahta & Web Uyumlu)

6. Sınıf Fen Bilimleri dersi (5. sınıf tekrar destekli) için hazırlanmış, **Akıllı Tahta Uyumlu**, **Jokerli**, **Takım Modlu** ve **Dokunmatik Sanal Klavyeli** Pasaparola yarışma platformu.

---

## 🌐 1. Web Uygulaması Olarak Çalıştırma (Önerilen)

Herhangi bir kurulum veya ek programa gerek yoktur! Akıllı tahtalarda, tabletlerde ve bilgisayarlarda doğrudan tarayıcı üzerinden açılır.

* `index.html` dosyasına çift tıklayarak tarayıcınızda (Google Chrome, Microsoft Edge vb.) anında başlatabilirsiniz.

### 🌟 Web Versiyonu Öne Çıkan Özellikleri:
1. **⛶ Akıllı Tahta Tam Ekran Modu:** Tek tıkla tahtayı tam ekran kaplayan yüksek kaliteli arayüz.
2. **⌨️ Dokunmatik Türkçe Sanal Klavye:** Tahtada fiziksel klavye olmadığında ekrandan rahatça yazabilme imkanı.
3. **⚡ Yarışma Jokerleri:**
   * 💡 **Harf Al (İpucu):** Kelimenin harflerini tek tek açar (`D _ N A _ _ _ _ E T R E`).
   * ⏳ **+15 Sn:** Sayaca anında 15 saniye ekler.
   * 👥 **Sınıfı Dinle:** Süreyi duraklatarak sınıf içi tartışma ortamı sağlar.
4. **👥 Sınıf İçi Takım Yarışması Modu:**
   * Sınıfı **🔵 Mavi Takım** ve **🌸 Pembe Takım** olarak ikiye ayırır.
   * Sırayla soru sorar, takım puanlarını canlı tutar ve sonunda kazananı kutlar.
5. **📚 Çoklu Soru Paketi:**
   * *6. Sınıf Genel Fen Bilimleri*
   * *6. Sınıf Güneş Sistemi ve Vücudumuz Sistemleri*
   * *5. Sınıf Temel Fen Kavramları Tekrarı*
6. **🔊 Web Audio Canlı Sesler:** Doğru, yanlış, pas, joker, süre tık-tıkları ve zafer jingle'ları.
7. **🎊 Konfeti Efekti:** Doğru cevaplarda ve oyun bitiminde canlı kutlama animasyonu.

---

## 🐍 2. Python Masaüstü Uygulaması Olarak Çalıştırma

Terminal veya komut satırında:

```bash
python main.py
```

---

## 📁 Proje Dosya Yapısı

- `index.html` : Web uygulaması ana sayfası ve arayüz iskeleti.
- `style.css` : Modern karanlık tema, animasyonlar ve sanal klavye tasarımı.
- `app.js` : Oyun motoru, Web Audio ses sentezleyici, konfeti ve joker kontrolleri.
- `questions_bank.js` : Ünite ve sınıf bazlı geniş soru veri setleri.
- `main.py` : Python Tkinter masaüstü versiyonu.
- `questions.py` : Python versiyonu soru havuzu.
