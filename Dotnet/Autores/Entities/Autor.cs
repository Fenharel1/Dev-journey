using System;
using System.ComponentModel.DataAnnotations;
using Autores.Validators;

namespace Autores.Entities;

public class Autor
{
  public int Id {get;set;}
  [Required(ErrorMessage = "Este campo es requeridisimo")]
  [FirstCapital]
  public String name {get;set;}
  public List<Book> books {get;set;}
}
