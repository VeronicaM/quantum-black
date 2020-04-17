# Responsive d3 Barchart

This repo has been bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## How to use
Input a name as text and a value as a positive number and click add. 

You will not be able to add values unless the values are valid and an error message will be displayed otherwise. 
Once a valid value has been added, you will be able to see it rendered as a bar in the barchart below the inputs.
The barchart will be rendered in a random rainbow color.

## Technologies used

- React
- React hooks
- React.memo to improve rendering performance
- Prop-types for components typing
- SASS with CSS modules for styling
- React Testing Library for unit tests
- D3 for data manipulation.

## Things that can be improved

- Improve labels responsive rendering
- Change the chart orientation on mobile to make it vertical instead of horizontal
- Limit the label character length
- Set an upper limit to the value  
- Add more unit tests

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
