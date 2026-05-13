const form = document.querySelector('#match-form');
const message = document.querySelector('#feedback');
const actionLink = document.querySelector('#view-profile');

const answersFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('novamindMatch')) || null;
  } catch {
    return null;
  }
};

const saveMatch = (match) => {
  localStorage.setItem('novamindMatch', JSON.stringify(match));
};

const chooseTutor = (answers, tutors) => {
  const weights = tutors.map((tutor) => {
    let score = 0;
    if (tutor.subjects.includes(answers.subject)) score += 3;
    if (tutor.personality === answers.personality) score += 2;
    if (tutor.learningStyle === answers.learningStyle) score += 2;
    const sharedInterests = tutor.interests.filter((interest) => answers.interests.includes(interest));
    score += sharedInterests.length;
    return { tutor, score };
  });

  const bestScore = Math.max(...weights.map((item) => item.score));
  const candidates = weights.filter((item) => item.score === bestScore).map((item) => item.tutor);
  if (candidates.length === 0) return tutors[Math.floor(Math.random() * tutors.length)];
  return candidates[Math.floor(Math.random() * candidates.length)];
};

const loadTutors = async () => {
  const response = await fetch('tutors.json');
  if (!response.ok) throw new Error('Unable to load tutors');
  return response.json();
};

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const answers = {
      name: formData.get('name').trim(),
      subject: formData.get('subject'),
      personality: formData.get('personality'),
      learningStyle: formData.get('learningStyle'),
      interests: formData.getAll('interests'),
      goals: formData.get('goals').trim(),
      timestamp: new Date().toISOString(),
    };

    if (!answers.name || !answers.subject || !answers.personality || !answers.learningStyle) {
      message.textContent = 'Completează toate câmpurile esențiale pentru a găsi profesorul potrivit.';
      return;
    }

    try {
      const tutors = await loadTutors();
      const matchedTutor = chooseTutor(answers, tutors);
      saveMatch({ answers, tutor: matchedTutor });
      window.location.href = 'profile.html';
    } catch (error) {
      message.textContent = 'A apărut o problemă la încărcarea profesorilor. Încearcă din nou peste câteva momente.';
      console.error(error);
    }
  });
}

if (actionLink) {
  const match = answersFromStorage();
  if (!match) {
    actionLink.classList.add('hidden');
  } else {
    actionLink.href = 'profile.html';
  }
}

const renderTutorSummary = () => {
  const summary = document.querySelector('#summary');
  const match = answersFromStorage();
  if (!summary || !match) return;

  summary.innerHTML = `
    <p>Bun venit, <strong>${match.answers.name}</strong>!<br>
    Te vom ajuta să găsești un tutor potrivit pentru <strong>${match.answers.subject}</strong>.
    </p>
    <p class="small-note">Profilul tău a fost salvat local. Poți revedea profesorul recomandat oricând.</p>
  `;
};

if (document.querySelector('#summary')) {
  renderTutorSummary();
}
