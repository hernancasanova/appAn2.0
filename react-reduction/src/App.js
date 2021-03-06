import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import AuthForm from './components/AuthForm';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'


const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
//const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
//const Bienvenida = React.lazy(() => import('pages/Bienvenida'));
const Listado = React.lazy(() => import('pages/Listado'));
const RegistrarVacuno = React.lazy(() => import('pages/RegistrarVacuno'));
//const RegistrarVacuno = React.lazy(() => import('pages/ReactHookForm'));
const RegistrarArete = React.lazy(() => import('pages/RegistrarArete'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));//

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  componentDidMount(){
    let api_token=localStorage.getItem('api_token');
    if(!api_token){
      this.props.history.push("login");
    }
  }
  render() {
    const {history} = this.props;
    return (
      <ConnectedRouter history={history} >
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} history={history} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} history={history}/>
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint} history={history}>
              <React.Suspense fallback={<PageSpinner />}>
                {/*<Route exact path="/" component={Bienvenida} />*/}
                <Route exact path="/listado_vacunos" component={Listado} />
                <Route exact path="/registrar_vacuno" component={RegistrarVacuno} />
                <Route exact path="/registrar_arete" component={RegistrarArete} />
                {/*<Redirect </Redirect>to={} /> */}
              </React.Suspense>
            </MainLayout>
          </Switch>
      </ConnectedRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);