import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    MatDatepickerModule, 
    MatInputModule, 
    MatNativeDateModule, 
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  task = '';
  editTaskId: number | null = null;
  currentTime: string = '';
  taskList: {
    isCompleted: boolean;
    justAdded: boolean;
    id: number;
    task: string;
    isEdit: boolean;
    dateTime: string; 
  }[] = [];
  currentDateTime: string = ''; 
  minDate:Date = new Date();
minTime: any;

  addTask() {
    if (!this.currentDateTime || !this.currentTime) {
      alert('Please select both a date and time before adding the task!');
      return;
    }
  
    const [hours, minutes] = this.currentTime.split(':').map(Number);
    const newDateTime = new Date(this.currentDateTime);
    newDateTime.setHours(hours);
    newDateTime.setMinutes(minutes);
  
    if (this.task.trim()) {
      this.taskList.push({
        id: this.taskList.length + 1,
        task: this.task,
        isEdit: false,
        justAdded: false,
        isCompleted: false,
        dateTime: newDateTime.toString(),  // Save the combined date-time
      });
  
      this.task = '';
      this.editTaskId = null;
      this.currentDateTime = '';
      this.currentTime = '';  // Reset the time
    }
  }
  

  editTask(taskId: number) {
    const editTask = this.taskList.find((item) => item.id === taskId);
    if (editTask) {
      if (editTask.isCompleted) {
        alert('Completed tasks cannot be edited!');
        return;
      }
      this.task = editTask.task;
      this.editTaskId = taskId;
    }
  }

  saveTask(taskId: number) {
    const saveTask = this.taskList.find((item) => item.id === taskId);
    if (saveTask) {
      saveTask.task = this.task;
      this.task = '';
      this.editTaskId = null;
    }
  }

  completeTask(taskId: number) {
    const task = this.taskList.find((item) => item.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
      task.isEdit = false;
    }
  }

  deleteTask(taskId: number) {
    this.taskList = this.taskList.filter((item) => item.id !== taskId);
  }

  trackById(index: number, task: any): number {
    return task.id;  
  }
}
