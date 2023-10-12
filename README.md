# Note App

## Overview

This is a web-based note-taking application built using React.js for the frontend and Spring Boot (Java) for the backend. The application allows users to create, retrieve, update, and delete notes. It also provides features like adding and removing tags, editing notes, and viewing individual notes.

[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)

[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-green)](https://spring.io/projects/spring-boot)

[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Acknowledgments](#acknowledgments)

## Getting Started

To get started with the Note App, follow the instructions below.

### Prerequisites

Make sure you have the following installed:

- Node.js and npm for the frontend
- Java 8+ for the backend
- [Git](https://git-scm.com/) to clone the project

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Teriyaki229/note-basic-webapp/
   cd note-basic-webapp
   ```

2. **Database setup:**

   [Connect to MongoDB](https://www.mongodb.com/docs/compass/current/connect/#connect-to-mongodb)

3. **Backend Setup:**

   ```bash
   cd noteObject-basic
   ./mvnw
   ```

   Make sure to configure your database settings in the `.env` file as [mentioned here](https://github.com/Teriyaki229/noteObject-basic#mongodb-configuration).

4. **Frontend Setup:**

   ```bash
   cd noteObject-basic/view/note-app-client
   npm install
   npm start
   ```

   Make sure to configure the `NOTE_BASE_API_URL` in `noteObject-basic\view\note-app-client\src\Service\NoteService.js` to the hosted backend URL. This will start the React development server.

5. **Open your web browser and access the application at [http://localhost:3000](http://localhost:3000).**

## Features

- Create, retrieve, update, and delete notes
- Add and remove tags for notes
- Edit existing notes
- View individual notes with details

## Architecture

The Note App follows the MVCS (Model-View-Controller-Service) architectural pattern to maintain a clear separation of concerns within the application:

- **Model**: The backend of the application, including the `NoteController`, `NoteService`, and `NoteRepository`, represents the Model. It handles data management, data storage and describes the object structure.

- **View**: The frontend of the application, including components like `AddNoteComponent`, `EditNoteComponent`, `ListNotesComponent`, and others, represents the View. It focuses on presenting the user interface and interacting with users. Additionally, these View components also work as Controllers.

- **Controller**: The `NoteController` in the backend acts as the Controller. It receives HTTP requests from the frontend, processes them, and interacts with the Model to retrieve or update data.

- **Service**: The `NoteService` in the backend represents the Service layer. It encapsulates the application's "business" logic, providing an interface between the Controller and the Model.

This MVCS architecture ensures a clean and maintainable codebase by separating concerns, promoting modularity, and allowing the frontend View to have its own controller for enhanced interactivity.

## File Structure

The project consists of the following main files and components:

- **Frontend**:
  - `AddNoteComponent.jsx`: Component for adding new notes.
  - `EditNoteComponent.jsx`: Component for editing existing notes.
  - `ListNotesComponent.jsx`: Component for listing all notes.
  - `ViewNoteComponent.jsx`: Component for viewing individual notes.
  - `Tags.js`: Component for managing tags.
  - `NoteOptions.jsx`: Component for note options (delete and edit).
  - `ConfirmDialogBox.jsx`: Component for confirmation dialog boxes.
  - `CustomAlert.js`: Component for custom alerts.

- **Backend**:
  - `NoteController.java`: Controller for handling HTTP requests.
  - `NoteService.java`: Service layer for application logic.
  - `NoteRepository.java`: Data access layer for interacting with the database.
  - [REST API endpoints](https://github.com/Teriyaki229/noteObject-basic/blob/master/README.md#rest-api-endpoints) for creating, reading, updating, and deleting notes.

## Acknowledgments

This project is built on top of the [Basic Template Spring Web Application](https://github.com/Teriyaki229/noteObject-basic)
