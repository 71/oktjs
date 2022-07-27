package org.openkoreantext.processor.util

import scala.scalajs.js.Set
import scala.jdk.CollectionConverters._

class CharArraySet(val set: Set[String] = new Set()) {
  def this(capacity: Int) = this()

  def contains(element: CharSequence): Boolean = set.contains(element.toString)
  def add(element: CharSequence): Boolean = set.add(element.toString)
  def addAll(elements: java.lang.Iterable[String]): Boolean = elements.asScala.count(set.add(_)) > 0
  def removeAll(elements: java.lang.Iterable[String]): Boolean = elements.asScala.count(set.remove(_)) > 0
}
