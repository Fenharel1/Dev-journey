using System;
using System.ComponentModel.DataAnnotations;

namespace Autores.Validators;

public class FirstCapitalAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if(String.IsNullOrEmpty(value.ToString())){
          return ValidationResult.Success;
        }

        if(value.ToString()[0].ToString() != value.ToString()[0].ToString().ToUpper()){
          return new ValidationResult("La primera letra debe ser mayuscula");
        }

        return ValidationResult.Success;
    }
}
