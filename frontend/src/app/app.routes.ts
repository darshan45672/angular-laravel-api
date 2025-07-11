import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Index } from './post/index';
import { Create } from './post/create/create';
import { Edit } from './post/edit/edit';

export const routes: Routes = [
    { path: "posts", component: Index },    
    { path: "posts/create", component: Create},
    { path: "posts/:postId/edit", component: Edit},
];
