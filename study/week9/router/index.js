const routes = {
  '/home': 'home',
  '/user': 'user',
};
const handleChange = (key) => {
  window.history.pushState(null, routes[key], key);

  document.getElementById('app').innerHTML = `
    <h1>${routes[key]}</h1>
  `;
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav')) {
    e.preventDefault();
    console.log(e.target.dataset);
    handleChange(e.target.dataset.route);
  }
});

window.onpopstate = () => {
  console.log(window.location.pathname);
  handleChange(window.location.pathname);
};
