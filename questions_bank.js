/**
 * Pasaparola Genel Kültür Soru Bankası
 * 3 Farklı Genel Kültür Paketi İçerir.
 */

const QUESTION_PACKS = {
    "paket_1": {
        title: "1. Soru Paketi (Genel Kültür)",
        description: "Tarih, coğrafya, edebiyat, bilim ve genel kültür alanından 27 harflik klasik soru seti.",
        questions: [
            { harf: "A", kelime: "ANKARA", soru: "Türkiye Cumhuriyeti'nin başkenti olan ilimiz." },
            { harf: "B", kelime: "BOĞAZİÇİ", soru: "İstanbul'da Karadeniz ile Marmara Denizi'ni birbirine bağlayan dünyaca ünlü boğaz." },
            { harf: "C", kelime: "CUMHURİYET", soru: "Halkın kendi yöneticilerini kendisinin seçtiği demokratik yönetim biçimi." },
            { harf: "Ç", kelime: "ÇANAKKALE", soru: "'Çanakkale Geçilmez' destanının yazıldığı tarihi ve turistik şehrimiz." },
            { harf: "D", kelime: "DÜNYA", soru: "Güneş'e yakınlık bakımından 3. sırada yer alan, üzerinde yaşadığımız gezegen." },
            { harf: "E", kelime: "EDEBİYAT", soru: "Olay, düşünce ve duyguların dil aracılığıyla estetik biçimde ifade edildiği sanat dalı." },
            { harf: "F", kelime: "FUTBOL", soru: "11'er kişilik iki takım arasında topla oynanan dünyaca ünlü spor dalı." },
            { harf: "G", kelime: "GÖBEKLİTEPE", soru: "Şanlıurfa'da bulunan, tarihin bilinen en eski tapınak yerleşimi." },
            { harf: "H", kelime: "HALİÇ", soru: "İstanbul Boğazı'nın girişinde yer alan boynuz biçimindeki doğal liman (Altın Boynuz)." },
            { harf: "I", kelime: "IHLAMUR", soru: "Kış aylarında çayı sıkça tüketilen, hoş kokulu çiçekleri olan şifalı ağaç." },
            { harf: "İ", kelime: "İSTİKLAL", soru: "Mehmet Akif Ersoy tarafından yazılan milli marşımızın adı (İstiklal Marşı)." },
            { harf: "K", kelime: "KAPADOKYA", soru: "Peri bacaları, yer altı şehirleri ve sıcak hava balonlarıyla ünlü turistik bölgemiz." },
            { harf: "L", kelime: "LALE", soru: "Osmanlı döneminde bir devre adını veren, soğanlı ve renkli meşhur süs çiçeği." },
            { harf: "M", kelime: "MARMARA", soru: "Tamamı Türkiye sınırları içinde yer alan iç denizimiz." },
            { harf: "N", kelime: "NOBEL", soru: "İsveçli kimyager Alfred Nobel'in mirasıyla her yıl bilim ve barış alanında verilen saygın ödül." },
            { harf: "O", kelime: "OKYANUS", soru: "Kıtaları birbirinden ayıran çok büyük deniz su kütlelerinin her biri." },
            { harf: "Ö", kelime: "ÖZGÜRLÜK", soru: "Herhangi bir kısıtlamaya veya zorlamaya bağlı olmaksızın davranabilme durumu (Hürriyet)." },
            { harf: "P", kelime: "PİRİ REİS", soru: "16. yüzyılda ceylan derisi üzerine çizdiği dünya haritasıyla ünlü Osmanlı denizcisi." },
            { harf: "R", kelime: "ROMAN", soru: "İnsanların serüvenlerini, karakterlerini ve toplum hayatını ayrıntılı anlatan uzun edebi tür." },
            { harf: "S", kelime: "SİNEMA", soru: "Hareketli görüntülerin beyaz perdeye yansıtılmasına dayanan 7. sanat dalı." },
            { harf: "Ş", kelime: "ŞİİR", soru: "Duygu ve düşüncelerin ahenkli, ritimli ve dizeler halinde anlatıldığı edebi tür." },
            { harf: "T", kelime: "TİYATRO", soru: "Bir sahnede seyirciler önünde oyuncuların sergilediği dramatik sahne sanatı." },
            { harf: "U", kelime: "UZAY", soru: "Bütün gök cisimlerinin içinde bulunduğu sonsuz kabul edilen karanlık boşluk." },
            { harf: "Ü", kelime: "ÜNİVERSİTE", soru: "Yüksek düzeyde eğitim, öğretim ve bilimsel araştırma yapılan kurum." },
            { harf: "V", kelime: "VAN", soru: "Türkiye'nin en büyük gölüne ve kendine has kedisine ev sahipliği yapan ilimiz." },
            { harf: "Y", kelime: "YAZAR", soru: "Kitap, makale veya edebi metinler kaleme alan kişi (Edip / Müellif)." },
            { harf: "Z", kelime: "ZEUGMA", soru: "Gaziantep'te yer alan ve 'Çingene Kızı' mozaiğiyle dünyaca ünlü antik kent." }
        ]
    },
    "paket_2": {
        title: "2. Soru Paketi (Genel Kültür)",
        description: "Sanat, spor, tarih ve günlük yaşam bilgilerinden oluşan 27 harflik soru seti.",
        questions: [
            { harf: "A", kelime: "ANITKABİR", soru: "Mustafa Kemal Atatürk'ün Ankara'daki ebedi anıt mezarı." },
            { harf: "B", kelime: "BİSİKLET", soru: "İki tekerlekli, insan gücüyle pedalları çevrilerek ilerleyen çevre dostu taşıt." },
            { harf: "C", kelime: "COĞRAFYA", soru: "Yeryüzünü, iklimleri, kıtaları ve insan-doğa ilişkilerini inceleyen bilim dalı." },
            { harf: "Ç", kelime: "ÇİNİ", soru: "Pişmiş topraktan yapılan, üzeri sırlanıp fırınlanan geleneksel Türk süsleme sanatı." },
            { harf: "D", kelime: "DENİZALTI", soru: "Su altında uzun süre görev yapabilen askeri veya bilimsel deniz aracı." },
            { harf: "E", kelime: "EKVATOR", soru: "Dünya'yı Kuzey ve Güney olmak üzere iki eşit yarım küreye bölen hayali çizgi." },
            { harf: "F", kelime: "FELSEFE", soru: "Varlık, bilgi, ahlak ve hakikat üzerine derinlemesine düşünme ve soru sorma etkinliği." },
            { harf: "G", kelime: "GÖKYÜZÜ", soru: "Atmosferin veya uzayın yeryüzünden bakıldığında görünen kubbe biçimindeki kısmı (Sema)." },
            { harf: "H", kelime: "HEYKEL", soru: "Taş, ahşap, metal veya kilden üç boyutlu sanat eseri yapma sanatı." },
            { harf: "I", kelime: "IRMAK", soru: "Genellikle denize veya bir göle dökülen büyük akarsu (Nehir)." },
            { harf: "İ", kelime: "İPEK YOLU", soru: "Tarihte Çin'den başlayıp Anadolu üzerinden Avrupa'ya uzanan ünlü ticaret kervan yolu." },
            { harf: "K", kelime: "KÜTÜPHANE", soru: "Kitapların ve bilgi kaynaklarının düzenli olarak toplandığı ve okunduğu yer." },
            { harf: "L", kelime: "LİMON", soru: "C vitamini bakımından zengin, ekşi tadıyla bilinen sarı renkli narenciye meyvesi." },
            { harf: "M", kelime: "MÜZE", soru: "Tarihi, sanatsal veya bilimsel değeri olan eserlerin sergilendiği ve korunduğu bina." },
            { harf: "N", kelime: "NEVŞEHİR", soru: "Kapadokya bölgesinin merkezinde yer alan ve yeraltı şehirleriyle ünlü ilimiz." },
            { harf: "O", kelime: "OLİMPİYAT", soru: "Dört yılda bir dünya sporcularının katılımıyla düzenlenen dev spor organizasyonu." },
            { harf: "Ö", kelime: "ÖĞRETMEN", soru: "Bir bilim dalını, sanatı veya bilgiyi öğrencilere öğreten eğitmen (Muallim)." },
            { harf: "P", kelime: "PİYANO", soru: "Tuşlarına basıldığında içindeki çekiçlerin tellere vurmasıyla ses çıkaran klavyeli çalgı." },
            { harf: "R", kelime: "RADYO", soru: "Elektromanyetik dalgalar aracılığıyla sesli yayınların dinlenmesini sağlayan iletişim aracı." },
            { harf: "S", kelime: "SATRANÇ", soru: "64 kareli tahta üzerinde 16'şar taşla iki oyuncu arasında oynanan strateji ve zeka oyunu." },
            { harf: "Ş", kelime: "ŞELALE", soru: "Bir akarsuyun yüksek bir kayalıktan dik olarak döküldüğü su kaynağı (Çağlayan)." },
            { harf: "T", kelime: "TARİH", soru: "Geçmişte yaşamış insan topluluklarının faaliyetlerini yer ve zaman göstererek inceleyen bilim." },
            { harf: "U", kelime: "UÇAK", soru: "Kanatları ve motor gücü sayesinde havada uçabilen yolcu veya yük taşıtı (Tayyare)." },
            { harf: "Ü", kelime: "ÜLKE", soru: "Bir devletin egemenliği altında bulunan toprakların tümü (Vatan / Memleket)." },
            { harf: "V", kelime: "VOLKAN", soru: "Magmanın yer kabuğundan dışarı püskürdüğü dağ veya tepe (Yanardağ)." },
            { harf: "Y", kelime: "YELKENLİ", soru: "Rüzgar enerjisinden yararlanarak kumaş yelkenlerle hareket eden deniz teknesi." },
            { harf: "Z", kelime: "ZEYTİN", soru: "Akdeniz iklimine özgü, yağı çıkarılan ve kahvaltıların vazgeçilmezi olan şifalı meyve." }
        ]
    },
    "paket_3": {
        title: "3. Soru Paketi (Genel Kültür)",
        description: "Doğa, mimarlık, icatlar ve popüler kültürden oluşan 27 harflik zengin soru seti.",
        questions: [
            { harf: "A", kelime: "ATLAS", soru: "Coğrafya haritalarını bir araya toplayan ciltli büyük kitap." },
            { harf: "B", kelime: "BALON", soru: "Sıcak hava veya hafif gazlarla şişirilerek gökyüzünde uçurulan hava aracı." },
            { harf: "C", kelime: "CÜZDAN", soru: "Para, kimlik ve kartları taşımaya yarayan küçük cep çantası." },
            { harf: "Ç", kelime: "ÇAY", soru: "Türkiye'de Karadeniz bölgesinde yetişen ve en çok tüketilen geleneksel sıcak içecek." },
            { harf: "D", kelime: "DEDE KORKUT", soru: "Türk edebiyatının destansı ve öğüt dolu hikayelerini anlatan meşhur bilge anlatıcı." },
            { harf: "E", kelime: "EBRU", soru: "Yoğunlaştırılmış su üzerine boyalarla desen yapıp kağıda aktarma sanatı." },
            { harf: "F", kelime: "FENER", soru: "Karanlıkta ışık vermeye yarayan veya deniz taşıtlarına yol gösteren ışık kulesi." },
            { harf: "G", kelime: "GİTAR", soru: "Genellikle 6 teli olan, parmakla veya mızrapla çalınan popüler telli müzik aleti." },
            { harf: "H", kelime: "HAVALİMANI", soru: "Uçakların iniş ve kalkış yaptığı, yolcu terminallerinin bulunduğu büyük tesis." },
            { harf: "I", kelime: "ISPANAK", soru: "Temel Reis çizgi filminde güç kaynağı olarak gösterilen, demir zengini yeşil yapraklı sebze." },
            { harf: "İ", kelime: "İSTANBUL", soru: "İki kıta üzerine kurulu, tarihi ve Boğaz'ıyla dünyaca ünlü metropol şehrimiz." },
            { harf: "K", kelime: "KAHVE", soru: "Kavrulmuş çekirdeklerinin öğütülüp pişirilmesiyle yapılan, 40 yıl hatırı olan geleneksel içecek." },
            { harf: "L", kelime: "LİMAN", soru: "Gemilerin barınabileceği, yük ve yolcu indirip bindirebileceği korunaklı kıyı tesisi." },
            { harf: "M", kelime: "MİMAR SİNAN", soru: "Selimiye ve Süleymaniye camileri gibi başyapıtların mimarı olan Osmanlı dehası." },
            { harf: "N", kelime: "NİL", soru: "Afrika kıtasında bulunan, dünyanın en uzun nehirlerinden biri." },
            { harf: "O", kelime: "ORMAN", soru: "Ağaçlarla ve zengin bitki örtüsüyle kaplı geniş doğal yeşil alan." },
            { harf: "Ö", kelime: "ÖYKÜ", soru: "Yaşanmış veya yaşanabilir olayları kısaca anlatan edebi tür (Hikaye)." },
            { harf: "P", kelime: "PUSULA", soru: "Manyetik iğnesi sayesinde yönleri (Kuzey, Güney vb.) bulmaya yarayan alet." },
            { harf: "R", kelime: "RESSAM", soru: "Tuval, kağıt veya duvar üzerine fırça ve boyalarla resim yapan sanatçı." },
            { harf: "S", kelime: "SAAT", soru: "Zamanı ve günün hangi anında olunduğunu gösteren mekanik veya dijital ölçüm aracı." },
            { harf: "Ş", kelime: "ŞAMPİYON", soru: "Bir yarışmada veya turnuvada birinciliği kazanan sporcu ya da takım." },
            { harf: "T", kelime: "TELESKOP", soru: "Uzaktaki yıldızları, gezegenleri ve gök cisimlerini incelemeye yarayan optik alet." },
            { harf: "U", kelime: "UYDU", soru: "Haberleşme, TV yayını ve gözlem amacıyla uzay boşluğuna fırlatılan yapay araç." },
            { harf: "Ü", kelime: "ÜÇGEN", soru: "Doğrusal olmayan üç noktanın birleşmesiyle oluşan 3 kenarlı temel geometrik şekil." },
            { harf: "V", kelime: "VAPUR", soru: "Deniz veya göllerde yolcu ve araç taşımacılığı yapan motorlu gemi türü." },
            { harf: "Y", kelime: "YILDIZ", soru: "Gece gökyüzünde ışıldayan, kendi nükleer enerjisini üreten dev gaz küresi (Örn: Güneş)." },
            { harf: "Z", kelime: "ZAMAN", soru: "Geçmiş, şimdi ve gelecek biçiminde akıp giden kesintisiz süre ve boyut (Vakit)." }
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
