import org.scalajs.linker.interface.ESVersion

ThisBuild / scalaVersion     := "2.13.1"
ThisBuild / version          := "0.1.0-SNAPSHOT"
ThisBuild / organization     := "is.gregoirege"
ThisBuild / organizationName := "gregoiregeis"

lazy val root = (project in file("."))
  .settings(
    name := "oktjs",
  )

Compile / unmanagedSourceDirectories += baseDirectory.value / "open-korean-text/src/main/scala"
Compile / unmanagedResourceDirectories += baseDirectory.value / "open-korean-text/src/main/resources"
Compile / unmanagedSources / excludeFilter := "KoreanDictionaryProvider.scala"

enablePlugins(ScalaJSPlugin)

scalaJSLinkerConfig ~= { _.withModuleKind(ModuleKind.ESModule) }
scalaJSLinkerConfig ~= { _.withESFeatures(_.withESVersion(ESVersion.ES2021)) }
