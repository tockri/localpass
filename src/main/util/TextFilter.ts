export interface TextFilter {
  in(text: string): string
  out(text: string): string
}
