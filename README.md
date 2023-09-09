# User Registration App

This is a simple React application built to demonstrate a user registration form. The project uses Material UI for styling and Firebase for back-end functionality.

## Features

- User registration with real-time validation
- Success dialog upon successful registration
- Error handling and informative error messages

## Getting Started

### Prerequisites

1. Make sure you have Node.js and Yarn installed on your machine.
2. A Firebase account to handle back-end functionalities.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/<Your-GitHub-Username>/user-registration-app.git
   ```

2. Navigate to the project folder and install dependencies:

   ```bash
   cd user-registration-app
   yarn install
   ```

3. Add your Firebase configuration in a `.env` file.

4. Start the development server:

   ```bash
   yarn start
   ```

The app will open in your default web browser at [http://localhost:3000](http://localhost:3000).

## Usage

Once you start the app, you will be presented with a registration form. Fill in the details and submit. If the data is invalid, you will see error messages. Otherwise, a success dialog will appear.

## Scripts

### `yarn start`

Runs the app in development mode.

### `yarn test`

Runs the test suite for the application.

### `yarn build`

Creates a production-ready build of the application.

## Dependencies

- React
- Material UI
- Firebase

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
