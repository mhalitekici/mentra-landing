# Mentra Website (Standalone)

Bu klasor (`mentra-website/`) mevcut backend/frontend projelerinden tamamen ayridir.
Amac: Mentra icin marka kimligi odakli, canli domain baglanabilir bir web sitesi sunmak.

## Neler var?

- Acilista tam ekran tanitim videosu alani
- Hero + marka anlatimi
- Ozellikler bolumu
- Uygulama ekran galerisi (lightbox ile)
- Is akis bolumu
- Yardim merkezi + SSS
- Cok yakinda duyuru bolumu
- Sag altta acilir yardim butonu
- Mobil uyumlu ve animasyonlu tasarim

## Dosya yapisi

- `index.html`: Tum sayfa bolumleri
- `styles.css`: Tasarim sistemi ve responsive kurallar
- `script.js`: Etkilesimler (menu, lightbox, faq, video, screenshot, help panel)
- `assets/`: Logo ve varsayilan mockup gorselleri (SVG)
- `assets/screenshots/`: Gercek uygulama screenshotlari (otomatik okunur)
- `assets/videos/`: Tanitim videosu (otomatik okunur)
- `vercel.json`: Vercel deploy ayarlari
- `netlify.toml`: Netlify deploy ayarlari

## Lokal calistirma

Secenek 1 (PowerShell):

```powershell
cd c:\Users\halit\Desktop\Mentra.app-main\mentra-website
python -m http.server 5500
```

Ardindan:

- `http://localhost:5500`

Secenek 2:

- VS Code Live Server ile `index.html` ac.

## Ozellestirme notlari

- WhatsApp numarasi: `index.html` icindeki `wa.me` linki
- Metinler: `index.html`
- Renk/font: `styles.css`

## Tanitim videosu ekleme

Tanitim videosunu `assets/videos/` klasorune koy.
Varsayilan aranan dosyalar:

- `tanitim.mp4` (onerilen)
- `promo.mp4`
- `mentra-tanitim.mp4`
- `tanitim.webm`

Dosya varsa acilista tam ekran video alaninda otomatik oynatilir.
Dosya yoksa \"Tanitim videosu cok yakinda\" mesaji gorunur.

## Gercek ekran goruntusu ekleme

Su an `assets/shot-*.svg` dosyalari temsil/mockup ekranlardir.
Gercek app screenshotlarini `assets/screenshots/` klasorune atman yeterli.
Site asagidaki adlari otomatik arar:

- `dashboard`
- `lessons`
- `calendar`
- `ai`
- `reports`

Desteklenen uzantilar:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.avif`

Ornek:

- `assets/screenshots/dashboard.png`
- `assets/screenshots/calendar.png`

Dosya varsa otomatik onu kullanir, yoksa varsayilan mockup goruntusune geri doner.
