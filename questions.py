"""
Fen Bilimleri Pasaparola Soru Bankası ve Yardımcı Fonksiyonlar
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
    {"harf": "D", "kelime": "DİNAMOMETRE", "soru": "Kuvvetin büyüklüğünü ölçmek için kullanılan yaylı araç."},
    {"harf": "E", "kelime": "ERİME", "soru": "Katı bir maddenin ısı alarak sıvı hale geçmesi."},
    {"harf": "F", "kelime": "FOSİL", "soru": "Milyonlarca yıl öncesinden günümüze kadar taşlaşmış canlı kalıntısı."},
    {"harf": "G", "kelime": "GÜNEŞ", "soru": "Dünya'mızın ısı ve ışık kaynağı olan en yakın orta büyüklükteki yıldız."},
    {"harf": "H", "kelime": "HÜCRE", "soru": "Canlıların canlılık özelliği gösteren en küçük temel yapı birimi."},
    {"harf": "I", "kelime": "IŞIK", "soru": "Çevremizdeki varlıkları görmemizi sağlayan doğrusal yayılan enerji türü."},
    {"harf": "İ", "kelime": "İLETKEN", "soru": "Elektrik akımını veya ısıyı üzerinden kolayca ileten maddeler."},
    {"harf": "K", "kelime": "KUVVET", "soru": "Duran bir cismi hareket ettiren, hareket edeni durduran veya şekil değiştiren etki."},
    {"harf": "L", "kelime": "LAMBA", "soru": "Elektrik enerjisini ışık enerjisine dönüştüren basit devre elemanı."},
    {"harf": "M", "kelime": "MANTAR", "soru": "Kendi besinini üretemeyen, nemli yerlerde yaşayan sporla çoğalan canlı grubu."},
    {"harf": "N", "kelime": "NEWTON", "soru": "Kuvvetin birimi olan ve kısaca 'N' ile gösterilen ölçü birimi."},
    {"harf": "O", "kelime": "OKSİJEN", "soru": "Solunum yaparken akciğerlerimize çektiğimiz ve havada %21 oranında bulunan gaz."},
    {"harf": "Ö", "kelime": "ÖLÇÜM", "soru": "Bir büyüklüğü termometre veya dinamometre gibi araçlarla belirleme işlemi."},
    {"harf": "P", "kelime": "PÜRÜZLÜ", "soru": "Yüzeyi düzgün olmayan ve sürtünme kuvveti fazla olan zemin."},
    {"harf": "R", "kelime": "RÜZGAR", "soru": "Yüksek basınç alanından alçak basınç alanına doğru esen yatay hava hareketi."},
    {"harf": "S", "kelime": "SÜRTÜNME", "soru": "Temas halinde olan iki yüzey arasında hareketi zorlaştıran veya engelleyen kuvvet."},
    {"harf": "Ş", "kelime": "ŞEFFAF", "soru": "Üzerine düşen ışığı neredeyse tamamen geçiren saydam maddeler."},
    {"harf": "T", "kelime": "TERMOMETRE", "soru": "Sıcaklığı derecelendirerek ölçmeye yarayan alet."},
    {"harf": "U", "kelime": "UYDU", "soru": "Gezegenlerin çekiminde kalarak etraflarında dolanan gök cisimlerinin genel adı."},
    {"harf": "Ü", "kelime": "ÜREME", "soru": "Canlıların nesillerini devam ettirebilmek için kendilerine benzer yeni bireyler oluşturması."},
    {"harf": "V", "kelime": "VÜCUT", "soru": "Canlıların fiziksel yapısını oluşturan hücre, doku ve organların bütünü."},
    {"harf": "Y", "kelime": "YANSIMA", "soru": "Işık ışınlarının parlak veya düzgün bir yüzeye çarpıp yön değiştirerek geri dönmesi."},
    {"harf": "Z", "kelime": "ZAMAN", "soru": "Dünya'nın kendi ekseni ve Güneş etrafında dönmesiyle oluşan süre ve an boyutu."}
]
