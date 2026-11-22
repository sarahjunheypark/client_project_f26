const year = document.querySelector('[data-year]');

if (year) {
    year.textContent = new Date().getFullYear();
}

const checklist = document.querySelector('#preparation-checklist');

if (checklist) {
    const storageKey = 'umsi-elo-preparation-steps';
    const boxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
    const feedback = checklist.querySelector('[role="status"]');
    const reset = checklist.querySelector('[data-reset]');

    try {
        const savedSteps = JSON.parse(localStorage.getItem(storageKey));
        if (Array.isArray(savedSteps)) {
            boxes.forEach(box => {
                box.checked = savedSteps.includes(box.name);
            });
        }
    } catch {
        // The checklist still works when browser storage is unavailable.
    }

    function updateProgress(save = false) {
        const completed = boxes.filter(box => box.checked).map(box => box.name);
        feedback.textContent = `${completed.length} of ${boxes.length} steps completed.`;

        if (save) {
            try {
                localStorage.setItem(storageKey, JSON.stringify(completed));
            } catch {
                // Keep the current selections for this page visit.
            }
        }
    }

    checklist.addEventListener('change', () => updateProgress(true));
    reset.addEventListener('click', () => {
        boxes.forEach(box => {
            box.checked = false;
        });
        updateProgress(true);
    });

    updateProgress();
    checklist.hidden = false;
    document.querySelector('[data-checklist-link]').hidden = false;
}
