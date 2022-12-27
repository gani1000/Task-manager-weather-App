
const taskValue = document.querySelector('.task-input');
const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task-form');
const formAlert = document.querySelector('.form-alert');
const loadingDOM = document.querySelector('.loading-text')

// get the created data from back-end server -> DB
const showTasks = async () => {
    loadingDOM.style.visibility = 'visible';
    try {
        const {
            data: { tasks },
        } = await axios.get('/api/v1/tasks');
        if (tasks.length < 1) {
            tasksDOM.innerHTML = 'There is no tasks in you list...';
            loadingDOM.style.visibility = 'hidden';
            return;
        }
        const allTasks = tasks
        .map((task) => {
            const { completed, _id: taskID, name } = task;
            return`
            <div class="single-task ${completed && 'task-completed'}">
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                    <a href="../html/edit_task.html?id=${taskID}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id="${taskID}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            `
        }).join('');
        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        tasksDOM.innerHTML = '<h5>There was an Error, please try again later...';
    }
    loadingDOM.style.visibility = 'hidden';
}

showTasks();

// delete from DB based on the current id
tasksDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.parentElement.classList.contains('delete-btn')){
        const id = el.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
});

// send the Input value to back-end server -> DB
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskValue.value;
    try {
        await axios.post('/api/v1/tasks', { name });
        showTasks();
        taskValue.value = '';
        formAlert.style.display = 'block';
        formAlert.textContent = 'success, Task added';
        formAlert.classList.add('text-success');
    } catch (error) {
        formAlert.style.display = 'block';
        formAlert.innerHTML = 'Error plase try again later!';
    }
    setTimeout(() => {
        formAlert.style.display = 'none';
        formAlert.classList.remove('text-success');
    }, 2000);
});