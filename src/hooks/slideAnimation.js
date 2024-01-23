export function slideAnimation(container, slides, wd, mg, visibleCount, prevBtn, nextBtn) {
	let slideContainer = document.querySelector(container),
		slideContents = document.querySelectorAll(slides),
		slideLength = slideContents.length,
		prev = document.querySelector(prevBtn),
		next = document.querySelector(nextBtn),
		count = 0;

	//컨테이너 넓이 설정
	slideContainer.style.width = ((wd * slideLength) + (mg * (slideLength - 1))) + 'px';

	//슬라이드 움직임
	const slideMove = (idx) => {
		slideContainer.style.left = idx * -(wd + mg) + "px";
	}

	next.classList.add('btn_on');

	//prev
	prev.addEventListener('click', () => {
		if(count > 0) {
			count--;
			slideMove(count);
			prev.classList.add('btn_on');
		}
		if(count === 0) prev.classList.remove('btn_on');
		if(count < slideLength - visibleCount) next.classList.add('btn_on');
	});

	//next
	next.addEventListener('click', () => {
		if(count < slideLength - visibleCount) {
			count++;
			slideMove(count);
		}
		if(count === slideLength - visibleCount) next.classList.remove('btn_on');
		if(count > 0) prev.classList.add('btn_on');
	});
}