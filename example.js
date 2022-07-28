import assert from "assert";

/** @type import("./index.ts") */
import {
  detokenize,
  extractPhrases,
  normalize,
  splitSentences,
  tokenize,
} from "./index.js";

const text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어";

// Normalize.
const normalized = normalize(text);

assert.strictEqual(normalized, "한국어를 처리하는 예시입니다ㅋㅋㅋ #한국어");

// Tokenize.
const tokens = tokenize(normalized);

// Tokens have a class, so we must convert them to plain objects before
// comparing them.
assert.deepStrictEqual(tokens.map((t) => ({ ...t })), [
  {
    pos: "Noun",
    text: "한국어",
    offset: 0,
    length: 3,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Josa",
    text: "를",
    offset: 3,
    length: 1,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Space",
    text: " ",
    offset: 4,
    length: 1,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Noun",
    text: "처리",
    offset: 5,
    length: 2,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Verb",
    text: "하는",
    offset: 7,
    length: 2,
    stem: "하다",
    isUnknown: false,
  },
  {
    pos: "Space",
    text: " ",
    offset: 9,
    length: 1,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Noun",
    text: "예시",
    offset: 10,
    length: 2,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Adjective",
    text: "입니다",
    offset: 12,
    length: 3,
    stem: "이다",
    isUnknown: false,
  },
  {
    pos: "KoreanParticle",
    text: "ㅋㅋㅋ",
    offset: 15,
    length: 3,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Space",
    text: " ",
    offset: 18,
    length: 1,
    stem: undefined,
    isUnknown: false,
  },
  {
    pos: "Hashtag",
    text: "#한국어",
    offset: 19,
    length: 4,
    stem: undefined,
    isUnknown: false,
  },
]);

// Detokenize.
const detokenized = detokenize(
  tokens.filter((t) => t.pos !== "Space").map((t) => t.text),
);

assert.strictEqual(detokenized, "한국어를 처리하는 예시 입니다 ㅋㅋㅋ# 한국어");

// Extract phrases.
const phrases = extractPhrases(tokens);

assert.deepStrictEqual(
  phrases.map((p) => ({ ...p, tokens: p.tokens.map((t) => ({ ...t })) })),
  [
    {
      tokens: [
        {
          pos: "Noun",
          text: "한국어",
          offset: 0,
          length: 3,
          stem: undefined,
          isUnknown: false,
        },
      ],
      pos: "Noun",
      offset: 0,
      length: 3,
      text: "한국어",
    },
    {
      tokens: [
        {
          pos: "Noun",
          text: "처리",
          offset: 5,
          length: 2,
          stem: undefined,
          isUnknown: false,
        },
      ],
      pos: "Noun",
      offset: 5,
      length: 2,
      text: "처리",
    },
    {
      tokens: [
        {
          pos: "Noun",
          text: "처리",
          offset: 5,
          length: 2,
          stem: undefined,
          isUnknown: false,
        },
        {
          pos: "Verb",
          text: "하는",
          offset: 7,
          length: 2,
          stem: "하다",
          isUnknown: false,
        },
        {
          pos: "Space",
          text: " ",
          offset: 9,
          length: 1,
          stem: undefined,
          isUnknown: false,
        },
        {
          pos: "Noun",
          text: "예시",
          offset: 10,
          length: 2,
          stem: undefined,
          isUnknown: false,
        },
      ],
      pos: "Noun",
      offset: 5,
      length: 7,
      text: "처리하는 예시",
    },
    {
      tokens: [
        {
          pos: "Noun",
          text: "예시",
          offset: 10,
          length: 2,
          stem: undefined,
          isUnknown: false,
        },
      ],
      pos: "Noun",
      offset: 10,
      length: 2,
      text: "예시",
    },
    {
      tokens: [
        {
          pos: "Hashtag",
          text: "#한국어",
          offset: 19,
          length: 4,
          stem: undefined,
          isUnknown: false,
        },
      ],
      pos: "Hashtag",
      offset: 19,
      length: 4,
      text: "#한국어",
    },
  ],
);
assert.deepStrictEqual(phrases, extractPhrases(normalized));

// Split sentences.
const sentences = splitSentences("안녕! 밥 먹었어?");

assert.deepStrictEqual(sentences.map((s) => ({ ...s })), [
  { text: "안녕!", offset: 0, length: 3 },
  { text: "밥 먹었어?", offset: 4, length: 6 },
]);

console.log("All OK!");
