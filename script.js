let exercises = [
  {
    id: 1,
    name: "Barbell Bench Press",
    bodyPart: "Pectoralis Major (Chest), Anterior Deltoids (Front Shoulders), Triceps Brachii",
    reps: "3-4 sets of 8-12 reps",
    description: "The Barbell Bench Press is a classic strength training exercise primarily targeting the pectoralis major (chest muscles), while also engaging the deltoids (shoulders) and triceps (back of the arms). It's widely regarded as one of the best compound exercises for upper body development.",
    howToPerform: [
      "Lie flat on a bench, with your eyes directly under the barbell.",
      "Feet flat on the floor, back slightly arched, and shoulders retracted (squeezed together).",
      "Grip the barbell slightly wider than shoulder-width apart.",
      "Unrack the barbell carefully, lowering it in a controlled manner to your mid-chest.",
      "Press the bar upward by extending your arms fully, without locking out your elbows harshly.",
      "Repeat for the desired number of reps."
    ],
    benefits: [
      "Builds upper body strength and size.",
      "Improves pushing power and shoulder stability.",
      "Enhances muscle coordination and balance in the upper body."
    ],
    safetyTips: [
      "Always use a spotter when lifting heavy.",
      "Maintain a neutral wrist position.",
      "Avoid bouncing the bar off your chest.",
      "Control the bar both on the way down and up."
    ],
    video: "barbellbenchpress.mp4"
  }
];

const exerciseGrid = document.getElementById('exerciseGrid');
const addExerciseBtn = document.getElementById('addExerciseBtn');
const modal = document.getElementById('addExerciseModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const exerciseForm = document.getElementById('exerciseForm');
const emptyState = document.getElementById('emptyState');

function createExerciseCard(exercise) {
  const howToPerformSteps = exercise.howToPerform ? exercise.howToPerform.map((step, index) =>
    `<li class="text-gray-300 text-sm mb-2"><span class="text-golden font-medium">${index + 1}.</span> ${step}</li>`
  ).join('') : '';

  const benefitsList = exercise.benefits ? exercise.benefits.map(benefit =>
    `<li class="text-gray-300 text-sm mb-1">• ${benefit}</li>`
  ).join('') : '';

  const safetyTipsList = exercise.safetyTips ? exercise.safetyTips.map(tip =>
    `<li class="text-gray-300 text-sm mb-1">• ${tip}</li>`
  ).join('') : '';

  return `
        <div class="exercise-card rounded-xl p-8 relative overflow-hidden max-w-2xl mx-auto" data-id="${exercise.id}">
            <div class="absolute top-6 right-6">
                <button class="delete-btn text-golden hover:text-golden-light transition-colors opacity-50 hover:opacity-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Exercise Header -->
            <div class="mb-8">
                <div class="flex items-center mb-4">
                    <span class="text-2xl mr-3">📖</span>
                    <h3 class="text-2xl font-bold text-golden">${exercise.name}</h3>
                </div>
                
                <!-- Illustrative Video -->
                <div class="rounded-lg overflow-hidden border border-golden/20 bg-carbon-light mb-3">
                    <video
                        src="${exercise.video}"
                        autoplay
                        loop
                        muted
                        playsinline
                        class="w-full h-90 object-cover"
                    ></video>
                </div>
                <div class="text-center">
                    <span class="text-golden text-lg font-medium">Illustrative Video</span>
                    <p class="text-gray-400 text-sm">(MP4 Animation)</p>
                </div>
            </div>
            
            <!-- Description Section -->
            <div class="mb-8">
                <div class="flex items-center mb-4">
                    <span class="text-xl mr-3">📄</span>
                    <h4 class="text-lg font-semibold text-golden">Description</h4>
                </div>
                <p class="text-gray-300 text-sm leading-relaxed bg-carbon/50 p-4 rounded-lg">
                    ${exercise.description}
                </p>
            </div>
            
            <!-- How to Perform Section -->
            ${howToPerformSteps ? `
            <div class="mb-8">
                <div class="flex items-center mb-4">
                    <span class="text-xl mr-3">📌</span>
                    <h4 class="text-lg font-semibold text-golden">How to Perform</h4>
                </div>
                <ol class="bg-carbon/50 p-4 rounded-lg">
                    ${howToPerformSteps}
                </ol>
            </div>
            ` : ''}
            
            <!-- Primary Muscles Section -->
            <div class="mb-8">
                <div class="flex items-center mb-4">
                    <span class="text-xl mr-3">🎯</span>
                    <h4 class="text-lg font-semibold text-golden">Primary Muscles Worked</h4>
                </div>
                <p class="text-gray-300 text-sm bg-carbon/50 p-4 rounded-lg">
                    ${exercise.bodyPart}
                </p>
            </div>
            
            <!-- Benefits Section -->
            ${benefitsList ? `
            <div class="mb-8">
                <div class="flex items-center mb-4">
                    <span class="text-xl mr-3">📝</span>
                    <h4 class="text-lg font-semibold text-golden">Benefits</h4>
                </div>
                <ul class="bg-carbon/50 p-4 rounded-lg">
                    ${benefitsList}
                </ul>
            </div>
            ` : ''}
            
            <!-- Safety Tips Section -->
            ${safetyTipsList ? `
            <div class="mb-6">
                <div class="flex items-center mb-4">
                    <span class="text-xl mr-3">⚠️</span>
                    <h4 class="text-lg font-semibold text-golden">Safety Tips</h4>
                </div>
                <ul class="bg-carbon/50 p-4 rounded-lg">
                    ${safetyTipsList}
                </ul>
            </div>
            ` : ''}
            
            <!-- Sets & Reps -->
            <div class="bg-golden/10 border border-golden/30 rounded-lg p-4 text-center">
                <span class="text-golden font-semibold">Recommended: </span>
                <span class="text-white">${exercise.reps}</span>
            </div>
        </div>
    `;
}

function renderExercises() {
  if (exercises.length === 0) {
    exerciseGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    // For demo, show only the first exercise
    exerciseGrid.innerHTML = createExerciseCard(exercises[0]);

    // Add delete functionality
    const deleteBtn = document.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        const card = e.target.closest('.exercise-card');
        const exerciseId = parseInt(card.dataset.id);
        deleteExercise(exerciseId);
      });
    }
  }
}

