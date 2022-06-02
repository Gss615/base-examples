import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import enUS from '../../translations/en-US.json';
import frFR from '../../translations/fr-FR.json';


const languageKey = 'language';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  defaultLanguage!: string;
  supportedLanguages!: string[];

  private langChangeSubscription!: Subscription;


  constructor(
    private translateService: TranslateService
  ) {
    // 嵌入语言避免额外的http请求
    translateService.setTranslation('en-US', enUS);
    translateService.setTranslation('fr-FR', frFR);
  }

  // 初始化 i18n
  init(defaultLanguage: string, supportedLanguages: string[]) {
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.language = '';

    //  此订阅在应用的生命周期内始终处于活动状态
    this.langChangeSubscription = this.translateService.onLangChange
      .subscribe((event: LangChangeEvent) => { localStorage.setItem(languageKey, event.lang); });
  }
  /**
   * 清理语言更改订阅
   */
   destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
  set language(language: string) {
    // 设置语言优先级：传入=>stroage储存=>浏览器默认配置=>空
    let newLanguage = language || localStorage.getItem(languageKey) || this.translateService.getBrowserCultureLang() || '';
    let isSupportedLanguage = this.supportedLanguages.includes(newLanguage);

    // 如果不支持该语言，就模糊匹配一下
    if (newLanguage && !isSupportedLanguage) {
      newLanguage = newLanguage.split('-')[0];
      newLanguage = this.supportedLanguages.find(supportedLanguage => supportedLanguage.startsWith(newLanguage)) || '';
      isSupportedLanguage = Boolean(newLanguage);
    }

    // 如果不支持该语言，则使用默认语言
    if (!newLanguage || !isSupportedLanguage) {
      newLanguage = this.defaultLanguage;
    }

    language = newLanguage;

    this.translateService.use(language);
  }

  /**
   * 获取当前语言
   */
  get language(): string {
    return this.translateService.currentLang;
  }
}
