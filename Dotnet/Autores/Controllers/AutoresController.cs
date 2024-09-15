using Autores.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Autores.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class AutoresController : ControllerBase
  {
    private readonly AppDbContext context;

    public AutoresController(AppDbContext appDbContext)
    {
      context = appDbContext;
    }


    [HttpGet("[action]")]
    public async Task<ActionResult<List<Autor>>> getAutores()
    {
      return await context.Autor.ToListAsync();
    }

    [HttpPost("[action]")]
    public async Task<ActionResult> createAutor(Autor autor)
    {
      context.Autor.Add(autor);
      await context.SaveChangesAsync();
      return Ok();
    }

  }
}