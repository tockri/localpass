import { TextFilter } from '../util/TextFilter'

export class MockTextFilter implements TextFilter {
  in(text: string): string {
    return 'encoded:' + text
  }

  out(text: string): string {
    return text.substring(8)
  }
}
