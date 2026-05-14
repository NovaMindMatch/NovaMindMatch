# NovaMind Match

NovaMind Match este o aplicație web statică pentru conectarea elevilor cu profesori și tutori potriviți. Platforma folosește un chestionar de compatibilitate pentru a recomanda un profesor pe bază de materie, personalitate, stil de învățare și interese.

---

## Descrierea Business-ului

NovaMind Match oferă o experiență rapidă și intuitivă pentru elevi sau părinți care caută un mentor ideal. Accentul este pus pe potrivirea umană, nu doar pe disponibilitatea materiei:

- potrivire bazată pe materie și subiect
- compatibilitate de personalitate
- stil de învățare (vizual, auditiv, kinestezic)
- interese comune care sporesc motivația
- contact direct cu profesorul prin email și telefon

Platforma este concepută pentru a oferi o primă recomandare clară și rapidă, cu posibilitatea de a cere o altă sugestie pe baza acelorași preferințe.

---

## Structura proiectului

Fișiere principale:

- `index.html` - pagina principală / landing page cu chestionarul de matching
- `profile.html` - pagina profesorului recomandat afișată după trimiterea chestionarului
- `about.html` - pagina care descrie viziunea, misiunea și beneficiile platformei
- `feedback.html` - pagina dedicată colectării feedback-ului de la utilizatori
- `style.css` - stilizarea întregii aplicații, inclusiv dark mode, layout responsive și elemente personalizate
- `script.js` - logica chestionarului, matching-ul tutorilor și salvarea în `localStorage`
- `tutors.json` - baza de date locală cu profiluri de profesori

---

## Funcționalități cheie

### 1. Matching tutor

Utilizatorul completează:

- nume
- materia de interes
- personalitatea
- stilul de învățare
- interesele care îl motivează
- obiectivele personale

Aplicația evaluează toate aceste date, alege un tutor din `tutors.json` și redirecționează utilizatorul către `profile.html`.

### 2. Feedback

Există două modalități de a trimite feedback:

- dropdown-ul fix din colțul din dreapta sus, prezent pe pagini
- pagina dedicată `feedback.html`

Feedback-ul este salvat local în `localStorage` pentru demo.

### 3. Tema Light/Dark

Tema poate fi comutată printr-un buton în header, iar preferința se păstrează în `localStorage`.

### 4. Reajustare tutor

Pe pagina de profil se poate adăuga un nou tutor "Alege Alt Profesor" pe baza acelorași preferințe, fără a reintroduce chestionarul.

---

## Algoritmul de matching

Matching-ul se realizează în `script.js` cu următoarea logică:

1. Se încarcă toți tutorii din `tutors.json`.
2. Pentru fiecare tutor se calculează un scor de compatibilitate:
   - +3 puncte dacă materia se potrivește
   - +2 puncte dacă personalitatea este aceeași
   - +2 puncte dacă stilul de învățare este același
   - +1 punct pentru fiecare interes comun
3. Se găsește scorul maxim și se selectează toți tutorii care au acel scor.
4. Dintre candidați, se alege aleatoriu un tutor.

Această abordare simplă oferă o recomandare rapidă și adaptabilă, păstrând totodată un grad de diversitate în rezultate.

---

## Formatul datelor tutorilor

Fiecare profil din `tutors.json` conține:

- `id`
- `name`
- `subjects` (lista materiilor predate)
- `personality`
- `learningStyle`
- `interests`
- `bio`
- `rating`
- `experience`
- `email`
- `phone`

Acest fișier JSON este folosit de client pentru a popula profilul tutorului și a afișa datele de contact.

---

## Tehnologii folosite

- HTML5
- CSS3
- JavaScript ES6
- JSON pentru stocarea datelor
- `localStorage` pentru persistarea temporară a potrivirilor și feedback-ului

---

## Cum rulezi local

1. Deschide `index.html` direct în browser sau servește proiectul cu un server local.
2. Completează chestionarul.
3. Verifică recomandarea pe `profile.html`.

Dacă folosești server local, unul simplu este:

```bash
npx http-server .
```

---

## Observații

- Proiectul este construit ca un demo static, fără backend.
- Feedback-ul este stocat local și nu este trimis către un server.
- Algoritmul de matching poate fi extins cu machine learning, filtre avansate sau evaluări în timp real.

---

## Posibile îmbunătățiri

- adăugarea unui backend pentru stocare și autentificare
- integrarea unui sistem real de recenzii și evaluări
- optimizarea motorului de matching cu ponderi dinamice
- maparea profesorilor pe zone geografice sau tarife
- încărcare incrementală a tutorilor pentru 500+ profiluri
