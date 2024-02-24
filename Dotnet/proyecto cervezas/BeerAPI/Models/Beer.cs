using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
// using Microsoft.EntityFramework.Core

namespace BeerAPI.Models
{
  public class Beer
  {
    [Key]
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int year { get;set; }

    public long BrandId {get;set;}
    [ForeignKey(nameof(BrandId))]
    public Brand Brand{ get; set;}
    // public long BrandId {get;set;}
    // [Foreignkey(nameof("BrandId"))] public Brand Brand {get;set;}
  }
}