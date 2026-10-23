/* Otázky pro hru MetroQuest.
spravna = číslo správné odpovědi, počítáno od nuly. */

const otazky = [
    {
        text: "Na které lince metra najdeme stanici Dejvická?",
        odpovedi: ["Linka A", "Linka B", "Linka C", "Linka D"],
        spravna: 0,
        zajimavost: "Dejvická je stanice na zelené lince A."
    },
    {
        text: "Na které lince leží stanice Náměstí Republiky?",
        odpovedi: ["Linka A", "Linka B", "Linka C", "Linka D"],
        spravna: 1,
        zajimavost: "Náměstí Republiky leží na žluté lince B."
    },
    {
        text: "Na které lince najdeme stanici I. P. Pavlova?",
        odpovedi: ["Linka A", "Linka B", "Linka C", "Linka D"],
        spravna: 2,
        zajimavost: "Stanice I. P. Pavlova je na červené lince C."
    },
    {
        text: "Která dvojice linek se potkává ve stanici Můstek?",
        odpovedi: [
            "A a B",
            "A a C",
            "B a C",
            "A a D"
        ],
        spravna: 0,
        zajimavost: "Můstek je přestupní stanice linek A a B."
    },
    {
        text: "Které dvě linky se potkávají ve stanici Muzeum?",
        odpovedi: [
            "A a B",
            "B a C",
            "A a C",
            "B a D"
        ],
        spravna: 2,
        zajimavost: "Muzeum je přestupní stanice linek A a C."
    }
];

// Proměnné, které si pamatují stav hry.
let aktualniOtazka = 0;
let body = 0;
let odpovezeno = false;

// Prvky stránky, se kterými bude JavaScript pracovat.
const uvod = document.getElementById("uvod");
const hra = document.getElementById("hra");
const konec = document.getElementById("konec");

const cisloOtazky = document.getElementById("cislo-otazky");
const textOtazky = document.getElementById("otazka");
const odpovedi = document.getElementById("odpovedi");
const vysledek = document.getElementById("vysledek");
const tlacitkoDalsi = document.getElementById("dalsi");

// Spuštění hry po kliknutí na tlačítko.
document.getElementById("start").addEventListener("click", function () {
    uvod.hidden = true;
    hra.hidden = false;

    zobrazOtazku();
});

// Zobrazí aktuální otázku a její možnosti.
function zobrazOtazku() {
    odpovezeno = false;

    const otazka = otazky[aktualniOtazka];

    cisloOtazky.textContent =
        "Otázka " + (aktualniOtazka + 1) + " z " + otazky.length;

    textOtazky.textContent = otazka.text;
    odpovedi.innerHTML = "";
    vysledek.textContent = "";
    tlacitkoDalsi.hidden = true;

    // Vytvoří tlačítko pro každou možnou odpověď.
    for (let i = 0; i < otazka.odpovedi.length; i++) {
        const tlacitko = document.createElement("button");

        tlacitko.textContent = otazka.odpovedi[i];

        tlacitko.addEventListener("click", function () {
            vyhodnotOdpoved(i);
        });

        odpovedi.appendChild(tlacitko);
    }
}

// Zkontroluje odpověď a přičte body nejvýše jednou.
function vyhodnotOdpoved(vybranaOdpoved) {
    if (odpovezeno) {
        return;
    }

    odpovezeno = true;

    const otazka = otazky[aktualniOtazka];
    const tlacitka = odpovedi.querySelectorAll("button");

    // Po odpovědi už nelze vybrat jinou možnost.
    for (let i = 0; i < tlacitka.length; i++) {
        tlacitka[i].disabled = true;
    }

    if (vybranaOdpoved === otazka.spravna) {
        body = body + 10;
        vysledek.textContent = "Správně! Získáváš 10 bodů. ";
    } else {
        vysledek.textContent = "To není správně. ";
    }

    // Vždy ukázat správnou odpověď a zajímavost.
    vysledek.textContent +=
        "Správná odpověď: " +
        otazka.odpovedi[otazka.spravna] +
        ". " +
        otazka.zajimavost;

    tlacitkoDalsi.hidden = false;
}

// Přechod na další otázku nebo zobrazení výsledku.
tlacitkoDalsi.addEventListener("click", function () {
    aktualniOtazka++;

    if (aktualniOtazka < otazky.length) {
        zobrazOtazku();
    } else {
        hra.hidden = true;
        konec.hidden = false;

        document.getElementById("skore").textContent =
            "Získal/a jsi " + body + " bodů z " +
            (otazky.length * 10) + " možných.";
    }
});