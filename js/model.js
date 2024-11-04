const app = document.getElementById("app");

const model = {
  app: {
    page: "main", //"logIn", "overview", "productSite", "addProducts"
    isAdmin: false,
  },
  input: {
    searchField: {
      inputSearch: "",
    },
    logIn: {
      username: "",
      password: "",
    },
    createProduct: {
      productName: "",
      colorAlt: "",
      yarnTypes: "",
      category: "",
      quantity: null,
      productInfo: "",
    },
    productAlbum: {
      id: null,
      image: "",
    },
    sizes: {
      id: null,
      size: "",
    },
    designer: {
      product: "",
      pattern: "",
      yarn: [],
      color: [],
      size: "",
    },
    shoppingCart: {
      products: [],
      number: null,
      productPrice: null,
      amount: null,
    },
    customerCheckout: {
      name: "",
      email: "",
      phoneNumber: null,
      address: "",
      postalCode: null,
      cardNumber: null,
      cvc: null,
    },
    assortment: {
      yarn: {
        type: "",
        color: "",
      },
      pattern: {
        name: "",
        patternImg: "",
      },
    },
  },
  data: {
    admin: {
      username: "Rebecka",
      password: "1234",
    },

    yarn: [
      {
        id: 0,
        type: "Alpakka",
        yarnImg: "source/img/alpakka.jpg",
      },
      {
        id: 1,
        type: "Mohair",
        yarnImg: "source/img/mohair.jpg",
      },
      {
        id: 2,
        type: "Ull",
        yarnImg: "source/img/ull.jpg",
      },
      {
        id: 3,
        type: "Bomull",
        yarnImg: "source/img/bomull.jpg",
      },
      {
        id: 4,
        type: "Merinoull",
        yarnImg: "source/img/merinoull.jpg",
      },
    ],

    colorAlt: [
      {
        id: 0,
        color: "Rosa",
      },
      {
        id: 1,
        color: "Lilla",
      },
      {
        id: 2,
        color: "Blå",
      },
      {
        id: 3,
        color: "Grønn",
      },
      {
        id: 4,
        color: "Oransje",
      },
      {
        id: 5,
        color: "Gul",
      },
    ],
    //Fjernet productImage og flyttet størrelse og productAlbum ut av objektet createProduct
    products: [
      {
        id: 0,
        productAlbum: [
          "source/img/seven-sister-genser.png",
          "source/img/seven-sisters1.png",
          "source/img/seven-sisters2.png",
          "source/img/seven-sisters3.png",
        ],
        productName: "Seven Sisters - genser",
        //sizes: ["s", "m", "l"],
        category: "Genser",
        quantity: 2,
        productInfo:
          "Genseren strikkes sømløst ovenfra og ned og har et grafisk rutemønstersom minner om det ikoniskerutemønsteret som finnes på setene på t-banen i London. Det fremre og bakre bærestykket, samt raglanermene, strikkes samtidig i ett stykke for å oppnå nøyaktig samme mål.",
      },
      {
        id: 1,
        productAlbum: [
          "source/img/bobbie-genser.jpg",
          "source/img/bobbie-genser1.jpg",
          "source/img/bobbie-genser2.jpg",
          "source/img/bobbie-genser3.jpg",
        ],
        productName: "Bobbie - genser",
        sizes: ["s", "xl"],
        category: "genser",
        quantity: 1,
        productInfo:
          "Enkel, lett over-size raglan-genser strikket ovenfra og ned",
      },
      {
        id: 2,
        productImg: "source/img/floreale-top.png",
        productAlbum: [
          "source/img/floreal-top1.png",
          "source/img/floreal-top2.png",
          "source/img/floreal-top3.png",
        ],
        productName: "Floreal Top",
        sizes: ["m", "l", "xl"],
        category: "genser",
        quantity: 3,
        productInfo:
          "Denne komfortable toppen strikkes ovenfra og ned, sømløst og i ett stykke.",
      },
      {
        id: 3,
        productImg: "source/img/meadow-sunset.jpg",
        productAlbum: [
          "source/img/meadow-sunset1.jpg",
          "source/img/meadow-sunset2.jpg",
          "source/img/meadow-sunset3.jpg",
        ],
        productName: "Meadow Sunset - Wrap",
        sizes: ["s/m", "l/xl"],
        category: "skjerf",
        quantity: 4,
        productInfo:
          "Meadow Sunset Wrap er en kombinasjon av et strikket sjal og en genser. Det er strikket så man kan svøpe seg i det.",
      },
      {
        id: 4,
        productImg: "source/img/winter-sjal.jpg",
        productAlbum: [
          "source/img/winter-sjal1.jpeg",
          "source/img/winter-sjal2.jpeg",
          "source/img/winter-sjal3.jpg",
        ],
        productName: "Winter Happiness - Sjal",
        sizes: ["s/m", "l/xl"],
        category: "skjerf",
        quantity: 4,
        productInfo:
          "Gå vinteren i møte med et stort, lekkert og lunt sjal, som du riktig kan tulle deg inn i når kulden riktig biter. ",
      },
      {
        id: 5,
        productImg: "source/img/muse-shawel.png",
        productAlbum: [
          "source/img/muse-shawl1.png",
          "source/img/muse-shawl2.png",
          "source/img/muse-shawl3.png",
        ],
        productName: "Muse Shawl",
        sizes: ["s/m", "l/xl"],
        category: "skjerf",
        quantity: 3,
        productInfo:
          "Muse er et trekantsjal, strikket ovenfra og ned med økninger på hver rettsiderad.",
      },
      {
        id: 6,
        productImg: "source/img/rosmarino-sokker.png",
        productAlbum: [
          "source/img/rosmarino1.png",
          "source/img/rosmarino2.png",
          "source/img/rosmarino3.png",
        ],
        productName: "Rosmarino - Ankelsokk",
        sizes: ["s", "m", "l"],
        category: "sokker",
        quantity: 7,
        productInfo:
          "Sokken strikkes ovenfra og ned, med start i en dekorativt kant, deretter benyttes det et hullmønster for leggen.",
      },
      {
        id: 7,
        productImg: "source/img/bell-julestrømpe.jpg",
        productAlbum: [
          "source/img/bell-julestrømpe1.jpg",
          "source/img/bell-julestrømpe2.jpg",
          "source/img/bell-julestrømpe3.jpg",
        ],
        productName: "Bell - Julestrømpe",
        sizes: ["s", "m", "l"],
        category: "sokker",
        quantity: 9,
        productInfo: "Strømpene er strikket med ribb på både skaft og vrist.",
      },
      {
        id: 8,
        productImg: "source/img/harper-votter.png",
        productAlbum: [
          "source/img/harper-votter1.png",
          "source/img/harper-votter2.png",
          "source/img/harper-votter3.png",
        ],
        productName: "Harper - Vanter",
        sizes: ["s", "m", "l"],
        category: "votter",
        quantity: 5,
        productInfo:
          "Fine, enkle vanter strikket rundt på strømpepinner fra mansjetten og opp.",
      },
      {
        id: 9,
        productImg: "source/img/kogle-votter.jpeg",
        productAlbum: [
          "source/img/kogle-votter1.jpeg",
          "source/img/kogle-votter2.jpeg",
          "source/img/kogle-votter3.jpeg",
        ],
        productName: "Kogle - Votter",
        sizes: ["s", "m", "l"],
        category: "votter",
        quantity: 3,
        productInfo:
          "Fine votter med et enkelt seersucker-mønster. Vottene har en bred, myk mansjett som sørger for at de både varmer og sitter godt på håndleddet.",
      },
      {
        id: 10,
        productImg: "source/img/rubin-vott.jpg",
        productAlbum: [
          "source/img/rubin-vott1.jpg",
          "source/img/rubin-vott2.jpg",
          "source/img/rubin-vott3.jpg",
        ],
        productName: "Rubin - Kjæreste-vott",
        sizes: ["s", "m", "l"],
        category: "votter",
        quantity: 2,
        productInfo:
          "Kjæreste-votten er simpelthen en must-have, så du og kjæresten kan holde hendene varme, mens dere også holder hender i vinterkulden.",
      },
    ],
  },
};
