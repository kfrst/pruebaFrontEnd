import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { ArrayComponent } from './components/array/array.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: 'diccionario', component: DictionaryComponent },
	{ path: 'numeros', component: ArrayComponent },
	{ path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
