(function() {
  // ========== КЛАСС ==========
  const classSelect = document.getElementById('classSelect');
  
  function loadClass() {
    const saved = localStorage.getItem('userClass');
    if (saved) {
      classSelect.value = saved;
    }
  }
  
  classSelect.addEventListener('change', function() {
    localStorage.setItem('userClass', this.value);
  });
  
  loadClass();

  // ========== ИНТЕРЕСЫ ==========
  const STORAGE_INTERESTS = 'customInterestsAll';
  const tagsContainer = document.getElementById('tagsContainer');
  const interestSelect = document.getElementById('interestSelect');
  const addFromSelectBtn = document.getElementById('addFromSelectBtn');

  const baseInterests = ['IT', 'Дизайн', 'Медицина', 'Гуманитарные'];
  const colorPalette = ['#ff004c', '#00ff2a', '#00ff9d', '#00ff6a', '#aa00ff', '#00ff9d', '#00b3ff', '#ff0000', '#008cff', '#ff00f2'];

  function getRandomColor() { 
    return colorPalette[Math.floor(Math.random() * colorPalette.length)]; 
  }

  function loadAllInterests() {
    const saved = localStorage.getItem(STORAGE_INTERESTS);
    if (saved) { 
      try { 
        return JSON.parse(saved); 
      } catch { 
        return [...baseInterests]; 
      } 
    } else { 
      return [...baseInterests]; 
    }
  }

  function saveAllInterests(arr) { 
    localStorage.setItem(STORAGE_INTERESTS, JSON.stringify(arr)); 
  }

  function renderTags() {
    const interests = loadAllInterests();
    tagsContainer.innerHTML = '';
    interests.forEach((text) => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = text;
      span.style.backgroundColor = getRandomColor();
      const del = document.createElement('span');
      del.className = 'delete-tag';
      del.textContent = '✕';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        let current = loadAllInterests();
        current = current.filter(item => item !== text);
        saveAllInterests(current);
        renderTags();
      });
      span.appendChild(del);
      tagsContainer.appendChild(span);
    });
  }

  addFromSelectBtn.addEventListener('click', () => {
    const selectedValue = interestSelect.value;
    if (!selectedValue) {
      alert('Пожалуйста, выберите интерес из списка');
      return;
    }
    
    const current = loadAllInterests();
    if (current.some(i => i.toLowerCase() === selectedValue.toLowerCase())) {
      alert('Такой интерес уже есть');
      return;
    }
    
    current.push(selectedValue);
    saveAllInterests(current);
    renderTags();
    interestSelect.value = '';
  });

  // ========== ЦЕЛЬ с кнопкой "Изменить" ==========
  const GOAL_KEY = 'userGoal';
  const goalDisplay = document.getElementById('goalDisplay');
  const goalEditArea = document.getElementById('goalEditArea');
  const goalInput = document.getElementById('goalInput');
  const saveGoalBtn = document.getElementById('saveGoalBtn');
  const cancelGoalBtn = document.getElementById('cancelGoalBtn');
  const editGoalBtn = document.getElementById('editGoalBtn');

  function loadGoal() {
    const saved = localStorage.getItem(GOAL_KEY);
    goalDisplay.innerText = saved ? 'Моя цель: ' + saved : 'Моя цель: Поступить на программу...';
  }
  loadGoal();

  editGoalBtn.addEventListener('click', () => {
    goalDisplay.style.display = 'none';
    editGoalBtn.style.display = 'none';
    goalEditArea.style.display = 'block';
    goalInput.value = goalDisplay.innerText.replace('Моя цель: ', '');
  });

  saveGoalBtn.addEventListener('click', () => {
    const newGoal = goalInput.value.trim() || 'Поступить на программу...';
    goalDisplay.innerText = 'Моя цель: ' + newGoal;
    localStorage.setItem(GOAL_KEY, newGoal);
    goalDisplay.style.display = 'block';
    editGoalBtn.style.display = 'inline-block';
    goalEditArea.style.display = 'none';
  });
  
  cancelGoalBtn.addEventListener('click', () => {
    goalDisplay.style.display = 'block';
    editGoalBtn.style.display = 'inline-block';
    goalEditArea.style.display = 'none';
  });

  // ========== СЕГОДНЯ ==========
  const todayDateSpan = document.getElementById('currentDate');
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const today = new Date().toLocaleDateString('ru-RU', options);
  todayDateSpan.textContent = today;

  const TASK_KEY = 'todayTask';
  const taskDisplay = document.getElementById('taskDisplay');
  const taskEditArea = document.getElementById('taskEditArea');
  const editTaskBtn = document.getElementById('editTaskBtn');
  const taskInput = document.getElementById('taskInput');
  const saveTaskBtn = document.getElementById('saveTaskBtn');
  const cancelTaskBtn = document.getElementById('cancelTaskBtn');

  function loadTask() {
    const saved = localStorage.getItem(TASK_KEY);
    taskDisplay.innerText = saved ? '✨ ' + saved : '✨ получить диплом программиста';
  }
  loadTask();

  editTaskBtn.addEventListener('click', () => {
    taskDisplay.style.display = 'none';
    editTaskBtn.style.display = 'none';
    taskEditArea.style.display = 'flex';
    taskInput.value = taskDisplay.innerText.replace('✨ ', '');
  });
  
  saveTaskBtn.addEventListener('click', () => {
    const newTask = taskInput.value.trim() || 'получить диплом программиста';
    taskDisplay.innerText = '✨ ' + newTask;
    localStorage.setItem(TASK_KEY, newTask);
    taskDisplay.style.display = 'block';
    editTaskBtn.style.display = 'inline-block';
    taskEditArea.style.display = 'none';
  });
  
  cancelTaskBtn.addEventListener('click', () => {
    taskDisplay.style.display = 'block';
    editTaskBtn.style.display = 'inline-block';
    taskEditArea.style.display = 'none';
  });

  renderTags();
})();