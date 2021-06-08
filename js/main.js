(() => {
const app = {
  initialize() {
    console.log('1. Application started!');
    this.cache();
    this.fromDateTo();
    this.showHeader();
    this.showCountDown();
    this.showLineup();
    this.showLineUpInfos();
    this.showSocialLinks();
    this.showSocialInfo();
    this.showSocialMore();
    console.log('cache:', this.getCache());
  },
  cache() {
    return artistLineUp; 
  },
  getCache () {
    return this.cache();
  },
  fromDateTo() {
  let fromDate = 0;
  let toDate = 0;
  this.getCache().forEach((artist) => {
   if (artist.from < fromDate || fromDate == 0) {
    fromDate = artist.from;
    }
    if (artist.to > toDate || toDate == 0) {
    toDate = artist.to;
    }
    });
  fromDate = new Date(fromDate);
  toDate = new Date(toDate);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[fromDate.getMonth()];
  const tempStr = `
    <a href="#"><div><span>${fromDate.getDate()}-${toDate.getDate()} ${month}</span></div><div>Festivalpark</div><div>Werchter</div><div>Belgium</div></a>`
  console.log(tempStr);
  this.$header = document.querySelector('.date-month');
  this.$header.innerHTML += tempStr;
  },

  showHeader() {
    this.$header = document.querySelector('.header');
    let tempStr = '';
    headerlist.forEach((element) => {
    tempStr += `<li><a href="${element.link}">${element.name}</a></li>`
    })
    this.$header.innerHTML += tempStr;
  },
  showCountDown() {
    let countDownDate = new Date(1625148000000).getTime();
    let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector('.countDown').innerHTML = days + "d " + hours + "h " +
    minutes + "m " + seconds + "s ";

    if (distance < 0) {
    clearInterval(x);
    document.getElementById("").innerHTML = "EXPIRED";
    }
  }, 1000);
},

showLineup() {
    this.$lineup = document.querySelector('.lineup');
    let tempStr = '';
    this.getCache().forEach((artist) => {
    tempStr += `
    <article class="artist">
    <img class="image-artist" src="${artist.picture.small}" data-id="${artist.id}">
    <h2>${artist.name}</h2>
    <div class="from-name">
    <h3 class="from">${getDay(artist.from)}</h3>
    <h4 class="name">${artist.isHeadliner ? 'Main stage' : artist.place.name}</h4>   
    </div>
    </article>
    `

  function media(media) {
    tempStr = '';
    media.forEach((medium) => {
    switch (medium.type.toLowerCase()) {
    case 'youtube':
    tempStr += `<iframe width="800" height="350" src="${medium.sourceId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    break;
    case 'image':
    tempStr += `<img src="${medium.sourceId}">`;
    break;
    }
    });
    return tempStr;
}

  function getDay(date) {
    const day = new Date(date);
    const days = [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag',
    ];
    return days[day.getDay()];
    };
    function getTime(date) {
    date = new Date(date);
    let minutes = date.getMinutes();
    return `${date.getHours()}:${minutes < 10 ? '0' + minutes  : minutes}`;
    }
    })
    this.$lineup.innerHTML = tempStr;
},

  showLineUpInfos() {
    const artists = document.querySelectorAll('.artist .image-artist');
    const artistDetailPanelButton = document.querySelector('.artist-details-panel button');
    const $artistDetailPanel = document.querySelector('.artist-details-panel');
    artistDetailPanelButton.addEventListener('click', (event) => {
    $artistDetailPanel.classList.remove('open-panel');
    });
    artists.forEach((artist) => {
    artist.addEventListener('click', (event) => {
    const artistData = this.getCache().find((artist) => artist.id === event.target.dataset.id);
    const $artistDetail = document.querySelector('.artist-details');
    const $artistDetailPanel = document.querySelector('.artist-details-panel');
    $artistDetailPanel.classList.add('open-panel');
    $artistDetailPanel.style.cssText = 'right:0;';
    $artistDetail.innerHTML = `
    <article class="artist">
    <div class="artist-header">
    <img class="image-artist" src="${artistData.picture.small}" data-id="${artistData.id}">
    <h2>${artistData.name}</h2>
    <div class="from-name">
    <h3 class="from">${getDay(artistData.from)}</h3>
    <h4 class="name">${artistData.place.name}</h4>
    </div>
    </div>
    <p>${artistData.synopsis}</p>
    ${media(artistData.media)}<br>
    <strong>Meer Weten ?</strong>
    <ul>
    <li><a href="${artistData.social.website}">${artistData.social.website}</a></li>
    <li><a href="${artistData.social.facebook}">${artistData.social.facebook}</a></li>
    <li><a href="${artistData.social.twitter}">${artistData.social.twitter}</a></li>
    <li><a href="${artistData.social.instagram}">${artistData.social.instagram}</a></li>
    </ul>
    </article>
    `
    function getInfo(infos) {
    tempStr = '';
    infos.forEach((info) => {
    tempStr += `<li><a href="${info}">${info}</a></li>`
    })
    return tempStr;
}

  function media(media) {
    tempStr = '';
    media.forEach((medium) => {
    switch (medium.type.toLowerCase()) {
    case 'youtube':
    tempStr += `<iframe class="youtube-artist" width="800" height="350" src="${medium.sourceId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    break;
    case 'image':
    tempStr += `<img class="youtube-img" src="${medium.sourceId}">`;
    break;
    }
    });
    return tempStr;
  }
});

  function getDay(date) {
    const day = new Date(date);
    const days = [
    'Zondag',
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag',
    ];
    return days[day.getDay()];
    }
    });
},

  showSocialLinks() {
    const socialEl = document.querySelector('.social-container');
    console.log(socialEl)
    social.forEach(el => {
    socialEl.innerHTML += `<a href="${el.link}"><img src="svg/${el.type}.svg" class="${el.type}"/></a>`
    })
    return socialEl;
    },

    showSocialInfo() {
    const socialInfos = document.querySelector('.social-info');
    socialInfos.insertAdjacentHTML('afterbegin', '<h5>Info</h5>');
    const socialInfo = document.querySelector('.social-info__ul');
    info.forEach((info) => {
    socialInfo.innerHTML += `<li><a href="${info.link}">${info.name}</a></li>`
    })
    return socialInfo;
    },

    showSocialMore() {
    const socialHeading = document.querySelector('.social-more');
    socialHeading.insertAdjacentHTML('afterbegin', '<h5>Know More ?</h5>');
    const socialMore = document.querySelector('.social-more__info');
    more.forEach((more) => {
    socialMore.innerHTML += `<li><a href="${more.link}">${more.name}</a></li>`
    })
    return socialMore;
    },
}
app.initialize();
})();