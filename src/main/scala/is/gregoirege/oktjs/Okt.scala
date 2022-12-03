package is.gregoirege.oktjs

import org.openkoreantext.processor.OpenKoreanTextProcessor
import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor
import org.openkoreantext.processor.stemmer.KoreanStemmer
import org.openkoreantext.processor.tokenizer.{KoreanTokenizer, Sentence}
import org.openkoreantext.processor.util.KoreanPos
import scala.scalajs.js
import scala.scalajs.js.annotation.JSExportTopLevel
import js.JSConverters._

@JSExportTopLevel("KoreanToken")
class KoreanToken(inner: KoreanTokenizer.KoreanToken) extends js.Object {
  val pos = inner.pos.toString
  val text = inner.text
  val offset = inner.offset
  val length = inner.length
  val stem = inner.stem.orUndefined
  val isUnknown = inner.unknown
}

@JSExportTopLevel("KoreanSentence")
class KoreanSentence(inner: Sentence) extends js.Object {
  val text = inner.text
  val offset = inner.start
  val length = inner.end - inner.start
}

@JSExportTopLevel("KoreanPhrase")
class KoreanPhrase(inner: KoreanPhraseExtractor.KoreanPhrase) extends js.Object {
  val tokens = inner.tokens.map(new KoreanToken(_)).toJSArray
  val pos = inner.pos.toString
  val offset = inner.offset
  val length = inner.length
  val text = inner.text
}

@JSExportTopLevel("Okt")
object Okt extends js.Object {
  trait ExtractPhrasesOptions extends js.Object {
    val filterSpam: js.UndefOr[Boolean] = js.undefined
    val enableHashtags: js.UndefOr[Boolean] = js.undefined
  }

  def init() =
    OpenKoreanTextProcessor.loadResources()

  def normalize(text: String): String =
    OpenKoreanTextProcessor.normalize(text).toString

  def tokenize(text: String): js.Array[KoreanToken] =
    OpenKoreanTextProcessor.tokenize(text).map(new KoreanToken(_)).toJSArray

  def tokenizeTopN(text: String, n: Int): js.Array[js.Array[js.Array[KoreanToken]]] =
    OpenKoreanTextProcessor.tokenizeTopN(text, n)
      .map(_.map(KoreanStemmer.stem(_).map(new KoreanToken(_)).toJSArray).toJSArray)
      .toJSArray

  def detokenize(tokens: js.Iterable[String]): String =
    OpenKoreanTextProcessor.detokenize(tokens)

  def splitSentences(text: String): js.Array[KoreanSentence] =
    OpenKoreanTextProcessor.splitSentences(text).map(new KoreanSentence(_)).toJSArray

  def extractPhrases(text: String,
                     options: js.UndefOr[ExtractPhrasesOptions]): js.Array[KoreanPhrase] = {
    val tokens = OpenKoreanTextProcessor.tokenize(text)
    val filterSpam = options.flatMap(_.filterSpam).getOrElse(false)
    val enableHashtags = options.flatMap(_.enableHashtags).getOrElse(true)

    OpenKoreanTextProcessor.extractPhrases(tokens, filterSpam, enableHashtags)
      .map(new KoreanPhrase(_))
      .toJSArray
  }

  def extractPhrases(tokens: js.Iterable[KoreanToken],
                     options: js.UndefOr[ExtractPhrasesOptions]): js.Array[KoreanPhrase] = {
    def toNativeKoreanToken(t: KoreanToken): KoreanTokenizer.KoreanToken =
      KoreanTokenizer.KoreanToken(
        t.text, KoreanPos.withName(t.pos), t.offset, t.length, t.stem.toOption, t.isUnknown)

    val nativeTokens = tokens.map(toNativeKoreanToken).toSeq
    val filterSpam = options.flatMap(_.filterSpam).getOrElse(false)
    val enableHashtags = options.flatMap(_.enableHashtags).getOrElse(true)

    OpenKoreanTextProcessor.extractPhrases(nativeTokens, filterSpam, enableHashtags)
      .map(new KoreanPhrase(_))
      .toJSArray
  }
}
