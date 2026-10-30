/* MetroQuest - hra o prazskem metru */

// Seznam otazek. Cislo spravne odpovedi zacina od nuly.
const otazky = [
    {
        text: "Jaká stanice se ti vybaví podle hliníkových obkladů s výraznými modrými pruhy?",
        odpovedi: ["Flora", "Náměstí Míru", "Želivského", "Malostranská"],
        spravna: 1,
        zajimavost: "Obklady na Náměstí Míru kombinují několik odstínů modré s barvou champagne. Stanice je hluboká přibližně 52 metrů a její eskalátorový tunel patří k nejvýraznějším prvkům prostoru.",
        obrazek: "images/otazka1.jpg"
    },
    {
        text: "Ve které stanici najdeš mozaiku Karel IV. a jeho doba?",
        odpovedi: ["Florenc", "Anděl", "Karlovo náměstí", "Invalidovna"],
        spravna: 2,
        zajimavost: "Mozaika od Radomíra Koláře a Františka Tesaře tematicky souvisí s názvem stanice. V jejím okolí jsou také další umělecké prvky včetně skleněných tvarovek a vitráže.",
        obrazek: "images/otazka2.jpg"
    },
    {
        text: "U které stanice najdeš keramickou fontánu s plastikami Faun a Vltavy?",
        odpovedi: ["Vltavská", "Nádraží Holešovice", "Flora", "Roztyly"],
        spravna: 0,
        zajimavost: "Fontánu vytvořili Miroslav Hudeček a Olga Hudečková ve spolupráci s architektem Vladimírem Uhlířem. Nachází se ve venkovním prostoru poblíž stanice.",
        obrazek: "images/otazka3.jpg"
    },
    {
        text: "U které stanice se nachází bronzová socha dívky vypouštějící holubici?",
        odpovedi: ["Hradčanská", "Dejvická", "Náměstí Míru", "Jiřího z Poděbrad"],
        spravna: 2,
        zajimavost: "Dílo se jmenuje Alegorie míru a jeho autorem je sochař Jan Kryštůfek. Nachází se na povrchu u vstupu do metra.",
        obrazek: "images/otazka4.jpg"
    },
    {
        text: "Ve které stanici se nachází neobvykle tvarovaná keramická stěna ve vestibulu?",
        odpovedi: ["Chodov", "Českomoravská", "Budějovická", "Vltavská"],
        spravna: 3,
        zajimavost: "Tvarování keramické stěny navrhl Vladimír Dolejš. Architektonické řešení stanice Vltavská souvisí také s jejím okolím u Vltavy a Bubenského nábřeží.",
        obrazek: "images/otazka5.jpg"
    },
    {
        text: "Kterou historickou událost připomíná mozaika na fotografii?",
        odpovedi: ["Založení Prahy", "Bitvu o Sokolovo", "Pražské povstání", "Národní obrození"],
        spravna: 1,
        zajimavost: "Mozaiku vytvořili Oldřich Oplt a Sauro Ballardini. Nachází se v podchodu jižního vestibulu stanice Florenc na lince C, která se původně jmenovala Sokolovská. V této bitvě poprvé po svém boku stanuli vojáci českoslovenští a bojovali proti wehrmachtu.",
        obrazek: "images/otazka6.jpg"
    },
    {
        text: "Která stanice na lince C kombinuje vápencové stěny se zlatavými hliníkovými prvky?",
        odpovedi: ["Háje", "Hlavní nádraží", "Florenc", "Kačerov"],
        spravna: 0,
        zajimavost: "Zlatavé hliníkové prvky na stěnách připomínají šipky ukazující směr jízdy. Architektem stanice byl Jan Abt.",
        obrazek: "images/otazka7.jpg"
    },
    {
        text: "Na jakou sportovní údálost odkazuje pestrobarevná vitráž nesoucí název Sport?",
        odpovedi: ["Mistrovství světa v hokeji", "Mistrovství světa ve fotbale", "Olympijské hry", "Všesokolský slet"],
        spravna: 2,
        zajimavost: "Odkazuje na neúspěšný plán uspořádat v roce 1980 v blízkosti Invalidovny letní olympijské hry. Dalším pozůstatkem je hotel Olympik.",
        obrazek: "images/otazka8.jpg"
    },
    {
        text: "Kdo vytvořil bronzové sousoší Kosmonauti u stanice Háje?",
        odpovedi: ["Josef Klimeš", "Vladislav Gajda", "Jan Bartoš", "Alois Fišárek"],
        spravna: 2,
        zajimavost: "Sousoší z roku 1979 zobrazuje kosmonauty Vladimíra Remka a Alexeje Gubareva.",
        obrazek: "images/otazka9.jpg"
    },
    {
        text: "Jak se jmenuje plastika Stanislava Hanzíka, která připomíná události května 1945?",
        odpovedi: ["Osvobození Prahy", "Barikáda", "Vítězství", "Památník metra"],
        spravna: 1,
        zajimavost: "Dílo nese název Barikáda — květen 1945 a nachází se ve stanici Pražského povstání.",
        obrazek: "images/otazka10.jpg"
    }
];

