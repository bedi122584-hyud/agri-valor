

function setLang(lang) {
    document.body.className = lang === 'en' ? 'lang-en' : '';
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));

    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.textContent === lang.toUpperCase()) btn.classList.add('active');
    });
}

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}

    , {
        threshold: 0.1
    });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// EmailJS Init & Form submit
emailjs.init('JyBGWJHddgFxBqt-3'); // TODO: Replace with actual Public Key

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Alert the user that the sending is in progress (optional enhancement)
        const submitBtns = contactForm.querySelectorAll('.btn-submit');
        const originalText = submitBtns[0].textContent;
        submitBtns.forEach(btn => btn.textContent = 'Envoi... / Sending...');

        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#contact-form')
        emailjs.sendForm('service_d6a7mno', 'template_78l9xx1', this)
            .then(function () {
                alert('Message envoyé avec succès ! / Message sent successfully!');
                contactForm.reset();
                submitBtns.forEach(btn => btn.textContent = originalText);
            }, function (error) {
                alert('Erreur lors de l’envoi... Veuillez réessayer. / Failed to send... Please try again.');
                console.log('FAILED...', error);
                submitBtns.forEach(btn => btn.textContent = originalText);
            });
    });
}

