using System;

namespace Autores.Entities;

public class Autor
{
  public int Id {get;set;}
  public String name {get;set;}
  public List<Book> books {get;set;}
}
