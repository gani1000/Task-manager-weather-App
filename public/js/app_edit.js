
const taskIDDOM = document.querySelector('.task-edit-id');
const taskName = document.querySelector('.task-edit-name');
const taskCompleted = document.querySelector('.task-edit-completed');
const formDOM = document.querySelector('.single-task-form');
const btnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const pramas = window.location.search;
const id = new URLSearchParams(pramas).get('id');
let temp;


// make API requset to back-end server and get data from DB
const showTask = async () => {
    try {
        const { 
            data: {task},
        } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id: taskID, completed, name } = task;
        taskIDDOM.textContent = taskID;
        taskName.value = name;
        temp = name;
        if (completed){
            taskCompleted.checked = true;
        }
    } catch (error) {
        console.log(error);
    }
}

showTask();

// adding patch API to update current data to our DB
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const Name = taskName.value;
        const Complete = taskCompleted.checked;
        const {
            data: {task},
        } = await axios.patch(`/api/v1/tasks/${id}`,{
            name: Name,
            completed: Complete
        });
        
        const { _id: taskID, completed, name } = task

        taskIDDOM.textContent = taskID
        taskName.value = name
        tempName = name
        if (completed) {
            taskCompleted.checked = true
        }
        
        formAlertDOM.style.diplay = 'block';
        formAlertDOM.textContent = 'success, Task edited';
        formAlertDOM.parentElement.classList.add('text-success');
    } catch (error) {
        console.log(error);
        taskName.value = temp;
        formAlertDOM.style.diplay = 'block';
        formAlertDOM.innerHTML = 'Error, it is me not you ^_^';
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.parentElement.classList.remove('text-success');
    }, 2000);
});