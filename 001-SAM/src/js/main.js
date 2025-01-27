// missile and crosshair


const cursor = document.querySelector('#cursor')
const mainNode = document.querySelector('main')
const h1Node = document.querySelector('h1')

h1Node.addEventListener('click', (e) => {
    e.stopPropagation();
    const missileSound = new Audio('../assets/sounds/pronunciation/missile-and-crosshair.wav');
    missileSound.play();
})

log(cursor)
log(mainNode)
mainNode.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    cursor.style.left = x + "px"
    cursor.style.top = y + "px"
})

document.addEventListener('click', (e) => {
    const missileSound = new Audio('../assets/sounds/missile-firing.mp3');
    missileSound.volume = 0.1;
    missileSound.play();
    const x = e.clientX;
    const y = e.clientY;
    createRocketElement(x, y);
})


async function createRocketElement(x, y) {

    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    rocket.style.backgroundImage = 'url(../assets/img/rocket1.gif)';
    rocket.style.position = 'absolute';
    rocket.style.transition = 'all 1s ease-out';

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // Вычисляем центр экрана
    const screenCenter = screenWidth / 2;
    // Вычисляем разницу между позицией клика и центром
    const difference = event.clientX - screenCenter;
    // Логируем разницу
    console.log("Разница относительно центра:", difference);

    rocket.style.left = screenCenter + `px`;
    rocket.style.top = screenHeight + 100 +`px`;
    rocket.style.width = '250px';
    rocket.style.height = '250px';
    rocket.style.opacity = '1';


    // Пропорционально переводим разницу в угол
    // Максимальный угол вращения 45 градусов (600 пикселей = 45 градусов)
    const maxPixels = 600; // Максимальная разница
    const maxDegrees = 45; // Максимальный угол
    const rotation = (difference / maxPixels) * maxDegrees;
    // Ограничиваем угол вращения в диапазоне от -45 до 45 градусов
    const clampedRotation = Math.max(-maxDegrees, Math.min(maxDegrees, rotation));
    // Применяем вращение к элементу
    rocket.style.transform = `rotate(${clampedRotation}deg)`;


    document.body.appendChild(rocket);

    await pause(100);

    rocket.style.left = `${x}px`;
    rocket.style.top = `${y}px`;
    rocket.style.width = '50px';
    rocket.style.height = '50px';
    rocket.style.opacity = '.7';



    await pause(1000);

    rocket.style.left = `${x}px`;
    rocket.style.top = `${y}px`;
    rocket.style.backgroundImage = 'url(../assets/img/explotion-explode.gif)';
    rocket.style.transition = 'all 0.5s ease-out';

    await pause(500);

    rocket.remove();

}



