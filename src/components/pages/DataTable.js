import React, { useState, useEffect } from "react"
import Pagination from "../Pagination"
import { Button, ButtonGroup, Card, Table } from "react-bootstrap"
import { Placeholder } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  rowItemDelete,
  tableItemsList,
} from "../../store/actions/tableItemsActions"
import RowEditModal from "../RowEditForm"

const DataTable = ({ location, history }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [modalShow, setModalShow] = useState(false)
  const [newPost, setNewPost] = useState(false)
  const [sorted, setSorted] = useState(false)
  let [mainCurrent, setMainCurrent] = useState(101)
  const [rowToEditId, setRowToEditId] = useState(0)
  const [postsPerPage] = useState(10)
  const dispatch = useDispatch()
  const tableItemsListInfo = useSelector((state) => state.tableItems)
  const { loading, error, tableItems } = tableItemsListInfo

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = tableItems.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const openEditModal = (itemId) => {
    let newVal = mainCurrent++
    setMainCurrent(newVal)
    setRowToEditId(itemId)
    setNewPost(true)
    setModalShow(true)
  }
  const sortItems = () => {
    sorted
      ? tableItems.sort((a, b) => {
          return Number(a.userId) - Number(b.userId)
        })
      : tableItems.sort((a, b) => {
          return Number(b.userId) - Number(a.userId)
        })
    setSorted(!sorted)
    paginate(1)
  }

  useEffect(() => {
    dispatch(tableItemsList())
  }, [dispatch])

  const deleteHendler = (id) => {
    dispatch(rowItemDelete(id))
  }

  return (
    <div className='container mt-5'>
      {error && (
        <div>
          <h1>Opp something went wrong</h1>
        </div>
      )}
      {loading && (
        <div>
          <h1>Wait...</h1>
        </div>
      )}
      <div>
        <ButtonGroup size='lg' className='mb-2'>
          <Button
            onClick={() => openEditModal(Math.floor(Math.random() * 1000))}
          >
            Add Post
          </Button>
          <Button variant={sorted ? "" : "secondary"} onClick={sortItems}>
            Sort By User Id
          </Button>
        </ButtonGroup>
        <br />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>User Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length
            ? currentPosts.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td>{item.userId}</td>
                  <td id='eddel'>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => openEditModal(item.id)}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHendler(item.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))
            : [...Array(50)].map((x) => (
                <tr key={x}>
                  <td>
                    <Placeholder as={Card.Text} animation='glow'>
                      <Placeholder xs={7} /> <Placeholder xs={4} />
                    </Placeholder>
                  </td>
                  <td>
                    <Placeholder as={Card.Text} animation='glow'>
                      <Placeholder xs={7} /> <Placeholder xs={4} />
                    </Placeholder>
                  </td>
                  <td>
                    <Placeholder as={Card.Text} animation='glow'>
                      <Placeholder xs={7} /> <Placeholder xs={4} />
                    </Placeholder>
                  </td>
                  <td>
                    <Placeholder as={Card.Text} animation='glow'>
                      <Placeholder xs={7} /> <Placeholder xs={4} />
                    </Placeholder>
                  </td>
                  <td>
                    <Placeholder as={Card.Text} animation='glow'>
                      <Placeholder xs={7} /> <Placeholder xs={4} />
                    </Placeholder>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={tableItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <RowEditModal
        show={modalShow}
        rowToEditId={rowToEditId}
        newPost={newPost}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default DataTable
