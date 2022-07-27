export { KoreanToken, Okt } from "./target/scala-2.13/oktjs-opt/main.js";

declare module "./target/scala-2.13/oktjs-opt/main.js" {
  const enum KoreanPos {
    // Word leved POS
    Noun = "Noun",
    Verb = "Verb",
    Adjective = "Adjective",
    Adverb = "Adverb",
    Determiner = "Determiner",
    Exclamation = "Exclamation",
    Josa = "Josa",
    Eomi = "Eomi",
    PreEomi = "PreEomi",
    Conjunction = "Conjunction",
    Modifier = "Modifier",
    VerbPrefix = "VerbPrefix",
    Suffix = "Suffix",
    Unknown = "Unknown",

    // Chunk level POS
    Korean = "Korean",
    Foreign = "Foreign",
    Number = "Number",
    KoreanParticle = "KoreanParticle",
    Alpha = "Alpha",
    Punctuation = "Punctuation",
    Hashtag = "Hashtag",
    ScreenName = "ScreenName",
    Email = "Email",
    URL = "URL",
    CashTag = "CashTag",

    // Functional POS
    Space = "Space",
    Others = "Others",
  }

  class KoreanToken<Pos extends KoreanPos = KoreanPos> {
    /**
     * Korean Part-Of-Speech.
     */
    readonly pos: Pos;
    readonly text: string;
    readonly offset: number;
    readonly length: number;
    readonly stem: Pos extends never ? string | undefined : undefined;
  }

  namespace Okt {
    function normalize(text: string): string;
    function tokenize(text: string): KoreanToken[];
  }
}
