
# Financial Data Viewer

This project is a React application that fetches and displays financial data for a company using the [Financial Modeling Prep API](https://financialmodelingprep.com/). Users can filter, sort, and view data in a responsive design.

## Live Demo Link
https://finscope-f12z.onrender.com

## Features
- Fetch financial data for a company.
- Filter by year range, revenue range, and net income range.
- Sort by date, revenue, and net income (ascending/descending).
- Fully responsive for desktop and mobile devices.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm comes with Node.js)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sajana4403/finScope.git
cd finScope
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Add the `.env` File

Create a `.env` file in the root of your project and add the following environment variable:

```bash
VITE  _API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from [Financial Modeling Prep](https://financialmodelingprep.com/).

> **Note**: The `.env` file is excluded from version control using `.gitignore`.

### 4. Run the Project

Start the development server:    

```bash
npm start
```

This will launch the app in your default browser at `http://localhost:3000`.

---

## Project Structure

```
src/
├── components/       # Reusable components
├── App.js            # Main application logic
├── App.css           # Styling for the application
├── index.js          # Entry point for the application
├── .env              # Environment variables (not tracked in Git)
```

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder. It optimizes the build for the best performance.

### `npm test`

Launches the test runner in interactive watch mode.

---

## Responsive Design

The app is designed to work seamlessly on both desktop and mobile devices. Filters stack vertically and the table is horizontally scrollable on smaller screens.

---

## API Reference

This project uses the **Income Statement API** from [Financial Modeling Prep](https://financialmodelingprep.com/):

**Endpoint**:  
```
https://financialmodelingprep.com/api/v3/income-statement/{symbol}?period=annual&apikey={API_KEY}
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Financial Modeling Prep API](https://financialmodelingprep.com/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) (if applicable)
