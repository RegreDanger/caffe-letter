import { startRain } from './flowers.js'

		const prevBtn = document.querySelector("#prev-btn");
		const nextBtn = document.querySelector("#next-btn");
		const book = document.querySelector("#book");

		const paper1 = document.querySelector("#p1");
		const paper2 = document.querySelector("#p2");
		const paper3 = document.querySelector("#p3");

		// Event Listeners
		prevBtn.addEventListener("click", goPrevPage);
		nextBtn.addEventListener("click", goNextPage);

		// Business Logic
		let currentLocation = 1;
		let numOfPapers = 3;
		let maxLocation = numOfPapers + 1;

		function openBook() {
			book.style.transform = "translateX(50%)";
			prevBtn.style.transform = "translateX(-180px)";
			nextBtn.style.transform = "translateX(180px)";
			prevBtn.style.opacity = "1";
			startRain();
		}

		function closeBook(isAtBeginning) {
			if (isAtBeginning) {
				book.style.transform = "translateX(0%)";
				nextBtn.style.opacity = "1";
				prevBtn.style.opacity = "0";
			} else {
				book.style.transform = "translateX(100%)";
				nextBtn.style.opacity = "0";
			}
			prevBtn.style.transform = "translateX(0px)";
			nextBtn.style.transform = "translateX(0px)";
			startRain();
		}

		function goNextPage() {
			if (currentLocation < maxLocation) {
				switch (currentLocation) {
					case 1:
						openBook();
						paper1.classList.add("flipped");
						paper1.style.zIndex = 1;
						break;
					case 2:
						paper2.classList.add("flipped");
						paper2.style.zIndex = 2;
						break;
					case 3:
						paper3.classList.add("flipped");
						paper3.style.zIndex = 3;
						nextBtn.style.opacity = "1";
						closeBook(false);
						break;
					default:
						throw new Error("Unknown state");
				}
				currentLocation++;
			}
		}

		function goPrevPage() {
			if (currentLocation > 1) {
				switch (currentLocation) {
					case 2:
						closeBook(true);
						paper1.classList.remove("flipped");
						paper1.style.zIndex = 3;
						break;
					case 3:
						paper2.classList.remove("flipped");
						paper2.style.zIndex = 2;
						break;
					case 4:
						openBook();
						paper3.classList.remove("flipped");
						nextBtn.style.opacity = "1";
						paper3.style.zIndex = 1;
						break;
					default:
						throw new Error("Unknown state");
				}
				currentLocation--;
			}
		}