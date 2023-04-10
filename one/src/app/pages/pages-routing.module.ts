import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MakesComponent } from './makes/makes.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
// Error page
// import { ErrorComponent } from '../pages/error/error.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'makes', component: MakesComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'user',
      component: UserComponent,
      loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
