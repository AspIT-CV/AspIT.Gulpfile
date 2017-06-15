# AspIT.Gulpfile
Gulp.js script til automatisering af diverse webudviklingsopgaver som minification, linting, testing m.m. Scriptet er teknologi agnostisk og der er derfor ligegyldigt hvilken kodeeditor der anvendes. 

På nuværende tidspunkt kan gulp-scriptet:
* Åbne siden i default browser som opdates ved når en fil gemmes (Live preview)
* Compile SCSS til CSS
* Minify og komprimere CSS
* Komprimere billeder i formaterne .png .jpg .gif .svg
* Flytte fonts fra /src til /dist
* Gøre filen mere overskuelig

To-Do:
* Minify og uglify JavaScript
* Oprettet en en 'gulp dist' task
* Oprette en test task
* Teste vejledningen

## Forudsætninger
Installer [node.js](https://nodejs.org/en/)
Installer gulp globalt med `npm install gulp -g`
Installer `npm install gulp gulp-csso gulp-imagemin gulp-rename gulp-sass node-sass browser-sync`

Gulp scriptet forventer følgende struktur.
```bash
./dist                            # Mappe til distributionsklar kode.
./src                             # Mappe med udviklingskode
├── scss/                         # Mappe til .scss filer
    ├── *.scss                    
├── css                           # SCSS filen lavet om til css
├── js                            # JavaScript filer
├── images                        # Billeder
index.html                        # Forsiden
gulpfile.js             
```

## Sådan bruger du gulpfile.js
I mens du udvikler kan du starte en lokal server der åbnes i din browser og som opdateres hver gang du gemmer en fil.
`gulp`

Når du er klar til at distribuere din kode skrives
`gulp dist`
