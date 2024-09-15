package pe.gob.cusco;

import java.util.HashSet;

public class Main {

  public static void main(String... sss) {

    HashSet<Object> miSet = new HashSet<Object>();

    String s1 = new String("hola");

    String s2 = new String("hola");

    Simple s3 = new Simple("holasimple");

    Simple s4 = new Simple("holasimple");

    miSet.add(s1);

    miSet.add(s2);

    miSet.add(s3);

    miSet.add(s4);

    System.out.println(miSet);

  }

}
