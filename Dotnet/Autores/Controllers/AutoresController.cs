using Autores.Entities;
using Autores.Servicios;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Autores.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class AutoresController : ControllerBase
  {
    private readonly AppDbContext context;

    private readonly IService service;

    public ServiceTransient ServiceTransient { get; }
    public ServiceScoped serviceScoped { get; }
    public ServiceSingleton serviceSingleton { get; }

    public AutoresController(AppDbContext appDbContext, IService service, ServiceTransient serviceTransient, ServiceScoped serviceScoped, ServiceSingleton serviceSingleton)
    {
      context = appDbContext;
      this.service = service;
      ServiceTransient = serviceTransient;
      this.serviceScoped = serviceScoped;
      this.serviceSingleton = serviceSingleton;
    }


    [HttpGet("[action]")]
    public ActionResult getGuids(){
      return Ok(new {
        transient = ServiceTransient.guid,
        scoped = serviceScoped.guid,
        singleton = serviceSingleton.guid
      });
    }



    [HttpGet("[action]")]
    public async Task<ActionResult<Autor>> firstAuthor(){
      return await context.Autor.FirstOrDefaultAsync();
    }

    [HttpPost("[action]")]
    public String greetings([FromBody] String name){
      service.doSomething();
      return "Hello " + name; 
    }

    [HttpGet("[action]")]
    public async Task<ActionResult<List<Autor>>> getAutores()
    {
      return await context.Autor.Include(a => a.books).ToListAsync();
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