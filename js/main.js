// --------------------------------------------------
// Generate stars
// --------------------------------------------------

const starsContainer = document.getElementById('stars')
const bookStars = document.getElementById('bookStars')
const benefitList = document.querySelector('.benefit-list')
const sleepVisual = document.querySelector('.sleep-visual')

const generateStars = () => {
	for (let i = 0; i < 120; i++) {
		const s = document.createElement('div')
		s.className = 'star'

		const size = Math.random() * 2 + 0.5

		s.style.cssText = `
      width: ${size}px; height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --d: ${2 + Math.random() * 4}s;
      --delay: ${Math.random() * 5}s;
      --min-op: ${0.1 + Math.random() * 0.2};
      --max-op: ${0.5 + Math.random() * 0.5};
    `

		starsContainer.appendChild(s)
	}
}

// --------------------------------------------------
// Book stars
// --------------------------------------------------

const generateBookStars = () => {
	for (let i = 0; i < 20; i++) {
		const bs = document.createElement('div')
		bs.className = 'bs'

		const sz = Math.random() * 1.5 + 0.5

		bs.style.cssText = `
      width: ${sz}px; height: ${sz}px;
      top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
      opacity: ${0.3 + Math.random() * 0.6};
    `

		bookStars.appendChild(bs)
	}
}

// --------------------------------------------------
// FAQ
// --------------------------------------------------

const toggleFaq = btn => {
	const item = btn.closest('.faq-item')
	const isOpen = item.classList.contains('open')

	document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'))

	if (!isOpen) item.classList.add('open')
}

// --------------------------------------------------
// Reveal on scroll
// --------------------------------------------------

const revealObs = new IntersectionObserver(
	entries => {
		entries.forEach(e => {
			if (e.isIntersecting) {
				e.target.classList.add('visible')
			}
		})
	},
	{ threshold: 0.1 }
)

const handleRevealObserver = () => {
	document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))
}

// --------------------------------------------------
// Benefits stagger
// --------------------------------------------------

const benefitObs = new IntersectionObserver(
	entries => {
		entries.forEach(e => {
			if (e.isIntersecting) {
				const benefits = e.target.querySelectorAll('.benefit')

				benefits.forEach((b, i) => {
					setTimeout(() => b.classList.add('visible'), i * 120)
				})

				benefitObs.unobserve(e.target)
			}
		})
	},
	{ threshold: 0.2 }
)

const handleBenefitObserver = () => {
	if (benefitList) benefitObs.observe(benefitList)
}

// --------------------------------------------------
// Animate sleep phase bars on scroll
// --------------------------------------------------

const phaseObserver = new IntersectionObserver(
	entries => {
		entries.forEach(e => {
			if (e.isIntersecting) {
				e.target.querySelectorAll('.phase-bar').forEach((bar, i) => {
					setTimeout(() => {
						bar.style.width = bar.dataset.width
					}, i * 150)
				})

				phaseObserver.unobserve(e.target)
			}
		})
	},
	{ threshold: 0.4 }
)

const handlePhaseObserver = () => {
	if (sleepVisual) phaseObserver.observe(sleepVisual)
}

// --------------------------------------------------
// Footer year
// --------------------------------------------------

const handleCurrentYear = () => {
	document.getElementById('year').textContent = new Date().getFullYear()
}

// --------------------------------------------------
// Init
// --------------------------------------------------

generateStars()
generateBookStars()
handleRevealObserver()
handleBenefitObserver()
handlePhaseObserver()
handleCurrentYear()