import {Component, OnInit} from '@angular/core';
import {LazyLoadScriptService} from './lazyloadscript.service';
import {scripts} from './scripts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  constructor(private lazyLoadService: LazyLoadScriptService) {
  }

  ngOnInit() {
    for (const scriptUrl of scripts) {
      this.lazyLoadService.loadScript(scriptUrl);
    }
  }
}

