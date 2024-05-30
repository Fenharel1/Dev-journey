import {useForm} from 'react-hook-form'

export const App = () => {
  
  const {register, handleSubmit, formState: { errors }, watch , setValue} = useForm();

  console.log(errors)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    console.log({...register("empty")})
  })

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input type="text" {...register("nombre",{
        required: {value: true, message: "El nombre es requerido"},
        minLength: {value: 2, message: "El nombre debe ser mayor a 2"},
      })} />
      { errors.nombre && <span>{errors.nombre.message}</span>}

      <label htmlFor="correo">Correo</label>
      <input type="email" {...register("email",{
        required: {value: true, message: "El correo es requerido"},
        pattern: {
          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: "Correo invalido"
        }
      })}/>
      { errors.email && <span>{errors.email.message}</span>}

      <label htmlFor="password">Password</label>
      <input type="password" {...register("password",{
        required: true
      })} />

      <label htmlFor="confirmPassword">Confirmar password</label>
      <input type="password" {...register("confirmarPassword", {
        required: {value: true, message: "Requerido"},
        validate: val => val === watch("password") || "Las passwords no coinciden"
      })} />
      { errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>}
      

      <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
      <input type="date" {...register("fechaNacimiento", {
        required: true
      })}/>

      <label htmlFor="pais">Pais</label>
      <select {...register("pais")}>
        <option value="mx">Mexico</option>
        <option value="pe">Peru</option>
        <option value="co">Colombia</option>
      </select>

      <label htmlFor="file">Foto de perfil</label>
      <input type="file" {...register("foto")} />

      <label htmlFor="terminos">Acepto terminos y condiciones</label>
      <input type="checkbox" {...register("terminos",{
        required: true
      })} />

      <button>enviar</button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>

    </form>
  )
}
