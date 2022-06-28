//randomID func --> generates random unique id
const randomID = () => Math.random().toString(36).substring(2);

const createAccordion = (data, accordionID, index) => {
  return `<div class="accordion-item">
    <h2 class="accordion-header" id="flush-heading${accordionID}">
      <button class="accordion-button ${
        index == 0 ? "" : "collapsed"
      }" type="button" data-bs-toggle="collapse" data-bs-target='#flush-collapse${accordionID}' aria-expanded="true" aria-controls="flush-collapse${accordionID}">
        <span>${data.feed.title}</span>
      </button>
    </h2>

    <div id="flush-collapse${accordionID}" class="accordion-collapse collapse" aria-labelledby="flush-heading${accordionID}" data-bs-parent="#accordionId">
    </div>`;
  // <div class="accordion-body" id="accordionBody"></div>
};

const createCarousel = (outerCarouselID, innerCarouselID) => {
  return `<div id="controlCarousel-${outerCarouselID}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id=${innerCarouselID}></div>
  
  <button class="carousel-control-prev" type="button" data-bs-target="#controlCarousel-${outerCarouselID}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#controlCarousel-${outerCarouselID}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
  `;
  //append Carousel to Accordion (--> id="flush-collapse${accordionID}")
};

const createCarouselItem = (carouselItemID, index) => {
  return `<div class="carousel-item ${
    index == 0 ? "active" : ""
  }" id=${carouselItemID}></div>`;
  //append carouselItem to innerCarousel (--> id=${innerCarouselID})
};

const createCard = (item) => {
  return `<a href="${item.link}" class="text-decoration-none text-dark" target="_blank">
  <div class="card">
  <img src="${item.enclosure.link}" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${item.title}</h3>
    <div>
      <span class="fw-bold">${item.author}</span>
      <span>: ${new Date(item.pubDate).toLocaleDateString()}</span>
    </div>
    <p class="card-text">${item.description}</p>
  </div>
</div>
</a>`;
  //append card to carouselItem (--> id="${carouselItemID}")
};

const addContent = async () => {
  for (let i = 0; i < magazines.length; i++) {
    let newsUrl = magazines[i];

    //fetch data
    let response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${newsUrl}`
    );
    let data = await response.json();
    // console.log(data);

    //create accordion
    let accordionID = randomID();
    // console.log("accordion id: ", accordionID);
    let accordion = createAccordion(data, accordionID, i);
    document.getElementById("accordionId").innerHTML += accordion;

    //by default: expand the 1st accordion
    if (i == 0) {
      document
        .getElementById(`flush-collapse${accordionID}`)
        .classList.add("show");
    }

    //create carousel
    let outerCarouselID = randomID();
    let innerCarouselID = randomID();
    // console.log("carousel id's are: ", outerCarouselID, innerCarouselID);
    let outerCarousel = createCarousel(outerCarouselID, innerCarouselID);
    document.getElementById(`flush-collapse${accordionID}`).innerHTML =
      outerCarousel;

    //add cards in carousel -->
    //add carouselItem to Carousel + add card to carouselItem
    let items = data.items;
    //console.log(items);
    items.map((item, index) => {
      // console.log(item);
      let card = createCard(item);
      let carouselItemID = randomID();
      let carouselItem = createCarouselItem(carouselItemID, index);
      document.getElementById(`${innerCarouselID}`).innerHTML += carouselItem;
      document.getElementById(`${carouselItemID}`).innerHTML += card;
    });
  }
};

addContent();
