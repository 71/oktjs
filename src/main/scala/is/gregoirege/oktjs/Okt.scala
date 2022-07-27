package is.gregoirege.oktjs

import org.openkoreantext.processor.OpenKoreanTextProcessor
import org.openkoreantext.processor.phrase_extractor.KoreanPhraseExtractor.KoreanPhrase
import org.openkoreantext.processor.tokenizer.KoreanTokenizer
import scala.scalajs.js
import scala.scalajs.js.annotation.JSExportTopLevel
import js.JSConverters._

@JSExportTopLevel("KoreanToken")
class KoreanToken(inner: KoreanTokenizer.KoreanToken) extends js.Object {
  val kind = inner.pos.toString
  val text = inner.text
  val offset = inner.offset
  val length = inner.length
  val stem = inner.stem.orUndefined
}

@JSExportTopLevel("Okt")
object Okt extends js.Object {
  def normalize(text: String): String =
    OpenKoreanTextProcessor.normalize(text).toString

  def tokenize(text: String): js.Array[KoreanToken] =
    OpenKoreanTextProcessor.tokenize(text).map(new KoreanToken(_)).toJSArray
}

object Main {
  def main(args: Array[String]) =
    println(OpenKoreanTextProcessor.tokenize("한국어를 처리하는 예시입니닼ㅋㅋㅋㅋㅋ #한국어"))
}
