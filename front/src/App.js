import React, { useState } from 'react';
import UserForm from './components/userForm/UserForm';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import routes from './configs/routes';

import UserPage from './pages/userPage/UserPage';
import HomePage from './pages/homePage/HomePage';
import UserEditPage from './pages/userEditPage/UserEditPage'

function App({ className }) {
  const [isShowAddForm, showAddForm] = useState(false);

  return (
    <div className={className}>
      <header className="App-header">
        <p>
          React+GraphQl+Apollo
        </p>
        <button className="btn" onClick={() => showAddForm(!isShowAddForm)}>Add user</button>
      </header>
      {isShowAddForm && <UserForm showAddForm={showAddForm}></UserForm>}
      <main>
        <Switch>
          <Route exact path={routes.INDEX} component={HomePage}></Route>
          <Route exact path={routes.USER_PAGE} component={UserPage}></Route>
          <Route exact path={routes.USER_EDIT_PAGE} component={UserEditPage}></Route>
        </Switch>
      </main>
      <footer>
        <span>developed by: Tokar Andrii</span>
        <span>tokar.andrii@gmail.com</span>
        <a className="footerLink" href="https://github.com/TokarAndrii/">github.com</a>
      </footer>
    </div>
  );
};

const StyledApp = styled(App)`
text-align: center;
.btn {
  padding: 8px 32px;
  flex: 0 1 200px;
  height: 80%
}

.btn:hover{
    outline: 1px solid blue;
}
header {
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: black;
  padding: 0 32px;
}

main{
  min-height: 76vh;
}
footer{
  color: white;
  background-color: black;
  padding: 0 256px;
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footerLink{
  color: white;
  text-decoration: none;
  cursor: pointer;
}
`

export default StyledApp;
