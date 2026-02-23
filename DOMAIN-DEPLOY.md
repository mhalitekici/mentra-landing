# Domain ve Uygulama Entegrasyon Rehberi

Tarih: 23 Subat 2026

Bu rehber, `mentra-website` klasorundeki siteyi domain ile birlestirip uygulamaya baglaman icin hazirlandi.

## 0) Gercek app screenshotlarini ekle

`mentra-website/assets/screenshots/` klasorune dosyalari koy:

- `dashboard`
- `lessons`
- `calendar`
- `ai`
- `reports`

Desteklenen uzantilar: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`

Ornek:

- `dashboard.png`
- `ai.jpg`

## 0.1) Tanitim videosunu ekle

`mentra-website/assets/videos/` klasorune su dosyalardan birini koy:

- `tanitim.mp4` (onerilen)
- `promo.mp4`
- `mentra-tanitim.mp4`
- `tanitim.webm`

Site acilisinda tam ekran video alaninda otomatik gosterilir.

## 1) Siteyi deploy et

### Secenek A: Vercel

1. Yeni proje ac, kaynak klasor olarak `mentra-website` sec.
2. Build command bos birak (statik site).
3. Output klasoru root (`.`).
4. Deploy et.

### Secenek B: Netlify

1. "Add new site" > "Deploy manually".
2. `mentra-website` klasorunu surukleyip birak.
3. Site olustuktan sonra custom domain ekle.

### Secenek C: Cloudflare Pages

1. Yeni Pages projesi olustur.
2. `mentra-website` klasorunu bagla.
3. Build gerekmeden static olarak yayinla.

## 2) Domain bagla (DNS)

Domain saglayicina gore degisir ama tipik kurgu:

- Apex domain (`mentra.com`) icin `A` veya `ALIAS/ANAME`
- `www` icin `CNAME` -> deploy saglayicisinin verdigi hedef

Ornek:

- `A @ -> 76.76.21.21` (Vercel ornek)
- `CNAME www -> cname.vercel-dns.com`

Not: Gercek degerleri deploy panelindeki "Domains" sayfasindan birebir kopyala.

## 3) SSL kontrolu

- Deploy panelinden HTTPS sertifikasinin aktif oldugunu dogrula.
- Son URL: `https://www.senin-domainin.com`

## 4) Uygulamaya web sitesi linkini ekle

`frontend/src/config/brand.ts` dosyasinda:

- `website` alanina tam domain yaz
- `websiteLabel` alanina gorunecek etiketi yaz

Ornek:

```ts
website: "www.senin-domainin.com",
websiteLabel: "www.senin-domainin.com",
```

Bu sayede uygulamadaki Yardim/Iletisim ve Legal bolumleri dogru web adresini gosterir.

## 5) Uygulama ici yonlendirme (opsiyonel ama onerilir)

- Landing veya profile ekranina "Web Sitesi" butonu ekleyip domaine yonlendirebilirsin.
- React Native tarafinda `Linking.openURL("https://www.senin-domainin.com")` kullan.

## 6) Marka kimligi kontrol listesi

Canliya cikmadan once:

- [ ] Logo net gorunuyor
- [ ] Destek e-postasi dogru
- [ ] WhatsApp numarasi guncel
- [ ] SSS metinleri urune uygun
- [ ] Footer legal linkleri gercek sayfalara bagli
- [ ] Mobilde menu ve yardim butonu sorunsuz

## 7) Son test

- Masaustu: Chrome + Edge
- Mobil: iOS Safari + Android Chrome
- Form, lightbox, help widget ve nav davranisini test et.
