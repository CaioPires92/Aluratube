import { createClient } from '@supabase/supabase-js'
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

const PROJECT_URL = 'https://ygtrrochpmjzeslzkpcw.supabase.co'
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndHJyb2NocG1qemVzbHprcGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODkwMDQsImV4cCI6MTk4Mzg2NTAwNH0.JukOeDyk3rUkoD4xZYxRiGdTWXBWfRLXgqxiC7naOfM'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: 'Frost punk',
      url: 'https://www.youtube.com/watch?v=QsqatJxAUtk'
    }
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

            supabase
              .from('video')
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: 'jogos'
              })
              .then(oqueVeio => {
                console.log(formCadastro.values.url)
              })
              .catch(err => {
                console.log(err)
              })

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
