import { Injectable } from '@angular/core';

import { highlight, languages} from 'prismjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor() { }

  highlightCode(code: string, language: string) : string {
    console.log(languages['html'])
    return highlight(code, languages[language], language)
  }
}
