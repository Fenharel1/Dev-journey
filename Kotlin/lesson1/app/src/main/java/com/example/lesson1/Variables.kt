package com.example.lesson1

// Variables
fun main() {
  var readOnly: List<String> = listOf("papa","maiz","zanahoria")

  var example = readOnly.filter{ it.contains("i") }
  println(example)
}
