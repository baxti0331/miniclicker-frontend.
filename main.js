// Основные переменные
let scene, camera, renderer, controls;
let sun, earth, moon, mars;
let earthOrbit, moonOrbit, marsOrbit;

const PLANETS_INFO = {
  sun: {
    name: "Солнце",
    description: "Центральная звезда нашей системы, источник света и тепла."
  },
  earth: {
    name: "Земля",
    description: "Наша родная планета, обитаемая, с атмосферой и водой."
  },
  moon: {
    name: "Луна",
    description: "Естественный спутник Земли, влияет на приливы и отливы."
  },
  mars: {
    name: "Марс",
    description: "Красная планета, возможно колония будущего."
  }
};

init();
animate();

function init() {
  // Сцена
  scene = new THREE.Scene();

  // Камера
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 15, 30);

  // Рендерер
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Управление камерой
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 100;

  // Свет (солнце как точечный источник)
  const light = new THREE.PointLight(0xffffff, 2, 200);
  light.position.set(0, 0, 0);
  scene.add(light);

  // Солнце
  const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
  const sunTexture = new THREE.TextureLoader().load('assets/sun.jpg');
  const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture});
  sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);

  // Земля
  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthTexture = new THREE.TextureLoader().load('assets/earth.jpg');
  const earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});
  earth = new THREE.Mesh(earthGeometry, earthMaterial);

  earthOrbit = new THREE.Object3D();
  earth.position.set(10, 0, 0);
  earthOrbit.add(earth);
  scene.add(earthOrbit);

  // Луна
  const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
  const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg');
  const moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});
  moon = new THREE.Mesh(moonGeometry, moonMaterial);

  moonOrbit = new THREE.Object3D();
  moon.position.set(2, 0, 0);
  moonOrbit.add(moon);
  earth.add(moonOrbit);

  // Марс
  const marsGeometry = new THREE.SphereGeometry(0.53, 32, 32);
  const marsTexture = new THREE.TextureLoader().load('assets/mars.jpg');
  const marsMaterial = new THREE.MeshStandardMaterial({map: marsTexture});
  mars = new THREE.Mesh(marsGeometry, marsMaterial);

  marsOrbit = new THREE.Object3D();
  mars.position.set(15, 0, 0);
  marsOrbit.add(mars);
  scene.add(marsOrbit);

  // Обработчик окна
  window.addEventListener('resize', onWindowResize);

  // UI кнопки
  const buttons = document.querySelectorAll('#buttons button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const planet = button.getAttribute('data-planet');
      focusPlanet(planet);
    });
  });

  // Изначально фокус на Солнце
  focusPlanet('sun');
}

function onWindowResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Центрируем камеру на выбранную планету
function focusPlanet(planetName) {
  let targetPosition;
  switch(planetName) {
    case 'sun':
      targetPosition = new THREE.Vector3(0,0,0);
      break;
    case 'earth':
      targetPosition = earth.getWorldPosition(new THREE.Vector3());
      break;
    case 'moon':
      targetPosition = moon.getWorldPosition(new THREE.Vector3());
      break;
    case 'mars':
      targetPosition = mars.getWorldPosition(new THREE.Vector3());
      break;
    default:
      targetPosition = new THREE.Vector3(0,0,0);
  }

  // Обновляем UI с описанием
  document.getElementById('planet-name').textContent = PLANETS_INFO[planetName].name;
  document.getElementById('planet-desc').textContent = PLANETS_INFO[planetName].description;

  // Плавно перемещаем камеру и центр управления
  const duration = 1000; // ms
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();

  let startTime = null;
  function animateFocus(time) {
    if(!startTime) startTime = time;
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);

    // Линейная интерполяция позиции камеры (сохраняем расстояние)
    const dir = new THREE.Vector3().subVectors(startPos, startTarget);
    camera.position.lerpVectors(startPos, targetPosition.clone().add(dir), t);
    controls.target.lerpVectors(startTarget, targetPosition, t);
    controls.update();

    if(t < 1) {
      requestAnimationFrame(animateFocus);
    }
  }
  requestAnimationFrame(animateFocus);
}

function animate(time) {
  requestAnimationFrame(animate);

  // Вращаем планеты
  sun.rotation.y += 0.003;
  earth.rotation.y += 0.02;
  moon.rotation.y += 0.01;
  mars.rotation.y += 0.018;

  // Орбитальное движение
  earthOrbit.rotation.y += 0.005; // Земля вокруг Солнца
  moonOrbit.rotation.y += 0.02;   // Луна вокруг Земли
  marsOrbit.rotation.y += 0.003;  // Марс вокруг Солнца

  controls.update();
  renderer.render(scene, camera);
}
