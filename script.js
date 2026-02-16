document.addEventListener('DOMContentLoaded', () => {
	// Custom Cursor
	const cursorDot = document.querySelector('.cursor-dot');
	const cursorOutline = document.querySelector('.cursor-outline');

	let mouseX = 0;
	let mouseY = 0;
	let outlineX = 0;
	let outlineY = 0;

	window.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;

		// Dot follows immediately
		cursorDot.style.left = `${mouseX}px`;
		cursorDot.style.top = `${mouseY}px`;
	});

	const animateCursor = () => {
		const speed = 0.15; // Smooth delay factor

		outlineX += (mouseX - outlineX) * speed;
		outlineY += (mouseY - outlineY) * speed;

		cursorOutline.style.left = `${outlineX}px`;
		cursorOutline.style.top = `${outlineY}px`;

		requestAnimationFrame(animateCursor);
	};
	animateCursor();

	// Add hover effect to interactive elements
	const interactiveElements = document.querySelectorAll(
		'a, button, .project-card, .skill-category',
	);
	interactiveElements.forEach((el) => {
		el.addEventListener('mouseenter', () => {
			cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
			cursorOutline.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
			cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
		});
		el.addEventListener('mouseleave', () => {
			cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
			cursorOutline.style.backgroundColor = 'transparent';
			cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
		});
	});

	// Typewriter Effect
	const typeWriterElement = document.querySelector('.typewriter');
	const roles = [
		'Figma Designer',
		'Web Developer',
		'Android App Developer',
		'iOS App Developer',
		'Tech Enthusiast',
	];
	let roleIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typeSpeed = 100;

	function typeWriter() {
		const currentRole = roles[roleIndex];

		if (isDeleting) {
			typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
			charIndex--;
			typeSpeed = 50;
		} else {
			typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
			charIndex++;
			typeSpeed = 100;
		}

		if (!isDeleting && charIndex === currentRole.length) {
			isDeleting = true;
			typeSpeed = 2000; // Pause at end
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			roleIndex = (roleIndex + 1) % roles.length;
			typeSpeed = 500; // Pause before new word
		}

		setTimeout(typeWriter, typeSpeed);
	}

	// Start Typewriter
	if (typeWriterElement) {
		setTimeout(typeWriter, 1000);
	}

	// Mobile Menu Toggle
	const menuToggle = document.getElementById('mobile-menu');
	const navMenu = document.querySelector('.nav-menu');
	const navLinks = document.querySelectorAll('.nav-link');

	if (menuToggle) {
		menuToggle.addEventListener('click', () => {
			menuToggle.classList.toggle('active');
			navMenu.classList.toggle('active');
		});
	}

	// Close mobile menu when clicking a link
	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			menuToggle.classList.remove('active');
			navMenu.classList.remove('active');
		});
	});

	// Sticky Navbar
	const navbar = document.querySelector('.navbar');
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			navbar.style.padding = '10px 0';
			navbar.style.background = 'rgba(10, 10, 10, 0.95)';
		} else {
			navbar.style.padding = '20px 0';
			navbar.style.background = 'rgba(10, 10, 10, 0.8)';
		}
	});

	// Project Filtering
	const tabBtns = document.querySelectorAll('.tab-btn');
	const projectCards = document.querySelectorAll('.project-card');

	tabBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			// Remove active class from all buttons
			tabBtns.forEach((b) => b.classList.remove('active'));
			// Add active class to clicked button
			btn.classList.add('active');

			const filterValue = btn.getAttribute('data-filter');

			projectCards.forEach((card) => {
				if (
					filterValue === 'all' ||
					card.getAttribute('data-category') === filterValue
				) {
					card.style.display = 'block';
					// Trigger reflow to restart animation
					void card.offsetWidth;
					card.style.opacity = '1';
					card.style.transform = 'scale(1)';
				} else {
					card.style.opacity = '0';
					card.style.transform = 'scale(0.8)';
					setTimeout(() => {
						card.style.display = 'none';
					}, 300);
				}
			});
		});
	});

	// Scroll Reveal Animation
	const revealElements = document.querySelectorAll(
		'.about-content, .skill-category, .project-card, .timeline-item, .contact-content',
	);

	const revealOnScroll = () => {
		const windowHeight = window.innerHeight;
		const elementVisible = 100;

		revealElements.forEach((el) => {
			const elementTop = el.getBoundingClientRect().top;
			if (elementTop < windowHeight - elementVisible) {
				el.classList.add('active');
				el.style.opacity = '1';
				el.style.transform = 'translateY(0)';
			}
		});
	};

	// Initialize styles for reveal elements
	revealElements.forEach((el) => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(50px)';
		el.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)'; // Smoother transition
	});

	window.addEventListener('scroll', revealOnScroll);
	// Trigger once on load
	revealOnScroll();
});
