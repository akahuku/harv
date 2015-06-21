/*
 * harv.js
 */

/*
 * event handlers
 */

function keydown (e) {
	if (e.defaultPrevented) return;
	if (e.target != document.body) return;
	if (e.target.isContentEditable) return;
	if (e.ctrlKey || e.altKey || e.metaKey || e.keyCode != 32) return;

	// stop default action
	e.preventDefault();
	e.stopPropagation();

	// remove old overlay
	removeOverlay(document.querySelector('.harv-overlay'));

	// create new overlay
	var div = document.body.appendChild(document.createElement('div'));
	div.className = 'harv-overlay';
	div.addEventListener('transitionend', transitionend, false);

	// positioning
	var scrollTopBefore = document.body.scrollTop;
	var scrollHeight = Math.floor(window.innerHeight / 2);
	if (e.shiftKey) {
		window.scrollBy(0, -scrollHeight);
		var scrollActual = scrollTopBefore - document.body.scrollTop;
		div.style.top = '0px';
		div.style.bottom = (window.innerHeight - scrollActual) + 'px';
	}
	else {
		window.scrollBy(0, scrollHeight);
		var scrollActual = document.body.scrollTop - scrollTopBefore;
		div.style.top = (window.innerHeight - scrollActual) + 'px';
		div.style.bottom = '0px';
	}

	// set transition state
	setTimeout(function () {
		div.classList.add('harv-opacity-zero');
	}, 1);
}

function transitionend (e) {
	removeOverlay(e.target);
}

/*
 * functions
 */

function removeOverlay (el) {
	if (!el) return;
	el.removeEventListener('transitionend', transitionend, false);
	el.parentNode.removeChild(el);
}

/*
 * bootstrap
 */

window.addEventListener('keydown', keydown, false);

// vim:set ts=4 sw=4 fenc=UTF-8 ff=unix ft=javascript fdm=marker :
