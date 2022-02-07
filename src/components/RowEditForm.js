import { useEffect, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  saveUpdatedItem,
  tableItemInForm,
  tableItemsList,
  tableItenDetails,
} from "../store/actions/tableItemsActions"

function RowEditModal(props) {
  const { rowToEditId, newPost } = props
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tableItenDetails(rowToEditId))
  }, [dispatch, rowToEditId])

  const itemFormInfo = useSelector((store) => store.itemFormInfo)
  const { loading, error, itemInfo } = itemFormInfo

  if (!itemInfo) {
    return null
  }
  const { title, body, userId } = itemInfo

  const editHendler = (e) => {
    e.preventDefault()
    dispatch(tableItemInForm(e.target.attributes.id.value, e.target.value))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!itemInfo.id) {
      itemInfo.id = Math.floor(Math.random() * 1000)
      itemInfo.newItem = true
    }
    dispatch(saveUpdatedItem(itemInfo))
    props.onHide()
  }
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Modal heading
        </Modal.Title>
      </Modal.Header>
      {!loading ? (
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Item Title</Form.Label>
              <Form.Control
                onChange={editHendler}
                value={title}
                id='title'
                placeholder='Enter title'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Item Body</Form.Label>
              <Form.Control
                onChange={editHendler}
                value={body}
                id='body'
                placeholder='Enter body'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Item User ID</Form.Label>
              <Form.Control
                onChange={editHendler}
                value={userId}
                type='number'
                id='userId'
                placeholder='Enter user id'
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      ) : error ? (
        <div>
          <h2>Oop, something went wrong</h2>
        </div>
      ) : (
        <div>
          <h1>Wait...</h1>
        </div>
      )}
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RowEditModal