function addExercise(exerciseData) {
  const newExercise = {
    id: Date.now(),
    name: exerciseData.name,
    bodyPart: exerciseData.bodyPart,
    reps: exerciseData.reps,
    description: exerciseData.description
  };
  exercises.push(newExercise);
  renderExercises();
}

function deleteExercise(id) {
  exercises = exercises.filter(exercise => exercise.id !== id);
  renderExercises();
}

function showModal() {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  exerciseForm.reset();
}

addExerciseBtn.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
cancelBtn.addEventListener('click', hideModal);

exerciseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const exerciseData = {
    name: document.getElementById('exerciseName').value,
    bodyPart: document.getElementById('bodyPart').value,
    reps: document.getElementById('reps').value,
    description: document.getElementById('description').value
  };

  if (!exerciseData.name || !exerciseData.bodyPart || !exerciseData.reps) {
    alert('Please fill in all required fields');
    return;
  }

  addExercise(exerciseData);
  hideModal();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    hideModal();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.textContent.includes('Add Your First Exercise')) {
    showModal();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderExercises();
});

function searchExercises(searchTerm) {
  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredExercises.length === 0) {
    exerciseGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-golden text-lg mb-2">No exercises found</div>
                <div class="text-gray-400">Try searching with different keywords</div>
            </div>
        `;
  } else {
    exerciseGrid.innerHTML = filteredExercises.map(createExerciseCard).join('');

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.exercise-card');
        const exerciseId = parseInt(card.dataset.id);
        deleteExercise(exerciseId);
      });
    });
  }
}

function exportExercises() {
  const dataStr = JSON.stringify(exercises, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = 'exercises.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

function importExercises(jsonData) {
  try {
    const importedExercises = JSON.parse(jsonData);
    if (Array.isArray(importedExercises)) {
      exercises = importedExercises;
      renderExercises();
      return true;
    }
  } catch (error) {
    console.error('Error importing exercises:', error);
  }
  return false;
}

function getExercisesByBodyPart(bodyPart) {
  return exercises.filter(exercise =>
    exercise.bodyPart.toLowerCase().includes(bodyPart.toLowerCase())
  );
}

function getExerciseStats() {
  const bodyParts = exercises.map(exercise => exercise.bodyPart).join(', ').split(', ');
  const uniqueBodyParts = [...new Set(bodyParts.map(part => part.trim()))];

  return {
    totalExercises: exercises.length,
    uniqueBodyParts: uniqueBodyParts.length,
    bodyParts: uniqueBodyParts
  };
}