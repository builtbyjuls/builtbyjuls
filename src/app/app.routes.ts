import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { QifyCaseStudy } from './pages/qify-case-study/qify-case-study';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Julius Lapugot | Senior Java Software Engineer',
  },
  {
    path: 'projects/q-ify',
    component: QifyCaseStudy,
    title: 'Q-ify Backend Case Study | Julius Lapugot',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
