import React, { useState, useEffect } from "react"
import { Placeholder } from "react-bootstrap"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getPhotos } from "../../store/actions/photosAction"

const Gallery = () => {
  const [textToSearch, setTextToSearch] = useState("")
  const dispatch = useDispatch()

  const photosInfo = useSelector((state) => state.photosList)
  const { loading, error, photos} = photosInfo

  function handleChange(e) {
    e.preventDefault()
    setTextToSearch(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getPhotos(textToSearch))
  }
  return (
    <div className='container mt-5'>
      <div className='search-photos-input'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Control
              placeholder='Search photos'
              onChange={handleChange}
              value={textToSearch}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </Form>
      </div>
      {error && (
            <div>
                <h1>Opp something went wrong</h1>
            </div>
        )}
      {loading && (
            <div>
                <h1>Please wait</h1>
            </div>
        )}
      <div id='gallery-images'>
        {photos && photos.length
          ? photos.map((image) => (
              <div key={image.id} >
                <img
                  src={image.links.download}
                  alt={image.alt_description}
                  style={{ width: "200px", height: "250px" }}
                />
              </div>
            ))
          : [...Array(20)].map((x, i) => (
              <div className='search-photos-loader'>
                <Placeholder as='p' animation='glow'>
                  <Placeholder xs={12} />
                </Placeholder>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Gallery
