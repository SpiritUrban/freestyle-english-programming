const log = console.log

const cursor = document.querySelector('#cursor')
const mainNode = document.querySelector('main')

log(cursor)
log(mainNode)
document.addEventListener('mousemove', (event) => {
    var x = event.clientX;
    var y = event.clientY;
    cursor.style.left = x + "px"
    cursor.style.top = y + "px"
})

document.addEventListener('click', (e) => {
    const missileSound = new Audio('../assets/sounds/missile-firing.mp3');
    missileSound.play();
    const x = e.clientX;
    const y = e.clientY;
    createRocketElement(x, y);
})

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function createRocketElement(x, y) {

    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    rocket.style.backgroundImage = 'url(../assets/img/rocket1.gif)';
    rocket.style.position = 'absolute';
    rocket.style.transition = 'all 1s ease-out';

    rocket.style.left = `500px`;
    rocket.style.top = `500px`;
    rocket.style.width = '150px';
    rocket.style.height = '150px';

    const screenWidth = window.innerWidth;
    // Вычисляем центр экрана
    const screenCenter = screenWidth / 2;
    // Вычисляем разницу между позицией клика и центром
    const difference = event.clientX - screenCenter;
    // Логируем разницу
    console.log("Разница относительно центра:", difference);

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


    await pause(1000);

    rocket.style.left = `${x}px`;
    rocket.style.top = `${y}px`;
    rocket.style.backgroundImage = 'url(../assets/img/explotion-explode.gif)';
    rocket.style.transition = 'all 0.5s ease-out';

    await pause(500);

    rocket.remove();

}



