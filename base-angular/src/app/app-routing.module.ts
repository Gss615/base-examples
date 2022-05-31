import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComposeComponent } from './pages/compose/compose.component';

const routes: Routes = [
  { path: 'compose', component: ComposeComponent, outlet: 'popup' },// 具名路由
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      // {
      //   scrollPositionRestoration:'enabled', //记录导航位置，返回时跳转以前滚动的位置
      //   enableTracing:true, // 用来debug
      //   preloadingStrategy: // 配置预加载策略
      // }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
