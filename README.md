# Challenge

## Note

### Data

The data /assets/data/data.json is from alphavantage.
I do not know what is being fetched. Therefore I stick with the term 'data',

### State Management

I used redux toolkit for a central state management. I used to pass down props with but it is much more comfortable to have the state on a single spot.

### CSS Naming Convention

I used BEM. The main component that holds the other minor components wrape the minor with the class {major-component\_\_minor-component}. The minor component then has the root class {minor-component}.

#### Example

The Actions Component is a major class. It has the class 'actions'. All its minor components (sub components) are denominated as 'actions**{minor}'. So the fullscreen has the class 'actions**fullscreen.

Then in the minor component itself I named it 'fullscreen'. Since I used SASS name collission won't happen.
