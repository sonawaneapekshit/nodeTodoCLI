#!/usr/bin/env node
// Source - https://stackoverflow.com/a/28646724
// Posted by Mark Amery, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-09, License - CC BY-SA 3.0

import fs from 'fs';
import crypto from 'crypto';

let tasks = [];
let existingTasks = [];
let status = ['done', 'in-progress', 'on-hold', 'todo'];
let randomStatusIndex = Math.floor(Math.random() * 4 + 0);
let randomStatusValue = randomStatusIndex
  ? status[randomStatusIndex]
  : status[1];
var args = process.argv.slice(-2);
var instruction = process.argv.at(2);
var typeOfInstructutions = ['add', 'list', 'delete', 'update', 'clear', 'mark'];
var todoIndex = 1;
try {
  if (typeOfInstructutions.indexOf(instruction) !== -1) {
    if (instruction.toString().toLowerCase() === 'add') {
      let uuid = crypto.randomUUID();
      var todoItem = process.argv.at(3);
      // console.log(todoItem, '##');
      if (fs.readFileSync('./tasks.json', 'utf8') !== '') {
        existingTasks = JSON.parse(fs.readFileSync('./tasks.json', 'utf8'));
      }
      if (todoItem) {
        todoItem = process.argv.at(3).toString();
        if (existingTasks.length !== 0 && Array.isArray(existingTasks)) {
          tasks = [...existingTasks];
          todoIndex = tasks.length;
          let currentDate = new Date(Date.now()).toUTCString();
          let updatedDare = new Date(Date.now()).toUTCString();
          tasks.push({
            index: todoIndex + 1,
            id: uuid,
            title: todoItem,
            status: 'todo',
            createdAt: currentDate,
            updatedAt: null,
          });
        }

        // Initial State adding
        if (existingTasks.length === 0 && Array.isArray(existingTasks)) {
          console.log(randomStatusIndex);
          let currentDate = new Date(Date.now()).toUTCString();
          tasks.push({
            index: todoIndex,
            id: uuid,
            title: todoItem,
            status: 'todo',
            createdAt: currentDate,
            updatedAt: null,
          });
        }

        fs.writeFileSync('./tasks.json', JSON.stringify(tasks), 'utf8');
      } else {
        throw new Error('Enter valid Todo item');
      }
    } else if (instruction.toString().toLowerCase() === 'update') {
      var updatedTodoItemIndex = process.argv.at(3);
      var updatedTodoItemTitle = process.argv.at(4);
      if (updatedTodoItemIndex && updatedTodoItemTitle) {
        updatedTodoItemIndex = parseInt(process.argv.at(3));
        updatedTodoItemTitle = process.argv.at(4).toString();
        if (fs.readFileSync('./tasks.json', 'utf8') !== '') {
          existingTasks = JSON.parse(fs.readFileSync('./tasks.json', 'utf8'));
        }
        if (existingTasks.length !== 0 && Array.isArray(existingTasks)) {
          tasks = [...existingTasks];
          todoIndex = tasks.length;
          let updatedDate = new Date(Date.now()).toUTCString();
          let objIndex = tasks.findIndex(
            (obj) => obj.index == updatedTodoItemIndex,
          );
          if (objIndex !== -1) {
            tasks[objIndex].title = updatedTodoItemTitle;
            tasks[objIndex].updatedAt = updatedDate;
            fs.writeFileSync('./tasks.json', JSON.stringify(tasks), 'utf8');
          } else {
            throw new Error('Enter valid Todo item to be updated');
          }
        } else {
          throw new Error('Todo items does not exist');
        }
      } else {
        throw new Error('Enter valid Todo item');
      }
    } else if (instruction.toString().toLowerCase() === 'mark') {
      var updatedTodoItemIndex = process.argv.at(3);
      var updatedTodoItemStatus = process.argv.at(4);
      console.log(updatedTodoItemStatus, '##');
      if (updatedTodoItemIndex && updatedTodoItemStatus) {
        updatedTodoItemIndex = parseInt(process.argv.at(3));
        updatedTodoItemStatus = process.argv.at(4).toString();
        console.log(updatedTodoItemStatus, '@@');
        if (fs.readFileSync('./tasks.json', 'utf8') !== '') {
          existingTasks = JSON.parse(fs.readFileSync('./tasks.json', 'utf8'));
        }
        if (existingTasks.length !== 0 && Array.isArray(existingTasks)) {
          tasks = [...existingTasks];
          todoIndex = tasks.length;
          let updatedDate = new Date(Date.now()).toUTCString();
          let objIndex = tasks.findIndex(
            (obj) => obj.index == updatedTodoItemIndex,
          );
          if (objIndex !== -1) {
            tasks[objIndex].status = updatedTodoItemStatus;
            tasks[objIndex].updatedAt = updatedDate;
            fs.writeFileSync('./tasks.json', JSON.stringify(tasks), 'utf8');
          } else {
            throw new Error('Enter valid todo item to update');
          }
        }
      } else {
        throw new Error('Enter valid Todo item');
      }
    } else if (instruction.toString().toLowerCase() === 'delete') {
      var updatedTodoItemIndex = process.argv.at(3);
      console.log(updatedTodoItemIndex, '##');
      if (updatedTodoItemIndex) {
        console.log(updatedTodoItemIndex, '00');
        updatedTodoItemIndex = parseInt(process.argv.at(3));
        if (fs.readFileSync('./tasks.json', 'utf8') !== '') {
          existingTasks = JSON.parse(fs.readFileSync('./tasks.json', 'utf8'));
        }
        if (existingTasks.length !== 0 && Array.isArray(existingTasks)) {
          tasks = [...existingTasks];
          todoIndex = tasks.length;
          let objIndex = tasks.findIndex(
            (obj) => obj.index == updatedTodoItemIndex,
          );
          if (objIndex !== -1) {
            tasks.splice(objIndex, 1);
            fs.writeFileSync('./tasks.json', JSON.stringify(tasks), 'utf8');
          } else {
            throw new Error('Enter valid todo item to update');
          }
        }
      } else {
        throw new Error('Enter valid Todo item');
      }
    } else if (instruction.toString().toLowerCase() === 'list') {
      if (fs.readFileSync('./tasks.json', 'utf8') !== '') {
        existingTasks = JSON.parse(fs.readFileSync('./tasks.json', 'utf8'));
        console.log(existingTasks);
      }
    } else if (instruction.toString().toLowerCase() === 'clear') {
      if (fs.readFileSync('./tasks.json', 'utf8') !== '') {
        tasks = [];
        fs.writeFileSync('./tasks.json', JSON.stringify(tasks), 'utf8');
        console.log(existingTasks);
      }
    } else {
      throw new Error('Enter valid commands');
    }
  } else {
    throw new Error('Enter valid commands');
  }
} catch (err) {
  console.log(err);
}

