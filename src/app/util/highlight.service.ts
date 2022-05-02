import { Injectable } from '@angular/core';

import { highlight, languages} from 'prismjs';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor() { }

  highlightCode(code: string, language: string | undefined) : string {
    return highlight(code, languages['javascript'], 'javascript')
  }
}
