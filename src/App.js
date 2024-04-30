
import { useEffect, useState } from 'react';
import './App.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { FormComponent } from './component/formData/formData';

axios.defaults.baseURL = "http://localhost:2000/"

function App() {

  const [addPopUp, setAddPopUp] = useState(false)
  const [editPopUp, setEditPopUP] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: " ",
    note: " "
  })

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    quantity: "",
    unit: " ",
    note: " ",
    _id: ""
  })
  const [dataList, setDataList] = useState([])


  const handleOnChange = (event) => {
    const { value, name } = event.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })

  }

  //function for creating data
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {
      setAddPopUp(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name: "",
        quantity: "",
        unit: " ",
        note: " "
      })
    }
  }
  //function for getting data
  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])


  //function for delete data
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)

    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }

  //function for update
  const handleUpdate = async (event) => {
    event.preventDefault()
    const data = await axios.put("/update", formDataEdit)

    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
      setEditPopUP(false)
    }
  }
  const handleEditOnChange = async (event) => {
    const { value, name } = event.target
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditPopUP(true)
  }
  return (
    <div>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Ingredient Management</h1>
        <button className=" bttn bttn add" onClick={() => setAddPopUp(true)}><IoIosAddCircleOutline />&nbsp;Add Ingredient</button>

        {
          addPopUp && (
            <FormComponent
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleclose={() => setAddPopUp(false)}
              rest={formData}></FormComponent>
          )
        }
        {
          editPopUp && (
            <FormComponent
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleclose={() => setEditPopUP(false)}
              rest={formDataEdit}></FormComponent>
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Ingredient Name</th>
                <th>Quantity</th>
                <th>Unit of Measurement</th>
                <th>Note</th>
                <th>Actions</th>

              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  console.log(el)
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.unit}</td>
                      <td>{el.note}</td>
                      <td>
                        <button className='bttn bttn-edit' onClick={() => handleEdit(el)} >Edit</button>
                        <button className='bttn bttn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <p style={{ alignItems: "center" }}>No Data</p>
              )
              }
            </tbody>
          </table>
        </div>


      </div>

    </div>
  );
}

export default App;
