import React from 'react'
import { StyledRegisterVideo } from './styles'

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)

  return {
    values,
    handleChange: e => {
      console.log(e.target)
      const value = e.target.value
      const name = e.target.name
      console.log(e.target.name)
      setValues({ ...values, [name]: value })
    },
    clearForm() {
      setValues({})
    }
  }
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: 'Frost punk', url: 'https://youtube...' }
  })
  const [formVisivel, setFormVisivel] = React.useState(true)

  return (
    <StyledRegisterVideo>
      <button
        type="button"
        className="add-video"
        onClick={() => setFormVisivel(true)}
      >
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(formCadastro.values)
            setFormVisivel(false)
            formCadastro.clearForm()
          }}
        >
          <div>
            <button
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do video"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  )
}
