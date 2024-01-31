// Objeto para definir los colores en base al tipo de Pokémon
const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

// Objeto para traducir tipos de Pokémon al español
const typeTranslation = {
  bug: "Bicho",
  dragon: "Dragón",
  electric: "Eléctrico",
  fairy: "Hada",
  fighting: "Lucha",
  fire: "Fuego",
  flying: "Volador",
  grass: "Planta",
  ground: "Tierra",
  ghost: "Fantasma",
  ice: "Hielo",
  normal: "Normal",
  poison: "Veneno",
  psychic: "Psíquico",
  rock: "Roca",
  water: "Agua",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

const getPokeData = () => {
  // Genera un numero aleatorio ente 1 y 150
  const id = Math.floor(Math.random() * 150) + 1;
  // Combina la URL de pokeapi con la ID del pokemon
  const finalUrl = `${url}${id}`;
  // Obtener datos mediante fetch
  fetch(finalUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      generateCard(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

// Genera la tarjeta
const generateCard = (data) => {
  // Extrae los datos directamente del objeto data
  const { base_stat: hp } = data.stats[0];
  const { front_default: imgSrc } = data.sprites.other.dream_world;
  const pokeName =
    data.name[0].toUpperCase() + data.name.slice(1);
  const { base_stat: statAttack } = data.stats[1];
  const { base_stat: statDefense } = data.stats[2];
  const { base_stat: statSpeed } = data.stats[5];

  // Traduce el nombre de Pokémon del ingles al español
  const translatedTypes = data.types.map((type) => typeTranslation[type.type.name]);

  // Asigna un color de fondo en base al tipo de Pokémon
  const themeColor = typeColor[data.types[0].type.name];

  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
      ${hp}
    </p>
    <img src=${imgSrc} />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types"></div>
    <div class="stats">
      <div>
        <h3>${statAttack}</h3>
        <p>Ataque</p>
      </div>
      <div>
        <h3>${statDefense}</h3>
        <p>Defensa</p>
      </div>
      <div>
        <h3>${statSpeed}</h3>
        <p>Velocidad</p>
      </div>
    </div>
  `;

  appendTypes(translatedTypes);
  styleCard(themeColor);
};

// Añade los tipos al elemento HTML 
const appendTypes = (types) => {
  types.forEach((item) => {
    const span = document.createElement("SPAN");
    span.textContent = item;
    document.querySelector(".types").appendChild(span);
  });
};

// Estiliza la tarjeta con el color del tema
const styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types span").forEach((typeColor) => {
    typeColor.style.backgroundColor = color;
  });
};

// Carga la informacion del pokemon al hacer clic en el boton
btn.addEventListener("click", getPokeData);
// Carga la informacion del pokemon al cargar la pagina
window.addEventListener("load", getPokeData);
