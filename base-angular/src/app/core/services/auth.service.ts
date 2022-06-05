import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LocalStorageTypes } from './local-storage/local-storage.interface';
import { LocalStorageService } from './local-storage/local-storage.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private http: HttpClient,) {
		// TODO 判断本地是否有 token
		if (this.isAuthenticated()) {
			this.authData.next('token')
		}

	}

	get token(){
		return this.authData.value
	}

	getToken(){
		return this.authData
	}
	/**
	 *  是否登录
	 */
	isAuthenticated() {
		return !!LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user');
	}
	/**
	 * 获取当前用户
	 */
	getUser() {
		// return User.deserialize(LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user'));
	}
	// 登录
	login() {
		// return this._http.doRequest(ApiEndpoints.LOGIN, ApiMethod.POST, loginData)
		// 	.pipe(tap((rawUser: User) => {
		// 		Logger.info('User Logged in', rawUser);
		// 		this.updateLocalUser(rawUser);
		// 	}));
		return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(tap((res: any) => {
			console.log('res', res)
			const [{ email }] = res
			console.log('email', email)
			this.updateLocalUser(email)
		}))
	}
	// 退出
	logout() {
		// return this._http.doRequest(ApiEndpoints.LOGOUT, ApiMethod.GET)
		// 	.pipe(tap((response) => {
		// 		Logger.info('User logged out', this.getUser());
		// 		LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'user');
		// 		this.authData.next(null);
		// 		return response;
		// 	}));
		LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'user');
		this.authData.next(null);
	}
	// 注册
	register(registrationData: any) {

	}
	// 修改密码
	changePassword(chgPwData: any) {

	}
	// 忘记密码
	forgotPassword(forgotPwData: any) {

	}

	// 更新本地session信息 
	updateLocalUser(user: any) {
		LocalStorageService.setItem(LocalStorageTypes.SESSION, 'user', user);
		this.authData.next(user);
		return user;
	}

}
