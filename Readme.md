# Project URL

https://roadmap.sh/projects/task-tracker

## Task Tracker CLI

A simple CLI-based task tracker built with Node.js.

This project helped me learn:

* Node.js basics
* File system handling (`fs`)
* CLI argument handling (`process.argv`)
* JSON data storage
* CRUD operations
* Error handling
* UUID generation

---

## Features

* Add tasks
* List tasks
* Update tasks
* Clear all tasks
* Store tasks in a local JSON file
* Generate unique IDs using Node.js crypto module

---

## Tech Stack

* Node.js
* JavaScript (ES Modules)

---

## Project Structure

```bash
.
├── cli.js
├── tasks.json
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <your-repo-url>
```

Move into the project folder:

```bash
cd task-tracker-cli
```

### Option 1: Install Globally

Install the CLI globally:

```bash
npm install -g .
```

---

### Option 2: Local Development (Recommended While Building)

Clone/download the project and run:

```bash
npm link
```

This creates a global symlink so you can use:

```bash
task-cli
```

directly from your terminal while developing locally.

## Usage

### Add a Task

```bash
task-cli add "Learn Node.js"
```

---

### List Tasks

```bash
task-cli list
```

---

### Update a Task

```bash
task-cli update 1 "Learn Advanced Node.js"
```

---

### Clear All Tasks

```bash
task-cli clear
```

---

## Example Task Object

```json
{
  "id": "uuid",
  "index": 1,
  "title": "Learn Node.js",
  "status": "in-progress",
  "createdAt": "Sat, 09 May 2026 16:10:41 GMT",
  "updatedAt": null
}
```

---

## Learning Goals

This project was built mainly for learning purposes and helped me understand:

* CRUD operations
* State management
* File persistence
* CLI application structure
* JavaScript array operations
* Error handling patterns

---

## Future Improvements

* Delete task feature
* Mark task as done
* Better CLI formatting
* Colored terminal output
* Validation improvements
* Async file handling
* Command aliases
* Search and filter support

---

## Run Locally

```bash
node cli.js add "Test Task"
```

---

## Author

Built by Apekshit Sonawane while learning Node.js and backend fundamentals.
