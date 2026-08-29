"""
Pasaparola Genel Kültür Soru Bankası ve Yardımcı Fonksiyonlar
"""

def turkish_upper(text: str) -> str:
    """
    Türkçe karakterleri (i->İ, ı->I vb.) doğru şekilde büyük harfe dönüştürür.
    """
    mapping = {
        'i': 'İ',
        'ı': 'I',
        'ğ': 'Ğ',
        'ü': 'Ü',
        'ş': 'Ş',
        'ö': 'Ö',
        'ç': 'Ç'
    }
    result = []
    for char in text.strip():
        if char in mapping:
            result.append(mapping[char])
        else:
            result.append(char.upper())
    return "".join(result)


DATA = [
    {"harf": "A", "kelime": "ANKARA", "soru": "Türkiye Cumhuriyeti'nin başkenti olan ilimiz."},
    {"harf": "B", "kelime": "BOĞAZİÇİ", "soru": "İstanbul'da Karadeniz ile Marmara Denizi'ni birbirine bağlayan boğaz."},
    {"harf": "C", "kelime": "CUMHURİYET", "soru": "Halkın kendi yöneticilerini kendisinin seçtiği yönetim biçimi."},
    {"harf": "Ç", "kelime": "ÇANAKKALE", "soru": "'Çanakkale Geçilmez' destanının yazıldığı tarihi şehrimiz."},
    {"harf": "D", "kelime": "DÜNYA", "soru": "Güneş'e yakınlık bakımından 3. sırada yer alan, üzerinde yaşadığımız gezegen."},
    {"harf": "E", "kelime": "EDEBİYAT", "soru": "Olay, düşünce ve duyguların dil aracılığıyla estetik biçimde ifade edildiği sanat dalı."},
    {"harf": "F", "kelime": "FUTBOL", "soru": "11'er kişilik iki takım arasında topla oynanan dünyaca popüler spor dalı."},
    {"harf": "G", "kelime": "GÖBEKLİTEPE", "soru": "Şanlıurfa'da bulunan, tarihin bilinen en eski tapınak yerleşimi."},
    {"harf": "H", "kelime": "HALİÇ", "soru": "İstanbul Boğazı'nın girişinde yer alan boynuz biçimindeki doğal liman (Altın Boynuz)."},
    {"harf": "I", "kelime": "IHLAMUR", "soru": "Kış aylarında çayı sıkça tüketilen, hoş kokulu çiçekleri olan ağaç."},
    {"harf": "İ", "kelime": "İSTİKLAL", "soru": "Mehmet Akif Ersoy tarafından yazılan milli marşımızın adı (İstiklal Marşı)."},
    {"harf": "K", "kelime": "KAPADOKYA", "soru": "Peri bacaları, yer altı şehirleri ve sıcak hava balonlarıyla ünlü turistik bölgemiz."},
    {"harf": "L", "kelime": "LALE", "soru": "Osmanlı döneminde bir devre adını veren, soğanlı ve renkli meşhur süs çiçeği."},
    {"harf": "M", "kelime": "MARMARA", "soru": "Tamamı Türkiye sınırları içinde yer alan iç denizimiz."},
    {"harf": "N", "kelime": "NOBEL", "soru": "İsveçli kimyager Alfred Nobel'in mirasıyla her yıl çeşitli alanlarda verilen saygın ödül."},
    {"harf": "O", "kelime": "OKYANUS", "soru": "Kıtaları birbirinden ayıran çok büyük deniz kütlelerinin her biri."},
    {"harf": "Ö", "kelime": "ÖZGÜRLÜK", "soru": "Herhangi bir kısıtlamaya bağlı olmaksızın davranabilme durumu (Hürriyet)."},
    {"harf": "P", "kelime": "PİRİ REİS", "soru": "16. yüzyılda ceylan derisi üzerine çizdiği dünya haritasıyla ünlü Osmanlı denizcisi."},
    {"harf": "R", "kelime": "ROMAN", "soru": "İnsanların serüvenlerini, karakterlerini ayrıntılı anlatan uzun edebi tür."},
    {"harf": "S", "kelime": "SİNEMA", "soru": "Hareketli görüntülerin beyaz perdeye yansıtılmasına dayanan 7. sanat dalı."},
    {"harf": "Ş", "kelime": "ŞİİR", "soru": "Duygu ve düşüncelerin ahenkli, ritimli ve dizeler halinde ifade edildiği edebi tür."},
    {"harf": "T", "kelime": "TİYATRO", "soru": "Bir sahnede seyirciler önünde oyuncuların sergilediği sahne sanatı."},
    {"harf": "U", "kelime": "UZAY", "soru": "Bütün gök cisimlerinin içinde bulunduğu sonsuz kabul edilen boşluk."},
    {"harf": "Ü", "kelime": "ÜNİVERSİTE", "soru": "Yüksek düzeyde eğitim, öğretim ve bilimsel araştırma yapılan kurum."},
    {"harf": "V", "kelime": "VAN", "soru": "Türkiye'nin en büyük gölüne ev sahipliği yapan ilimiz."},
    {"harf": "Y", "kelime": "YAZAR", "soru": "Kitap, makale veya edebi metinler kaleme alan kişi."},
    {"harf": "Z", "kelime": "ZEUGMA", "soru": "Gaziantep'te yer alan ve 'Çingene Kızı' mozaiğiyle dünyaca ünlü antik kent."}
]
