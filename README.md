# AspIT.Gulpfile
Gulp.js script til automatisering af diverse webudviklingsopgaver. Scriptet kan bruges alle steder hvor du kan installere node.js, en teksteditor og en browser.

På nuværende tidspunkt kan gulp-scriptet:
* Starte en lille lokal server der åbnes i din browser og som opdateres hver gang en fil gemmes (Live preview)
* Transpile SCSS til CSS
* Automatisk sætte vendorprefixes på CSS regler 
* Minify og komprimere CSS
* Komprimere billeder ( virker med .png .jpg .gif .svg )
* Flytte fonts fra /src til /dist
* Transpile og uglify JavaScript

To-Do:
* Oprette en test task
* Gøre filen mere overskuelig

## Forudsætninger
Tjek at du har installeret den nyeste version af [node.js](https://nodejs.org/en/).

Installer gulp globalt med en terminal. Det er nødvendigt for at køre gulp fra kommandolinjen.

`npm install --global gulp-cli`

Installer nødvendige pakker i dit udviklermiljø.

`npm install --save-dev gulp gulp-csso gulp-autoprefixer gulp-imagemin gulp-rename gulp-sass node-sass gulp-uglify gulp-babel@next @babel/core @babel/preset-env browser-sync`

Gulp scriptet forventer følgende struktur.
```bash
./dist                            # Mappe til distributionsklar kode.
./src                             # Mappe med udviklingskode
├── scss/                         # Mappe til .scss filer
    ├── *.scss                    
├── css                           # SCSS filer lavet om til css
├── js                            # JavaScript filer
├── images                        # Billeder
├── fonts                         # Fonts
├── index.html                    # Forsiden
gulpfile.js
.babelrc
.gitignore             
```

## Sådan bruger du gulpfile.js
Når du udvikler kan du starte en lokal server der åbnes i din browser og som opdateres hver gang du gemmer en fil.

Åben dit kommandolinje-værktøj i samme mappe som gulpfile.js og skriv:

`gulp`

Når du er klar til at distribuere din kode skrives:

`gulp dist`
