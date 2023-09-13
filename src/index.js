import { Okt } from "../target/scala-2.13/oktjs-opt/main.js";

export const {
  detokenize,
  extractPhrases,
  init,
  normalize,
  splitSentences,
  tokenize,
  tokenizeTopN,
} = Okt;
