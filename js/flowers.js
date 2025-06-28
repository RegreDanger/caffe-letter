const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

const flowerImg = new Image();
flowerImg.src = './images/flower.png';
let flowers = {};
let raining;
let animationId;

function createFlower() {
	return {
		x: Math.random() * canvas.width,
		y: Math.random() * -50,
		vy: ((Math.random() * 3) + 1) * 0.2,
		size: ((Math.random() * 12) + 3),
		rotation: Math.random() * 2 * Math.PI,
		opacity: 1,
		isOutside: false
	};
}

function fillFlowers() {
	flowers = [];
	for (let i = 0; i < 50; i++) {
		flowers.push(createFlower());
	}
}

function drawFlowers() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (raining) {
		if(flowers.length < 50) {
			flowers.push(createFlower());
		}

		flowers.forEach(flower => {
			flower.y += flower.vy;
			flower.x += Math.sin(flower.y / 50) * 0.3;
			if (flower.y > canvas.height - 70 && flower.opacity > 0) {
				flower.opacity = Math.max(flower.opacity - 0.01, 0);
			}
			flower.rotation = (flower.rotation || 0) + 0.02;
		});
	} else {
		flowers.forEach(flower => {
			flower.opacity = Math.max(flower.opacity - 0.02, 0);
			flower.rotation = (flower.rotation || 0) + 0.02;
		});
	}

	flowers.forEach(flower => {
		ctx.save();
		ctx.globalAlpha = flower.opacity;
		ctx.translate(flower.x + flower.size / 2, flower.y + flower.size / 2);
		ctx.rotate(flower.rotation);
		ctx.drawImage(flowerImg, -flower.size / 2, -flower.size / 2, flower.size, flower.size);
		ctx.restore();
	});
	flowers = flowers.filter(flower => flower.opacity > 0 && !flower.isOutside);
	if (!raining && flowers.length === 0) {
		cancelAnimationFrame(animationId);
		animationId = null;
		return;
	}

	animationId = requestAnimationFrame(drawFlowers);
}

export function startRain() {
	if (raining) {
		raining = false;
	} else {
		raining = true;
		fillFlowers();
		if (!animationId) drawFlowers();
	}
}