import "./formData.css";
import { MdClose } from "react-icons/md";
export function FormComponent({handleSubmit,handleOnChange,handleclose,rest}){
    return(
        <div>
             <div className="addcontainer">
              <form onSubmit={handleSubmit}>
                <div className="closebtn" onClick={handleclose}><MdClose /></div>
                <label htmlFor="name">Ingredient Name :</label>
                <input type="text" id="name"
                  name="name" onChange={handleOnChange} value={rest.name}></input>

                <label htmlFor="quantity">Quantity :</label>
                <input type="quantity" id="email"
                  name="quantity" onChange={handleOnChange} value={rest.quantity}></input>

                <label htmlFor="unit">Unit of Measurement :</label>
                <input type="unit" id="unit"
                  name="unit" onChange={handleOnChange} value={rest.unit}></input>

                  <label htmlFor="note">Note :</label>
                <input type="note" id="note"
                  name="note" onChange={handleOnChange} value={rest.note}></input>

                <button>Submit</button>
              </form>
            </div>
        </div>
    )
}