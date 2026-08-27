"""
6. Sınıf Fen Bilimleri - Pasaparola Soru Bankası ve Yardımcı Fonksiyonlar
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
    {"harf": "A", "kelime": "AY", "soru": "Dünya'nın tek doğal uydusu olan gök cismi."},
    {"harf": "B", "kelime": "BUHARLAŞMA", "soru": "Sıvı maddelerin ısı alarak gaz haline geçmesi."},
    {"harf": "C", "kelime": "CANLI", "soru": "Beslenen, solunum yapan, çoğalan ve hareket eden varlıkların genel adı."},
    {"harf": "Ç", "kelime": "ÇEVRE", "soru": "Canlıların yaşamlarını sürdürdükleri doğal ortam."},
    {"harf": "D", "kelime": "DİNAMOMETRE", "soru": "Kuvvetin büyüklüğünü ölçmek için kullanılan araç."},
    {"harf": "E", "kelime": "ERİME", "soru": "Katı bir maddenin ısı alarak sıvı hale geçmesi."},
    {"harf": "F", "kelime": "FOSİL", "soru": "Milyonlarca yıl öncesinden günümüze kadar kayalar içinde saklanmış canlı kalıntısı."},
    {"harf": "G", "kelime": "GÜNEŞ", "soru": "Dünya'mızın ısı ve ışık kaynağı olan en yakın yıldız."},
    {"harf": "H", "kelime": "HÜCRE", "soru": "Canlıların canlılık özelliği gösteren en küçük yapı birimi."},
    {"harf": "I", "kelime": "IŞIK", "soru": "Çevremizdeki maddeleri görmemizi sağlayan enerji türü."},
    {"harf": "İ", "kelime": "İLETKEN", "soru": "Elektrik akımını veya ısıyı kolayca ileten madde."},
    {"harf": "K", "kelime": "KUVVET", "soru": "Duran bir cismi hareket ettiren veya hareket eden cismi durduran etki."},
    {"harf": "L", "kelime": "LAMBA", "soru": "Elektrik enerjisini ışık enerjisine çeviren devre elemanı."},
    {"harf": "M", "kelime": "MANTAR", "soru": "Kendi besinini üretemeyen, sporla çoğalan canlı grubu."},
    {"harf": "N", "kelime": "NEWTON", "soru": "Kuvvetin birimi (kısaca N ile gösterilir)."},
    {"harf": "O", "kelime": "OKSİJEN", "soru": "Nefes alırken akciğerlerimize çektiğimiz hayati gaz."},
    {"harf": "Ö", "kelime": "ÖLÇÜM", "soru": "Bir büyüklüğü dereceli silindir veya termometre gibi araçlarla belirleme işlemi."},
    {"harf": "P", "kelime": "PÜRÜZLÜ", "soru": "Yüzeyi düzgün olmayan, sürtünmesi fazla olan zemin."},
    {"harf": "R", "kelime": "RÜZGAR", "soru": "Yüksek basınçtan alçak basınca doğru gerçekleşen yatay hava hareketi."},
    {"harf": "S", "kelime": "SÜRTÜNME", "soru": "Temas halinde olan iki yüzey arasında hareketi zorlaştıran kuvvet."},
    {"harf": "Ş", "kelime": "ŞEFFAF", "soru": "Işığı tamamen geçiren saydam maddeler."},
    {"harf": "T", "kelime": "TERMOMETRE", "soru": "Sıcaklığı ölçmek için kullanılan dereceli alet."},
    {"harf": "U", "kelime": "UYDU", "soru": "Gezegenlerin etrafında dolanan gök cisimlerinin genel adı (Örn: Ay)."},
    {"harf": "Ü", "kelime": "ÜREME", "soru": "Canlıların nesillerini devam ettirebilmek için yeni canlılar oluşturması."},
    {"harf": "V", "kelime": "VÜCUT", "soru": "Canlıların fiziksel yapısını oluşturan doku ve organların bütünü."},
    {"harf": "Y", "kelime": "YANSIMA", "soru": "Işığın bir yüzeye çarpıp geldiği ortama geri dönmesi."}
]
