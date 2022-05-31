import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	authData: BehaviorSubject<RawUser> = new BehaviorSubject<RawUser>(null);

  constructor() { }
  	/**
	 *  是否登录
	 * @returns {boolean}
	 */
  	isAuthenticated() {
		return !!LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user');
	}
	/**
	 * 获取当前用户
	 * @returns {User}
	 */
	getUser() {
		return User.deserialize(LocalStorageService.getItem(LocalStorageTypes.SESSION, 'user'));
	} 
  // 登录
  login(loginData: RawUser) {
		return this._http.doRequest(ApiEndpoints.LOGIN, ApiMethod.POST, loginData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User Logged in', rawUser);
				this.updateLocalUser(rawUser);
			}));
	}
  // 退出
 	logout() {
		return this._http.doRequest(ApiEndpoints.LOGOUT, ApiMethod.GET)
			.pipe(tap((response) => {
				Logger.info('User logged out', this.getUser());
				LocalStorageService.removeItem(LocalStorageTypes.SESSION, 'user');
				this.authData.next(null);
				return response;
			}));
	}
// 注册
  register(registrationData) {
		return this._http.doRequest(ApiEndpoints.REGISTER, ApiMethod.POST, registrationData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User registered', rawUser);
				return this.updateLocalUser(rawUser);
			}));
	}
  // 修改密码
 	changePassword(chgPwData: ChangeUserPassword) {
		return this._http.doRequest(ApiEndpoints.CHANGE_PW, ApiMethod.PUT, chgPwData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User changed password', rawUser);
				return this.updateLocalUser(rawUser);
			}));
	}
 // 忘记密码
  forgotPassword(forgotPwData) {
		return this._http.doRequest(ApiEndpoints.FORGOT, ApiMethod.PUT, forgotPwData)
			.pipe(tap((rawUser: User) => {
				Logger.info('User forgot password', rawUser);
				this.updateLocalUser(rawUser);
			}));
	}
 updateLocalUser(user: User) {
		LocalStorageService.setItem(LocalStorageTypes.SESSION, 'user', user);
		this.authData.next(user);
		return user;
	}
  
}
