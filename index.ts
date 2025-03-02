interface TaskItem {
    id: number;
    description: string;
    isDone: boolean;
    deadline: Date;
}

class TaskManager {
    private tasks: TaskItem[] = [];
    private idCounter: number = 1;

    // Add a new task with validation
    addTask(description: string, deadline: Date): void {
        if (!description.trim()) {
            console.log("Error: Task description cannot be empty.");
            return;
        }

        if (!(deadline instanceof Date) || isNaN(deadline.getTime())) {
            console.log("Error: Invalid deadline.");
            return;
        }

        if (this.tasks.some(task => task.description.toLowerCase() === description.toLowerCase())) {
            console.log(`Error: Task "${description}" already exists.`);
            return;
        }

        this.tasks.push({
            id: this.idCounter++,
            description,
            isDone: false,
            deadline
        });
        console.log(`Added: "${description}"`);
    }

    // Mark a task as done
    markDone(id: number): void {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            console.log(`Error: Task with ID ${id} not found.`);
            return;
        }

        if (task.isDone) {
            console.log(`Error: Task "${task.description}" is already completed.`);
            return;
        }

        task.isDone = true;
        console.log(`Completed: "${task.description}"`);
    }

    // Remove a task by ID
    deleteTask(id: number): void {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            console.log(`Error: Task with ID ${id} not found.`);
            return;
        }

        const removed = this.tasks.splice(index, 1);
        console.log(`Removed: "${removed[0].description}"`);
    }

    // Display all tasks
    showTasks(): TaskItem[] {
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
            return [];
        }

        console.log("Your Task List:");
        this.tasks.forEach(task => {
            console.log(`${task.id}. ${task.description} - ${task.isDone ? "Completed" : "Pending"} (Due: ${task.deadline.toDateString()})`);
        });
        
        return this.tasks;
    }

    // Filter tasks based on completion status
    filterTasks(isDone: boolean): TaskItem[] {
        return this.tasks.filter(task => task.isDone === isDone);
    }

    // Update a task description
    editTask(id: number, newDescription: string): void {
        if (!newDescription.trim()) {
            console.log("Error: Task description cannot be empty.");
            return;
        }

        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            console.log(`Error: Task with ID ${id} not found.`);
            return;
        }

        task.description = newDescription;
        console.log(`Updated ID ${id}: "${newDescription}"`);
    }

    // Remove all completed tasks
    clearFinished(): void {
        const completedTasks = this.tasks.filter(task => task.isDone);
        if (completedTasks.length === 0) {
            console.log("No completed tasks to clear.");
            return;
        }

        this.tasks = this.tasks.filter(task => !task.isDone);
        console.log(`Cleared ${completedTasks.length} completed task(s).`);
    }
}

// Example usage
const myTasks = new TaskManager();
myTasks.addTask("Complete TypeScript module", new Date("2025-03-01"));
myTasks.addTask("Start a new book", new Date("2025-03-05"));
myTasks.showTasks();
myTasks.markDone(1);
myTasks.showTasks();
myTasks.editTask(2, "Read two different books");
myTasks.showTasks();
myTasks.clearFinished();
myTasks.showTasks();
