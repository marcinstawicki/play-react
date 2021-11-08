# play-react
## hook-based approach
### FUNCTIONAL SCOPE:
#### navigation:
* public pages: page01, page02
* private page: page03 with "authenticate" button
#### page01
* adding new element (text) to a list: help message, error message, appending the item to the end of the list
* list: searching with options, sorting with options
* each element of the list: id, added text, first character of the text, delete button
#### page02
* text
* button which redirects to the page01 with additional information to be shown there
#### page03
* text
#### layout
* only basics in order to get the elements in the correct place and to differenciate the elements

### TECHNICAL SCOPE 
#### (JavaScript: if you wish to get to know TypeScript please take a look at the project "play-typescript"):
#### (CSS [ please see above the section "layout" ]: if you wish to get to know CSS/SCSS please take a look at the project "play-layout"):
* Redux, persistReducer, applyMiddleware, ...Reducers, ...ActionCreators, ...Selectors, dispatch
* useState, useDispatch, useSelector, useHistory, useLocation, useEffect, useCallback
* PropTypes, 
* BrowserRouter, Link, Switch, Route, PrivateRoute, 
* className, onClick, onFocus, onChange, render (props!!) 
* ...module.scss, withRouter, ...history.push, 
* conditions (true && "show element")
* tests: react-test-renderer & @testing-library/react, Unit Tests (reducer), components, snapshot, jest.fn(), onClick