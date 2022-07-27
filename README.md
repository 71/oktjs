# oktjs

Port of [Open Korean Text](https://github.com/open-korean-text/open-korean-text)
to JavaScript; it has no external dependencies, and runs in the browser.

Note that a modern browser with support for
[ES2018 RegExp unicode escapes](https://caniuse.com/mdn-javascript_builtins_regexp_property_escapes)
is [necessary](https://www.scala-js.org/doc/regular-expressions.html).

## Building

To build Oktjs, the following must be installed:

- A JDK.
- [`sbt`](https://www.scala-sbt.org/) to compile the Scala code.
- [`yarn`](https://yarnpkg.com/) to fetch dependencies and bundle the JavaScript
  code.

Then, `yarn` can be used:

```bash
$ yarn build
```

## Details

Oktjs uses [Scala.js](https://www.scala-js.org/) to compile Open Korean Text to
JavaScript, so it is cloned as a submodule to use its sources. A few changes are
required to make it work with JavaScript:

- [`open-korean-text/src/main/scala/org/openkoreantext/processor/util/KoreanDictionaryProvider.scala`](open-korean-text/src/main/scala/org/openkoreantext/processor/util/KoreanDictionaryProvider.scala)
  is replaced by
  [a shim](src/main/scala/org/openkoreantext/processor/util/KoreanDictionaryProviderShim.scala).
  - The shim uses [`resources.js`](resources.js) instead of embedded resources
    to load dictionaries.
  - `resources.js` embeds `resources.json.gz` using
    [`esbuild`](https://esbuild.github.io/content-types/#binary).
  - `resources.json.gz` is generated by
    [`resources.json.gz.build.js`](resources.json.gz.build.js), which reads
    resources in
    [`open-korean-text/src/main/resources/org/openkoreantext/processor/util`](open-korean-text/src/main/resources/org/openkoreantext/processor/util)
    and writes them to a JSON file, which is then gzipped.
- [A minimal shim](src/main/scala/com/twitter/Regex.scala) of
  [Twitter Text](https://github.com/twitter/twitter-text) is provided.
- [A minimal shim](src/main/scala/org/openkoreantext/processor/util/CharArraySet.scala)
  of `CharArraySet` is provided.
- A Scala.js wrapper for the Open Korean Text API is written in
  [`Okt.scala`](src/main/scala/is/gregoirege/oktjs/Okt.scala) and then
  re-exported with types by [`index.ts`](index.ts).
