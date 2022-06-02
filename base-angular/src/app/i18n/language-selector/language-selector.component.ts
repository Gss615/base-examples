import { Component, OnInit } from '@angular/core';
import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.less']
})
export class LanguageSelectorComponent implements OnInit {

  constructor(
    private i18nService: I18nService

  ) { }

  ngOnInit(): void {
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

}
