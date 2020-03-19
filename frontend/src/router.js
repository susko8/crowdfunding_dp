import HomeComponent from './components/Home/HomeComponent'
import RegisterComponent from './components/UserManagement/RegisterComponent'

export const routes = [
  {
    path: '',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/home',
    name: 'HomePath',
    component: HomeComponent
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  }
]

