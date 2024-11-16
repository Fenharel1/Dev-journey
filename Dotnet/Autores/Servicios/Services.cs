using System;

namespace Autores.Servicios;

public interface IService {
  void doSomething();
}

public class ServiceA : IService
{
  private readonly ILogger<ServiceA> logger;

  public ServiceA (ILogger<ServiceA> logger) {
    this.logger = logger;
  }

  public void doSomething(){
    logger.LogInformation("Hola mundo aca haciendo algo");
  }

}

public class ServiceTransient {
  public Guid guid = Guid.NewGuid();
}

public class ServiceSingleton {
  public Guid guid = Guid.NewGuid();
}

public class ServiceScoped {
  public Guid guid = Guid.NewGuid();
}
