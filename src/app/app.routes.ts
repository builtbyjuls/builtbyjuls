import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AratCaseStudy } from './pages/arat-case-study/arat-case-study';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Julius Lapugot | Senior Java Software Engineer',
  },
  {
    path: 'projects/arat',
    component: AratCaseStudy,
    title: 'Arat? Product Case Study | Julius Lapugot',
  },
  {
    path: 'projects/ano-tara',
    redirectTo: '/projects/arat',
    pathMatch: 'full',
  },
  {
    path: 'projects/q-ify',
    redirectTo: '/projects/arat',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
