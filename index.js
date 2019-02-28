const dummyData = [{
  id: 1, start: 120, end: 150
}, {
  id: 2, start: 300, end: 360,
}, {
  id: 3, start: 330, end: 420,
}, {
  id: 4, start: 450, end: 540
}];

const init = () => {
  showTime();
  renderMeeting();
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const renderMeeting = () => {
  const data = dummyData;
  const calendar = document.getElementById('calendar_event');
  let consecutiveMeetings = [[data[0]]]; // To hold number of consecutive meetings
  for (let i = 1; i < data.length; i++) {
    if (data[i - 1].end > data[i].start) {
      const counter = consecutiveMeetings.length - 1;
      consecutiveMeetings[counter].push(data[i]);
    } else {
      consecutiveMeetings.push([data[i]])
    }
  }
  for (let i = 0; i < consecutiveMeetings.length; i++) {
    const schedule = consecutiveMeetings[i];
    const block = 100 / schedule.length;
    const divWidth = `${block}%`;
    for (let j = 0; j < schedule.length; j++) {
      const elem = schedule[j];
      const currentHeight = (elem.end - elem.start) * 2;
      const top = (elem.start * 2) + "px";
      const divColor = getRandomColor();
      const height = `${currentHeight}px`;
      const div = document.createElement('div');
      div.innerText = elem.id;
      div.style.height = height;
      div.style.lineHeight = height;
      div.style.width = divWidth;
      div.style.backgroundColor = divColor;
      div.style.top = top;
      div.style.left = `${j * block}%`;
      calendar.appendChild(div);
    }
  }
}

const showTime = () => {
  const dt = new Date();
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  let dd = dt.getDate();
  let mm = dt.getMonth() + 1;
  const yyyy = dt.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  date.innerText = `${dd}-${mm}-${yyyy}`;
  time.innerText = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;
}

window.addEventListener('load', init);