// Stav hry
let aktualniOtazka = 0;
let body = 0;
let pocetNapoved = 0;
let odpovezeno = false;

// Prvky stranky
const uvod = document.getElementById("uvod");
const hra = document.getElementById("hra");
const konec = document.getElementById("konec");

const cisloOtazky = document.getElementById("cislo-otazky");
const textOtazky = document.getElementById("otazka");
const odpovedi = document.getElementById("odpovedi");
const vysledek = document.getElementById("vysledek");
const tlacitkoDalsi = document.getElementById("dalsi");
const tlacitkoNapoveda = document.getElementById("napoveda");

const obrazek = document.getElementById("obrazek");
const chybiFotka = document.getElementById("chybi-fotka");

// Spusteni nove hry
document.getElementById("start").addEventListener("click", function () {
    uvod.hidden = true;
    konec.hidden = true;
    hra.hidden = false;

    aktualniOtazka = 0;
    body = 0;

    zobrazOtazku();
});

// Zobrazeni otazky
function zobrazOtazku() {
    odpovezeno = false;
    pocetNapoved = 0;

    const otazka = otazky[aktualniOtazka];

    cisloOtazky.textContent =
        "Otázka " + (aktualniOtazka + 1) + " z " + otazky.length;

    textOtazky.textContent = otazka.text;
    odpovedi.innerHTML = "";
    vysledek.textContent = "";
    tlacitkoDalsi.hidden = true;
    tlacitkoNapoveda.disabled = false;
    tlacitkoNapoveda.hidden = false;

    // Fotografie zacina priblizena
    obrazek.style.display = "none";
    obrazek.style.transform = "scale(2.4)";
    
    // Nacteni obrazku
    obrazek.onload = function () {
        obrazek.style.display = "block";
    };

    
    obrazek.alt = "Fotografie k otazce: " + otazka.text;
    obrazek.src = otazka.obrazek;

    // Vytvoreni tlacitek s odpovedmi
    for (let i = 0; i < otazka.odpovedi.length; i++) {
        const tlacitko = document.createElement("button");

        tlacitko.textContent = otazka.odpovedi[i];

        tlacitko.addEventListener("click", function () {
            vyhodnotOdpoved(i);
        });

        odpovedi.appendChild(tlacitko);
    }
}

// Postupne oddaleni fotografie
// AI Generated
// Model: OpenAI GPT-6
tlacitkoNapoveda.addEventListener("click", function () {
    if (odpovezeno) {
        return;
    }

    pocetNapoved++;

    let meritko = 2.4 - pocetNapoved * 0.35;

    if (meritko < 1) {
        meritko = 1;
    }

    obrazek.style.transform = "scale(" + meritko + ")";

    if (pocetNapoved >= 4) {
        tlacitkoNapoveda.disabled = true;
        tlacitkoNapoveda.textContent = "Fotografie je odhalena";
    } else {
        tlacitkoNapoveda.textContent =
            "Odhalit více (-2 body)";
    }
});
// konec AI Generated


// Vyhodnoceni odpovedi
function vyhodnotOdpoved(vybranaOdpoved) {
    if (odpovezeno) {
        return;
    }

    odpovezeno = true;

    const otazka = otazky[aktualniOtazka];
    const tlacitka = odpovedi.querySelectorAll("button");

// AI Generated
// Model: OpenAI GPT-6
    for (let i = 0; i < tlacitka.length; i++) {
        tlacitka[i].disabled = true;
    }

    tlacitkoNapoveda.disabled = true;

    if (vybranaOdpoved === otazka.spravna) {
        let ziskaneBody = 10 - pocetNapoved * 2;

        if (ziskaneBody < 0) {
            ziskaneBody = 0;
        }

        body = body + ziskaneBody;
// konec AI Generated

        vysledek.textContent =
            "Správně! Získáváš " + ziskaneBody + " bodů. ";
    } else {
        vysledek.textContent = "Špatná odpověď. Získáváš 0 bodů. ";
    }

    vysledek.textContent +=
        "Správná odpověď: " +
        otazka.odpovedi[otazka.spravna] +
        ". " +
        otazka.zajimavost;

    tlacitkoDalsi.hidden = false;
}

// Prechod na dalsi otazku
tlacitkoDalsi.addEventListener("click", function () {
    aktualniOtazka++;

    if (aktualniOtazka < otazky.length) {
        zobrazOtazku();
    } else {
        ukazKonec();
    }
});

// Zaverecne vysledky
function ukazKonec() {
    hra.hidden = true;
    konec.hidden = false;

    document.getElementById("skore").textContent =
        "Získal/a jsi " + body + " bodů z " +
        (otazky.length * 10) + " možných.";
}

// Restart hry bez obnoveni stranky
document.getElementById("restart").addEventListener("click", function () {
    konec.hidden = true;
    uvod.hidden = false;
});