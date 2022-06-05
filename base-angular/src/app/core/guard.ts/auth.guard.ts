import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';
 // 从authservice中拿到关于是否登录的方法
// authservice应该放在全局也就是core，因为大概可能不仅在login页面用，所以authservic暂定为全局服务，提供一切有关权限的属性或者方法
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private _auth: AuthService,
		private _router: Router
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			console.log('auth',this._auth.token)
		if (this._auth.isAuthenticated()) {
			return true;
		} else {
			this._router.navigateByUrl('/auth/login');
			return false;
		}
	}

}
