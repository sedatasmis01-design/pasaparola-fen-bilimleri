/**
 * Fen Bilimleri Pasaparola Soru Bankası
 * Farklı sınıf ve ünite paketleri içerir.
 */

const QUESTION_PACKS = {
    "6_genel": {
        title: "6. Sınıf - Genel Fen Bilimleri",
        description: "6. Sınıf müfredatı ve 5. sınıf temel kavramlarını kapsayan karma soru seti.",
        questions: [
            { harf: "A", kelime: "AY", soru: "Dünya'nın tek doğal uydusu olan gök cismi." },
            { harf: "B", kelime: "BUHARLAŞMA", soru: "Sıvı maddelerin ısı alarak gaz haline geçmesi." },
            { harf: "C", kelime: "CANLI", soru: "Beslenen, solunum yapan, çoğalan ve hareket eden varlıkların genel adı." },
            { harf: "Ç", kelime: "ÇEVRE", soru: "Canlıların yaşamlarını sürdürdükleri doğal ortam." },
            { harf: "D", kelime: "DİNAMOMETRE", soru: "Kuvvetin büyüklüğünü ölçmek için kullanılan yaylı araç." },
            { harf: "E", kelime: "ERİME", soru: "Katı bir maddenin ısı alarak sıvı hale geçmesi." },
            { harf: "F", kelime: "FOSİL", soru: "Milyonlarca yıl öncesinden günümüze kadar taşlaşmış canlı kalıntısı." },
            { harf: "G", kelime: "GÜNEŞ", soru: "Dünya'mızın ısı ve ışık kaynağı olan en yakın orta büyüklükteki yıldız." },
            { harf: "H", kelime: "HÜCRE", soru: "Canlıların canlılık özelliği gösteren en küçük temel yapı birimi." },
            { harf: "I", kelime: "IŞIK", soru: "Çevremizdeki varlıkları görmemizi sağlayan doğrusal yayılan enerji türü." },
            { harf: "İ", kelime: "İLETKEN", soru: "Elektrik akımını veya ısıyı üzerinden kolayca ileten maddeler." },
            { harf: "K", kelime: "KUVVET", soru: "Duran bir cismi hareket ettiren, hareket edeni durduran veya şekil değiştiren etki." },
            { harf: "L", kelime: "LAMBA", soru: "Elektrik enerjisini ışık enerjisine dönüştüren basit devre elemanı." },
            { harf: "M", kelime: "MANTAR", soru: "Kendi besinini üretemeyen, nemli yerlerde yaşayan sporla çoğalan canlı grubu." },
            { harf: "N", kelime: "NEWTON", soru: "Kuvvetin birimi olan ve kısaca 'N' ile gösterilen ölçü birimi." },
            { harf: "O", kelime: "OKSİJEN", soru: "Solunum yaparken akciğerlerimize çektiğimiz ve havada %21 oranında bulunan gaz." },
            { harf: "Ö", kelime: "ÖLÇÜM", soru: "Bir büyüklüğü termometre veya dinamometre gibi araçlarla belirleme işlemi." },
            { harf: "P", kelime: "PÜRÜZLÜ", soru: "Yüzeyi düzgün olmayan ve sürtünme kuvveti fazla olan zemin." },
            { harf: "R", kelime: "RÜZGAR", soru: "Yüksek basınç alanından alçak basınç alanına doğru esen yatay hava hareketi." },
            { harf: "S", kelime: "SÜRTÜNME", soru: "Temas halinde olan iki yüzey arasında hareketi zorlaştıran veya engelleyen kuvvet." },
            { harf: "Ş", kelime: "ŞEFFAF", soru: "Üzerine düşen ışığı neredeyse tamamen geçiren saydam maddeler." },
            { harf: "T", kelime: "TERMOMETRE", soru: "Sıcaklığı derecelendirerek ölçmeye yarayan alet." },
            { harf: "U", kelime: "UYDU", soru: "Gezegenlerin çekiminde kalarak etraflarında dolanan gök cisimlerinin genel adı." },
            { harf: "Ü", kelime: "ÜREME", soru: "Canlıların nesillerini devam ettirebilmek için kendilerine benzer yeni bireyler oluşturması." },
            { harf: "V", kelime: "VÜCUT", soru: "Canlıların fiziksel yapısını oluşturan hücre, doku ve organların bütünü." },
            { harf: "Y", kelime: "YANSIMA", soru: "Işık ışınlarının parlak veya düzgün bir yüzeye çarpıp yön değiştirerek geri dönmesi." }
        ]
    },
    "6_sistemler": {
        title: "6. Sınıf - Güneş Sistemi ve Vücudumuz",
        description: "Gezegenler, tutulmalar, dolaşım, solunum ve sindirim sistemleri konuları.",
        questions: [
            { harf: "A", kelime: "ATARDAMAR", soru: "Kalpten çıkan temiz kanı vücudun diğer organlarına taşıyan damar türü." },
            { harf: "B", kelime: "BÖBREK", soru: "Kandaki atık maddeleri süzerek idrarı oluşturan fasulye biçimindeki boşaltım organı." },
            { harf: "C", kelime: "CİĞER", soru: "Solunum sisteminin temel organı olan ve gaz alışverişinin gerçekleştiği organ (Akciğer)." },
            { harf: "Ç", kelime: "ÇEKİM", soru: "Gök cisimlerinin birbirine uyguladığı kütlesel çekme kuvveti." },
            { harf: "D", kelime: "DOLAŞIM", soru: "Kanın kalp ve damarlar aracılığıyla tüm vücutta dolaşmasını sağlayan sistem." },
            { harf: "E", kelime: "EKLEM", soru: "Kemiklerin birbirine bağlandığı ve hareket etmeyi sağlayan birleşme yerleri." },
            { harf: "F", kelime: "FİZİKSEL", soru: "Besinlerin çiğneme veya kas hareketleriyle küçük parçalara ayrıldığı mekanik sindirim türü." },
            { harf: "G", kelime: "GEZEGEN", soru: "Bir yıldızın etrafında belirli bir yörüngede dolanan büyük küresel gök cismi." },
            { harf: "H", kelime: "HEMOGLOBİN", soru: "Alyuvarlarda bulunan ve kana kırmızı rengini veren oksijen bağlayıcı protein." },
            { harf: "I", kelime: "ISINMA", soru: "Maddelerin ısı enerjisi alarak sıcaklıklarının artması olayı." },
            { harf: "İ", kelime: "İDRAR", soru: "Böbrekler tarafından süzülen üre, su ve tuz karışımından oluşan boşaltım sıvısı." },
            { harf: "K", kelime: "KALP", soru: "Göğüs boşluğunda bulunan ve kanı tüm vücuda pompalayan kaslı organ." },
            { harf: "L", kelime: "LENF", soru: "Akyuvar bakımından zengin, vücut savunmasında görevli ak kan dolaşımı sıvısı." },
            { harf: "M", kelime: "MİDE", soru: "Besinleri asit ve enzimlerle bulamaç haline getiren sindirim sistemi organı." },
            { harf: "N", kelime: "NABIZ", soru: "Kalbin her kasılışında atardamarlara yaptığı vuruşun hissedilmesi." },
            { harf: "O", kelime: "OMURGA", soru: "Vücudumuzun dik durmasını sağlayan ve omurilik kanalını koruyan kemik zinciri." },
            { harf: "Ö", kelime: "ÖZSU", soru: "Mide ve pankreasın sindirim için salgıladığı sıvıların genel adı." },
            { harf: "P", kelime: "PANKREAS", soru: "Sindirim enzimleri ve insülin hormonu salgılayan karma bez organı." },
            { harf: "R", kelime: "RADYASYON", soru: "Güneş'ten uzay boşluğuna yayılan ışıma enerjisi." },
            { harf: "S", kelime: "SİNDİRİM", soru: "Büyük moleküllü besinlerin kana geçebilecek kadar küçük parçalara ayrılması." },
            { harf: "Ş", kelime: "ŞAKAK", soru: "Kafatası kemiklerinin yan kısımlarında bulunan bölge." },
            { harf: "T", kelime: "TUTULMA", soru: "Ay'ın veya Güneş'in gölgesinin birbirinin üzerine düşmesi olayı." },
            { harf: "U", kelime: "URANÜS", soru: "Güneş Sistemi'nde dönme ekseni yana yatık olan buz devi gezegen." },
            { harf: "Ü", kelime: "ÜRE", soru: "Karaciğerde üretilen ve böbrekler yoluyla atılan azotlu zararlı atık." },
            { harf: "V", kelime: "VENÜS", soru: "Güneş Sistemi'nin en sıcak gezegeni (Çoban Yıldızı)." },
            { harf: "Y", kelime: "YÖRÜNGE", soru: "Bir gök cisminin başka bir cisim etrafında dolanırken izlediği geometrik yol." }
        ]
    },
    "5_tekrar": {
        title: "5. Sınıf - Temel Fen Kavramları Tekrarı",
        description: "Kuvvetin ölçülmesi, sürtünme, ışığın yayılması ve canlılar dünyası.",
        questions: [
            { harf: "A", kelime: "ALYUVAR", soru: "Kanda oksijen ve karbondioksit taşıyan kırmızı kan hücresi." },
            { harf: "B", kelime: "BAKTERİ", soru: "Mikroskopla görülebilen en basit yapılı tek hücreli canlı." },
            { harf: "C", kelime: "CİVA", soru: "Oda sıcaklığında sıvı halde bulunan ve termometrelerde kullanılan metal." },
            { harf: "Ç", kelime: "ÇİÇEK", soru: "Bitkilerin üreme ve tohum oluşturma organı." },
            { harf: "D", kelime: "DERECE", soru: "Sıcaklık birimi (Celsius/Santigrat)." },
            { harf: "E", kelime: "ESNEK", soru: "Kuvvet uygulandığında şekil değiştiren, kuvvet kalkınca eski haline dönen cisimler." },
            { harf: "F", kelime: "FOTOSENTEZ", soru: "Yeşil bitkilerin güneş ışığı yardımıyla besin ve oksijen üretmesi." },
            { harf: "G", kelime: "GÖLGE", soru: "Işığın saydam olmayan cisimlerin arkasına geçememesiyle oluşan karanlık bölge." },
            { harf: "H", kelime: "HAVA", soru: "Dünyamızı saran atmosferi oluşturan gaz karışımı." },
            { harf: "I", kelime: "ISIL", soru: "Isı enerjisiyle ilgili olan denge veya durum." },
            { harf: "İ", kelime: "İPLİK", soru: "Dinamometrelerin içinde bulunan sarmal yayın bağlandığı gösterge hattı." },
            { harf: "K", kelime: "KAYNAMA", soru: "Sıvının her noktasından buhar kabarcıkları çıkarak hızla gaz haline geçmesi." },
            { harf: "L", kelime: "LİKEN", soru: "Mantar ve su yosununun birlikte ortak yaşamasıyla oluşan yapı." },
            { harf: "M", kelime: "MIKNATIS", soru: "Demir, nikel ve kobalt gibi maddeleri çekme özelliği olan cisim." },
            { harf: "N", kelime: "NEM", soru: "Havada bulunan su buharı miktarı." },
            { harf: "O", kelime: "OMURGA", soru: "Omurgalı canlıların sırtında bulunan iskelet ana desteği." },
            { harf: "Ö", kelime: "ÖZEL", soru: "Maddeleri birbirinden ayırt etmeye yarayan ayırt edici nitelikler." },
            { harf: "P", kelime: "PARALEL", soru: "Birbirini kesmeyen ve doğrultuları aynı olan ışık ışınları demeti." },
            { harf: "R", kelime: "RÜZGAR", soru: "Yel değirmenlerini döndüren hava akımı kuvveti." },
            { harf: "S", kelime: "SIVI", soru: "Belirli bir hacmi olan fakat bulunduğu kabın şeklini alan akışkan madde." },
            { harf: "Ş", kelime: "ŞİMŞEK", soru: "Bulutlar arasında gerçekleşen elektrik boşalması." },
            { harf: "T", kelime: "TOPRAK", soru: "Kayaların ufalanması ve organik maddelerin karışmasıyla oluşan canlı yuvası katman." },
            { harf: "U", kelime: "UZAY", soru: "Dünya'nın atmosferi dışında kalan sonsuz kabul edilen boşluk." },
            { harf: "Ü", kelime: "ÜRETİCİ", soru: "Kendi besinini kendi yapan bitkiler ve algler." },
            { harf: "V", kelime: "VİRÜS", soru: "Yalnızca canlı hücreler içinde çoğalabilen mikroskobik parçacık." },
            { harf: "Y", kelime: "YAĞMUR", soru: "Su buharının gökyüzünde yoğunlaşarak yeryüzüne su damlacıkları halinde düşmesi." }
        ]
    }
};

/**
 * Türkçe karakter uyumlu büyük harf dönüştürücü
 */
function turkishUpper(str) {
    if (!str) return "";
    const letters = {
        "i": "İ",
        "ı": "I",
        "ğ": "Ğ",
        "ü": "Ü",
        "ş": "Ş",
        "ö": "Ö",
        "ç": "Ç"
    };
    return str.replace(/[iığüşöç]/g, match => letters[match] || match).toUpperCase();
}
