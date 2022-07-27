import assert from "assert";
/** @type import("./index.ts") */
import { Okt } from "./index.js";

const text = "한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어";

// Normalize.
const normalized = Okt.normalize(text);

assert.strictEqual(normalized, "한국어를 처리하는 예시입니다ㅋㅋㅋ #한국어");

// Tokenize.
const tokens = Okt.tokenize(normalized);

// Tokens have a class, so we must convert them to plain objects before
// comparing them.
assert.deepStrictEqual(tokens.map((t) => ({ ...t })), [
  {
    kind: "Noun",
    text: "한국어",
    offset: 0,
    length: 3,
    stem: undefined,
  },
  { kind: "Josa", text: "를", offset: 3, length: 1, stem: undefined },
  {
    kind: "Space",
    text: " ",
    offset: 4,
    length: 1,
    stem: undefined,
  },
  {
    kind: "Noun",
    text: "처리",
    offset: 5,
    length: 2,
    stem: undefined,
  },
  { kind: "Verb", text: "하는", offset: 7, length: 2, stem: "하다" },
  {
    kind: "Space",
    text: " ",
    offset: 9,
    length: 1,
    stem: undefined,
  },
  {
    kind: "Noun",
    text: "예시",
    offset: 10,
    length: 2,
    stem: undefined,
  },
  {
    kind: "Adjective",
    text: "입니다",
    offset: 12,
    length: 3,
    stem: "이다",
  },
  {
    kind: "KoreanParticle",
    text: "ㅋㅋㅋ",
    offset: 15,
    length: 3,
    stem: undefined,
  },
  {
    kind: "Space",
    text: " ",
    offset: 18,
    length: 1,
    stem: undefined,
  },
  {
    kind: "Hashtag",
    text: "#한국어",
    offset: 19,
    length: 4,
    stem: undefined,
  },
]);
