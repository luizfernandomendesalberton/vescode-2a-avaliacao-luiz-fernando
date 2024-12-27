document.addEventListener('DOMContentLoaded', function() {
  const carList = [
    { id: 1, model: 'Honda Civic', brand: 'Honda', price: 'R$ 45,000', image: 'hondacivic.jpg' },
    { id: 2, model: 'Toyota Corolla', brand: 'Toyota', price: 'R$ 50,000', image: 'corola.jpg' },
    { id: 3, model: 'Golf Esportiline', brand: 'Volkswagen', price: 'R$ 41,000', image: 'gotf.jpg' },
    { id: 4, model: 'Ford Fiesta', brand: 'Ford', price: 'R$ 40,000', image: 'fiesta.jpg' },
    { id: 5, model: 'Onix', brand: 'Chevrolet', price: 'R$ 40,000', image: 'url_da_imagem_do_onix.jpg' },
    { id: 6, model: 'Focus', brand: 'Ford', price: 'R$ 40,000', image: 'url_da_imagem_do_focus.jpg' },
    // Adicione mais carros conforme necessário
  ];

  const carContainer = document.getElementById('car-list');
  const carModal = document.getElementById('car-modal');
  const carDetails = document.getElementById('car-details');
  const closeModal = document.querySelector('.close');

  function renderCars(cars) {
    carContainer.innerHTML = '';
    cars.forEach(car => {
      const carDiv = document.createElement('div');
      carDiv.classList.add('car-card');
      carDiv.innerHTML = `
        <img src="${car.image}" alt="${car.model}" class="car-image">
        <h2>${car.model}</h2>
        <p>${car.brand}</p>
        <p>${car.price}</p>
      `;
      carDiv.addEventListener('click', () => openModal(car));
      carContainer.appendChild(carDiv);
    });
  }

  function openModal(car) {
    carDetails.innerHTML = `
      <img src="${car.image}" alt="${car.model}" class="modal-car-image">
      <h2>${car.model}</h2>
      <p>Marca: ${car.brand}</p>
      <p>Preço: ${car.price}</p>
    `;
    carModal.style.display = 'block';
  }

  closeModal.addEventListener('click', () => carModal.style.display = 'none');

  renderCars(carList);

  document.getElementById('search').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const filteredCars = carList.filter(car =>
      car.model.toLowerCase().includes(query) || car.brand.toLowerCase().includes(query)
    );
    renderCars(filteredCars);
  });
});
