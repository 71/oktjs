/**
 * The part-of-speech of a {@link KoreanToken Korean token}.
 */
export const enum KoreanPos {
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

/**
 * A token extracted by {@link tokenize}.
 */
export interface KoreanToken<Pos extends KoreanPos = KoreanPos> {
  /**
   * Korean {@link KoreanPos part-of-speech}.
   */
  readonly pos: Pos;
  /**
   * The text which makes up the token.
   */
  readonly text: string;
  /**
   * The offset from the start of the input string where the token starts.
   */
  readonly offset: number;
  /**
   * The length of the token, equivalent to `text.length`.
   */
  readonly length: number;
  /**
   * The stem of the adjective, adverb, or verb represented by the token.
   */
  readonly stem: Pos extends
    KoreanPos.Adjective | KoreanPos.Adverb | KoreanPos.Verb
    ? string | undefined
    : undefined;
}

/**
 * A sentence extracted by {@link splitSentences}.
 */
export interface KoreanSentence {
  /**
   * The text which makes up the sentence.
   */
  readonly text: string;
  /**
   * The offset from the start of the input string where the sentence starts.
   */
  readonly offset: number;
  /**
   * The length of the sentence, equivalent to `text.length`.
   */
  readonly length: number;
}

/**
 * A phrase extracted by {@link extractPhrases}.
 */
export interface KoreanPhrase {
  /**
   * The {@link KoreanToken tokens} making up the phrase.
   */
  readonly tokens: KoreanToken[];
  /**
   * The {@link KoreanPos part-of-speech} of the phrase in its sentence.
   */
  readonly pos: KoreanPos;
  /**
   * The text which makes up the phrase, equal to the concatenation of all of
   * its tokens.
   */
  readonly text: string;
  /**
   * The offset from the start of the input string where the phrase starts.
   */
  readonly offset: number;
  /**
   * The length of the phrase, equivalent to `text.length`.
   */
  readonly length: number;
}

/**
 * Options given to {@link extractPhrases}.
 */
export interface ExtractPhrasesOptions {
  readonly filterSpam?: boolean;
  readonly enableHashtags?: boolean;
}

/**
 * Initializes the Open Korean Text API.
 *
 * Calling this function is not necessary as the initialization will be
 * performed automatically, but some users may wish to initialize the API
 * when they choose to do so.
 */
export function init(): void;

/**
 * Normalizes the given text for further processing by e.g.
 * {@link tokenize}.
 */
export function normalize(text: string): string;

/**
 * Tokenizes the given text into a sequence of {@link KoreanToken tokens},
 * which include {@link KoreanPos part-of-speech} information.
 */
export function tokenize(text: string): KoreanToken[];

/**
 * Same as {@link tokenize}, but returns the top `n` candidates instead of
 * the single best candidate.
 */
export function tokenizeTopN(text: string, n: number): KoreanToken[][];

/**
 * Transforms a list of strings back into a string.
 */
export function detokenize(tokens: Iterable<string>): string;

/**
 * Splits the given text into a sequence of
 * {@link KoreanSentence sentences}.
 */
export function splitSentences(text: string): KoreanSentence[];

/**
 * Extracts the {@link KoreanPhrase phrases} in the given text.
 */
export function extractPhrases(
  text: string,
  options?: ExtractPhrasesOptions,
): KoreanPhrase[];

/**
 * Extracts the {@link KoreanPhrase phrases} in the given
 * {@link KoreanToken tokens}.
 */
export function extractPhrases(
  tokens: Iterable<KoreanToken>,
  options?: ExtractPhrasesOptions,
): KoreanPhrase[];
