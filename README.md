# Trip Application

This is a simple weather app that allows users to view the weather forecast for a given city. The app uses the VisualCrossing API to retrieve the forecast data, and it allows users to authenticate using their Google account.

## Getting Started

To get started with the app, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install`.
3. Create a `.env` file in the root of the project with the following variables:
   - `VITE_REACT_APP_VISUAL_CROSSING_API_KEY`: Your VisualCrossing API key
   - `VITE_REACT_APP_GOOGLE_AUTH_CLIENT_ID`: Your Google OAuth client ID
4. Start the app using `npm run dev`.

## Using the App

To use the app, click the "Add Trip" button. This will open a modal window where you can enter the trip details, including the city, start date, and end date. Once you have entered the trip details, click the "Done" button to add the trip to the list.

To view the forecast for a specific trip, click on the trip in the list.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Visual Crossing: Weather Data & Weather API](https://www.visualcrossing.com/) - An API for retrieving weather forecast data
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2) - An authentication protocol for allowing users to authenticate using their Google account

## Contributing

We welcome contributions to the project! If you would like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
