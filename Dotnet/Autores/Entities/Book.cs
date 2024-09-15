using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Autores.Entities;

public class Book
{
  public int Id {get;set;}
  public String Title { get; set; }
  public int AutorId { get; set; }
  public Autor Autor {get;set;}

}
