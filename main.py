import tkinter as tk
from tkinter import messagebox
import math
try:
    import winsound
    HAS_SOUND = True
except ImportError:
    HAS_SOUND = False

from questions import DATA, turkish_upper


class PasaparolaGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Pasaparola - Genel Kültür Bilgi Yarışması")
        self.root.geometry("1000x720")
        self.root.minsize(920, 680)
        self.root.configure(bg="#0f172a")

        # Oyun Durum Değişkenleri
        self.data = DATA
        self.total_questions = len(self.data)
        self.states = ["waiting"] * self.total_questions  # waiting, correct, wrong, pas
        self.current_index = 0
        self.puan = 0
        self.dogru_sayisi = 0
        self.yanlis_sayisi = 0
        self.pas_sayisi = 0

        # Zamanlayıcı Değişkenleri
        self.TIME_LIMIT = 30
        self.remaining_time = self.TIME_LIMIT
        self.timer_job = None
        self.is_game_over = False

        self.setup_ui()
        self.start_game()

    def play_sound(self, sound_type):
        """Basit ses efektleri (Windows winsound ile)"""
        if not HAS_SOUND:
            return
        try:
            if sound_type == "correct":
                winsound.Beep(1000, 150)
                winsound.Beep(1400, 200)
            elif sound_type == "wrong":
                winsound.Beep(450, 250)
            elif sound_type == "pas":
                winsound.Beep(700, 100)
            elif sound_type == "timeup":
                winsound.Beep(400, 300)
            elif sound_type == "gameover":
                winsound.Beep(800, 150)
                winsound.Beep(1000, 150)
                winsound.Beep(1200, 300)
        except Exception:
            pass

    def setup_ui(self):
        # Üst Başlık ve Skor Çubuğu
        header_frame = tk.Frame(self.root, bg="#1e293b", height=70, padx=20, pady=10)
        header_frame.pack(side=tk.TOP, fill=tk.X)

        title_lbl = tk.Label(
            header_frame,
            text="🏆 PASAPAROLA - GENEL KÜLTÜR",
            font=("Segoe UI", 16, "bold"),
            bg="#1e293b",
            fg="#38bdf8"
        )
        title_lbl.pack(side=tk.LEFT)

        # İstatistik Göstergeleri (Sağ üst)
        stats_frame = tk.Frame(header_frame, bg="#1e293b")
        stats_frame.pack(side=tk.RIGHT)

        self.lbl_puan = tk.Label(
            stats_frame,
            text="Puan: 0",
            font=("Segoe UI", 13, "bold"),
            bg="#0284c7",
            fg="white",
            padx=12,
            pady=4
        )
        self.lbl_puan.pack(side=tk.LEFT, padx=5)

        self.lbl_dogru = tk.Label(
            stats_frame,
            text="✓ Doğru: 0",
            font=("Segoe UI", 11, "bold"),
            bg="#16a34a",
            fg="white",
            padx=10,
            pady=4
        )
        self.lbl_dogru.pack(side=tk.LEFT, padx=4)

        self.lbl_yanlis = tk.Label(
            stats_frame,
            text="✗ Yanlış: 0",
            font=("Segoe UI", 11, "bold"),
            bg="#dc2626",
            fg="white",
            padx=10,
            pady=4
        )
        self.lbl_yanlis.pack(side=tk.LEFT, padx=4)

        self.lbl_pas = tk.Label(
            stats_frame,
            text="⏳ Pas: 0",
            font=("Segoe UI", 11, "bold"),
            bg="#d97706",
            fg="white",
            padx=10,
            pady=4
        )
        self.lbl_pas.pack(side=tk.LEFT, padx=4)

        # Ana Gövde Alanı
        main_content = tk.Frame(self.root, bg="#0f172a")
        main_content.pack(fill=tk.BOTH, expand=True, padx=15, pady=15)

        # SOL: Çark Alanı
        left_frame = tk.Frame(main_content, bg="#0f172a")
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH, padx=(0, 15))

        self.canvas_size = 480
        self.canvas = tk.Canvas(
            left_frame,
            width=self.canvas_size,
            height=self.canvas_size,
            bg="#0f172a",
            highlightthickness=0
        )
        self.canvas.pack(pady=5)

        # SAĞ: Soru ve Kontrol Paneli Kartı
        right_frame = tk.Frame(main_content, bg="#1e293b", padx=25, pady=20)
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

        # Kart Başlığı (Aktif Harf & Sayaç)
        top_row = tk.Frame(right_frame, bg="#1e293b")
        top_row.pack(fill=tk.X, pady=(0, 10))

        self.lbl_active_harf = tk.Label(
            top_row,
            text="HARF: A",
            font=("Segoe UI", 22, "bold"),
            bg="#334155",
            fg="#facc15",
            padx=18,
            pady=6
        )
        self.lbl_active_harf.pack(side=tk.LEFT)

        self.lbl_timer = tk.Label(
            top_row,
            text="⏱️ 30s",
            font=("Segoe UI", 18, "bold"),
            bg="#059669",
            fg="white",
            padx=15,
            pady=6
        )
        self.lbl_timer.pack(side=tk.RIGHT)

        # Soru Metin Alanı
        lbl_q_title = tk.Label(
            right_frame,
            text="SORU / İPUCU:",
            font=("Segoe UI", 11, "bold"),
            bg="#1e293b",
            fg="#94a3b8"
        )
        lbl_q_title.pack(anchor="w", pady=(10, 4))

        self.txt_question = tk.Text(
            right_frame,
            font=("Segoe UI", 14),
            height=5,
            wrap=tk.WORD,
            bg="#0f172a",
            fg="#f8fafc",
            relief=tk.FLAT,
            padx=12,
            pady=12,
            spacing1=3,
            spacing3=3
        )
        self.txt_question.pack(fill=tk.X, pady=(0, 10))
        self.txt_question.configure(state="disabled")

        # Geri Bildirim Kutusu (Doğru / Yanlış cevabı gösterir)
        self.lbl_feedback = tk.Label(
            right_frame,
            text="",
            font=("Segoe UI", 11, "bold"),
            bg="#1e293b",
            fg="#38bdf8",
            wraplength=420,
            justify=tk.CENTER
        )
        self.lbl_feedback.pack(fill=tk.X, pady=(0, 10))

        # Cevap Giriş Alanı
        lbl_ans_title = tk.Label(
            right_frame,
            text="CEVABINIZ:",
            font=("Segoe UI", 11, "bold"),
            bg="#1e293b",
            fg="#94a3b8"
        )
        lbl_ans_title.pack(anchor="w", pady=(0, 4))

        self.ent_answer = tk.Entry(
            right_frame,
            font=("Segoe UI", 16, "bold"),
            bg="#334155",
            fg="#ffffff",
            insertbackground="#ffffff",
            relief=tk.FLAT
        )
        self.ent_answer.pack(fill=tk.X, ipady=8, pady=(0, 15))
        self.ent_answer.bind("<Return>", lambda e: self.check_answer())

        # Butonlar Çerçevesi
        btn_frame = tk.Frame(right_frame, bg="#1e293b")
        btn_frame.pack(fill=tk.X, pady=5)

        self.btn_submit = tk.Button(
            btn_frame,
            text="✓ CEVAPLA",
            font=("Segoe UI", 13, "bold"),
            bg="#16a34a",
            activebackground="#15803d",
            fg="white",
            activeforeground="white",
            relief=tk.FLAT,
            cursor="hand2",
            padx=15,
            pady=10,
            command=self.check_answer
        )
        self.btn_submit.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 6))

        self.btn_pas = tk.Button(
            btn_frame,
            text="⏳ PAS",
            font=("Segoe UI", 13, "bold"),
            bg="#d97706",
            activebackground="#b45309",
            fg="white",
            activeforeground="white",
            relief=tk.FLAT,
            cursor="hand2",
            padx=15,
            pady=10,
            command=self.pass_question
        )
        self.btn_pas.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(6, 0))

        # Alt Kontrol Çubuğu (Yeniden Başlat)
        bottom_frame = tk.Frame(right_frame, bg="#1e293b")
        bottom_frame.pack(side=tk.BOTTOM, fill=tk.X, pady=(15, 0))

        self.btn_restart = tk.Button(
            bottom_frame,
            text="🔄 Oyunu Yeniden Başlat",
            font=("Segoe UI", 10),
            bg="#334155",
            activebackground="#475569",
            fg="#cbd5e1",
            relief=tk.FLAT,
            cursor="hand2",
            pady=6,
            command=self.restart_game
        )
        self.btn_restart.pack(fill=tk.X)

    def draw_wheel(self):
        """Alfabe Çarkını Canvas üzerinde çizer"""
        self.canvas.delete("all")
        cx, cy = self.canvas_size / 2, self.canvas_size / 2
        r = 185  # Çember yarıçapı
        node_radius = 20  # Her harf dairesinin yarıçapı
        n = self.total_questions

        # Ortadaki Dekoratif Daire
        self.canvas.create_oval(
            cx - 65, cy - 65, cx + 65, cy + 65,
            fill="#1e293b",
            outline="#334155",
            width=3
        )
        # Orta logo veya aktif harf bilgisi
        if not self.is_game_over:
            current_letter = self.data[self.current_index]["harf"]
            self.canvas.create_text(
                cx, cy - 8,
                text=current_letter,
                font=("Segoe UI", 28, "bold"),
                fill="#facc15"
            )
            self.canvas.create_text(
                cx, cy + 22,
                text=f"{self.current_index + 1} / {n}",
                font=("Segoe UI", 10),
                fill="#94a3b8"
            )
        else:
            self.canvas.create_text(
                cx, cy,
                text="BİTTİ",
                font=("Segoe UI", 18, "bold"),
                fill="#22c55e"
            )

        # 26 Harfin Çember Üzerine Çizilmesi
        for i in range(n):
            angle = 2 * math.pi * i / n - math.pi / 2
            x = cx + r * math.cos(angle)
            y = cy + r * math.sin(angle)

            state = self.states[i]
            # Renk Teması
            if state == "correct":
                bg_color = "#22c55e"  # Yeşil
                fg_color = "#ffffff"
            elif state == "wrong":
                bg_color = "#ef4444"  # Kırmızı
                fg_color = "#ffffff"
            elif state == "pas":
                bg_color = "#f59e0b"  # Turuncu / Sarı
                fg_color = "#000000"
            else:
                bg_color = "#475569"  # Gri
                fg_color = "#f8fafc"

            # Aktif harf için dış vurgu halkası
            if i == self.current_index and not self.is_game_over:
                self.canvas.create_oval(
                    x - (node_radius + 4), y - (node_radius + 4),
                    x + (node_radius + 4), y + (node_radius + 4),
                    outline="#38bdf8",
                    width=4
                )

            # Harf dairesi
            self.canvas.create_oval(
                x - node_radius, y - node_radius,
                x + node_radius, y + node_radius,
                fill=bg_color,
                outline="#0f172a",
                width=2
            )

            # Harf metni
            self.canvas.create_text(
                x, y,
                text=self.data[i]["harf"],
                font=("Segoe UI", 12, "bold"),
                fill=fg_color
            )

    def start_game(self):
        """Oyunu başlatır veya sıfırlar"""
        self.states = ["waiting"] * self.total_questions
        self.current_index = 0
        self.puan = 0
        self.dogru_sayisi = 0
        self.yanlis_sayisi = 0
        self.pas_sayisi = 0
        self.is_game_over = False
        self.lbl_feedback.config(text="")
        self.update_stats()
        self.load_question()

    def update_stats(self):
        """Üst kısımdaki istatistik sayaçlarını günceller"""
        self.lbl_puan.config(text=f"Puan: {self.puan}")
        self.lbl_dogru.config(text=f"✓ Doğru: {self.dogru_sayisi}")
        self.lbl_yanlis.config(text=f"✗ Yanlış: {self.yanlis_sayisi}")
        self.lbl_pas.config(text=f"⏳ Pas: {self.pas_sayisi}")

    def load_question(self):
        """Sıradaki soruyu yükler ve zamanlayıcıyı başlatır"""
        # Tüm sorular çözülmüş mü?
        if all(s in ["correct", "wrong"] for s in self.states):
            self.end_game()
            return

        # Zaten cevaplanmış olanları atla
        while self.states[self.current_index] in ["correct", "wrong"]:
            self.current_index = (self.current_index + 1) % self.total_questions

        cur = self.data[self.current_index]
        self.lbl_active_harf.config(text=f"HARF: {cur['harf']}")

        # Soru metnini yazdır
        self.txt_question.configure(state="normal")
        self.txt_question.delete("1.0", tk.END)
        self.txt_question.insert(tk.END, cur["soru"])
        self.txt_question.configure(state="disabled")

        # Giriş kutusunu temizle ve odaklan
        self.ent_answer.delete(0, tk.END)
        self.ent_answer.focus_set()

        # Çarkı yeniden çiz
        self.draw_wheel()

        # Süreyi sıfırla ve başlat
        self.reset_timer()

    def check_answer(self):
        """Kullanıcının girdiği cevabı kontrol eder"""
        if self.is_game_over:
            return

        user_raw = self.ent_answer.get().strip()
        if not user_raw:
            return  # Boş girişte işlem yapma

        user_ans = turkish_upper(user_raw)
        target_ans = self.data[self.current_index]["kelime"]

        if user_ans == target_ans:
            # Doğru Cevap
            self.states[self.current_index] = "correct"
            self.puan += 10
            self.dogru_sayisi += 1
            self.lbl_feedback.config(
                text=f"✓ TEBRİKLER! Doğru Cevap: {target_ans}",
                fg="#22c55e"
            )
            self.play_sound("correct")
        else:
            # Yanlış Cevap
            self.states[self.current_index] = "wrong"
            self.yanlis_sayisi += 1
            self.lbl_feedback.config(
                text=f"✗ YANLIŞ! Doğru Cevap: {target_ans}",
                fg="#ef4444"
            )
            self.play_sound("wrong")

        self.pas_sayisi = self.states.count("pas")
        self.update_stats()
        self.next_question()

    def pass_question(self):
        """Soruyu pas geçer"""
        if self.is_game_over:
            return

        self.states[self.current_index] = "pas"
        self.pas_sayisi = self.states.count("pas")
        self.lbl_feedback.config(
            text="⏳ Soru pas geçildi. Sıradaki turlarda tekrar gelecek.",
            fg="#f59e0b"
        )
        self.play_sound("pas")
        self.update_stats()
        self.next_question()

    def next_question(self):
        """Sıradaki uygun soruya ilerler"""
        self.stop_timer()
        self.current_index = (self.current_index + 1) % self.total_questions
        self.load_question()

    def reset_timer(self):
        """Zamanlayıcıyı 30 saniyeye ayarlar ve başlatır"""
        self.stop_timer()
        self.remaining_time = self.TIME_LIMIT
        self.update_timer_display()
        self.run_timer()

    def run_timer(self):
        """Geri sayım döngüsü"""
        if self.remaining_time > 0:
            self.remaining_time -= 1
            self.update_timer_display()
            self.timer_job = self.root.after(1000, self.run_timer)
        else:
            # Süre Bittiğinde otomatik PAS geç
            self.play_sound("timeup")
            self.lbl_feedback.config(
                text="⏱️ Süre doldu! Soru pas geçildi.",
                fg="#f59e0b"
            )
            self.pass_question()

    def update_timer_display(self):
        """Sayaç göstergesi ve renk animasyonu"""
        self.lbl_timer.config(text=f"⏱️ {self.remaining_time}s")
        if self.remaining_time > 10:
            self.lbl_timer.config(bg="#059669")  # Yeşil
        elif self.remaining_time > 5:
            self.lbl_timer.config(bg="#d97706")  # Turuncu
        else:
            self.lbl_timer.config(bg="#dc2626")  # Kırmızı (Acil)

    def stop_timer(self):
        """Aktif zamanlayıcıyı durdurur"""
        if self.timer_job is not None:
            self.root.after_cancel(self.timer_job)
            self.timer_job = None

    def end_game(self):
        """Oyun bittiğinde sonuçları gösterir"""
        self.is_game_over = True
        self.stop_timer()
        self.draw_wheel()
        self.play_sound("gameover")

        basari_yuzdesi = round((self.dogru_sayisi / self.total_questions) * 100, 1)

        self.txt_question.configure(state="normal")
        self.txt_question.delete("1.0", tk.END)
        self.txt_question.insert(
            tk.END,
            f"🎉 OYUN TAMAMLANDI!\n\n"
            f"Toplam Puan: {self.puan}\n"
            f"Doğru Sayısı: {self.dogru_sayisi}\n"
            f"Yanlış Sayısı: {self.yanlis_sayisi}\n"
            f"Başarı Oranı: %{basari_yuzdesi}\n\n"
            f"Yeniden oynamak için aşağıdaki 'Yeniden Başlat' butonuna tıklayabilirsiniz."
        )
        self.txt_question.configure(state="disabled")
        self.lbl_active_harf.config(text="BİTTİ")
        self.lbl_feedback.config(
            text="Tebrikler! Tüm harfleri tamamladınız.",
            fg="#22c55e"
        )
        self.ent_answer.delete(0, tk.END)

        messagebox.showinfo(
            "Yarışma Tamamlandı!",
            f"Harika bir performans!\n\n"
            f"Toplam Puan: {self.puan}\n"
            f"Doğru: {self.dogru_sayisi}\n"
            f"Yanlış: {self.yanlis_sayisi}\n"
            f"Başarı: %{basari_yuzdesi}"
        )

    def restart_game(self):
        """Oyunu baştan başlatır"""
        self.stop_timer()
        self.start_game()


if __name__ == "__main__":
    root = tk.Tk()
    app = PasaparolaGame(root)
    root.mainloop()
