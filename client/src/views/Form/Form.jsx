import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import styles from './Form.module.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AllGenres } from '../../redux/actions/actions';
import SecondaryButton from '../../components/buttons/secondaryButton/SecondaryButton';

const validate = (form) =>{
  let errors = {}
  if (!form.name) {
    errors.name = 'Insert a valid name👆🏻'
  } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
    errors.name = 'The name must only contain letters and spaces';
  }
  if (!form.description) {
    errors.description = 'Insert a valid description👆🏻'
  } else if (form.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!form.platforms) {
    errors.platforms = 'Insert a valid platform👆🏻'
  }

  if (!form.image) {
    errors.image = 
    !form.image.includes('https://' || 'http://')
    ? 'Insert a valid URL image👆🏻' 
    : ''
  }
  if (!form.released) {
    errors.released = 'Insert a valid release date👆🏻'
  }
  if (!form.rating) {
    errors.rating = 'Insert a valid rating👆🏻'
  } else if (!/^[1-5]$/.test(form.rating)) {
    errors.rating = 'The rating must be between 1 and 5';
    }
  if (!form.genres.length === 0) {
    errors.genres = 'Select at least one genre👆🏻'
  }
  return errors;
}

const Form = () => {

  const [form, setForm] = useState({
    name: '',
    description: '',
    platforms:'',
    image: '',
    released: '',
    rating: '',
    genres: [],
  })

  // errores en el formularios
  const [errors, setErrors] = useState({
    name: true,
    description: true,
    platforms: true,
    image: true,
    released: true,
    rating: true,
    genres: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/videogames', form)
      .then(res=>alert('Game created successfully'))
      .catch(err=>alert('Please fill in all the fields'));
    setForm({
      name: '',
      description: '',
      platforms:'',
      image: '',
      released: '',
      rating: '',
      genres: [],
    })
  }

  const handlerInputChange= (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...form, 
      [e.target.name]: e.target.value,
    }))
  }

  const dispatch = useDispatch()
  const genres = useSelector(state => state.genres)

  useEffect(()=>{
    dispatch(AllGenres())
  }, [dispatch])

  const handlerGenres = (event)=> {
    if (!form.genres.includes(event.target.value)) {
      setForm({
        ...form,
        genres: [...form.genres, event.target.value]
      })
      setErrors(validate({
        ...form, 
        genres: [...form.genres, event.target.value],
      }))
    } 
  }

  return (
    <div className={styles.formContainer}>

      <form onSubmit={(e)=> handleSubmit(e)}>
        <section>
          <label htmlFor="name">Name: </label>
          <input 
            type="text"
            name="name"
            value={form.name}
            onChange={handlerInputChange}
          />
        </section>
          {
            errors.name && (<p>{errors.name}</p>)
          }

        <section>
          <label htmlFor="description">Description: </label>
          <input 
            type="text"
            name="description"
            onChange={handlerInputChange}
            value={form.description}
          />
        </section>
          {
            errors.description && (<p>{errors.description}</p>)
          }

        <section>
          <label htmlFor="platforms">Platforms: </label>
          <input 
            type="text"
            name="platforms"
            onChange={handlerInputChange}
            value={form.platforms}
          />
        </section>
          {
            errors.platforms && (<p>{errors.platforms}</p>)
          }

        <section>
          <label htmlFor="image">Image link: </label>
          <input 
            type="url"
            name="image"
            onChange={handlerInputChange}
            value={form.image}
          />
        </section>
          {
            errors.image && (<p>{errors.image}</p>)
          }
        
        <section>
          <label htmlFor="released">Released: </label>
          <input 
            type="date"
            name="released"
            onChange={handlerInputChange}
            value={form.released}
          />
        </section>
          {
            errors.released && (<p>{errors.released}</p>)
          }

        <section>
          <label htmlFor="rating">Rating: </label>
          <input 
            type="number"
            name="rating"
            onChange={handlerInputChange}
            value={form.rating}
          />
        </section>
          {
            errors.rating && (<p>{errors.rating}</p>)
          }

        <section>
          <label htmlFor="genres">Genres: </label>
          <select onChange={(e)=> handlerGenres(e)} defaultValue='default'>
            <option value="default" disabled >Select Genre</option>
            {
              genres?.map((genre, index) => (
                <option key={index} value={genre.name}>
                  {genre.name}
                </option>
              ))
            }
          </select>
        </section>
          {errors.genres && (<p>{errors.genres}</p>)}
        <SecondaryButton>
          Create Videogame
        </SecondaryButton>
        {/* <button type="submit">Create Videogame</button> */}
      </form>
    </div>
  )
}

export default Form