import Home from './components/Home/HomeComponent'
import Login from './components/LoginComponent'

export const routes = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

