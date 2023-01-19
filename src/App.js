import { useEffect, useRef, useState } from "react";
import style from "./start.module.css";
import axios from "axios";

function App() {
  const nameref = useRef();
  const mailref = useRef();
  const numberref = useRef();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateID, setUpdateId] = useState(0);

  useEffect(() => {
    const getfetch = async () => {
      try {
        const res = await axios.get("http://localhost:2000/");
        setData(res.data);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getfetch();
  }, []);

  const AddHandler = async () => {
    try {
      const sendData = {
        amount: nameref.current.value,
        description: numberref.current.value,
        category: mailref.current.value,
      };
      let res = await axios.post("/add", sendData);
      console.log(res);
      setData([...data, res.data]);
    } catch (e) {
      console.log(e);
    }
  };

  const updatehandler = (id) => {
    setUpdate(true);
    setUpdateId(id);
    const currentItem = data.filter((e) => e.id === id);
    nameref.current.value = currentItem[0].amount;
    numberref.current.value = currentItem[0].description;
    mailref.current.value = currentItem[0].category;
  };

  const updaterequest = async () => {
    const sendData = {
      id: updateID,
      amount: nameref.current.value,
      description: numberref.current.value,
      category: mailref.current.value,
    };
    const res = await axios.patch("/update", sendData);
    const newData = data.map((item) => {
      if (item.id === res.data.id) {
        item.amount = res.data.amount;
        item.description = res.data.description;
        item.category = res.data.category;
        return item;
      }
      return item;
    });
    setData(newData);
  };

  const deletehandler = async (id) => {
    const res = await axios.delete(`/delete/${id}`);
    console.log(res.data);
    const newData = data.filter((e) => e.id !== id);
    setData(newData);
  };

  return (
    <>
      <div className={style.container}>
        <h2 className={style.Title}>Expense Tracker</h2>
        <div>
          <div className={style.row}>
            <label>Amount</label>
            <input
              ref={nameref}
              type={"number"}
              placeholder={"Enter Amount in $ "}
            />
          </div>
          <div className={style.row}>
            <label>Description</label>
            <input
              ref={numberref}
              type={"text"}
              placeholder={"Enter the description"}
            />
          </div>
          <div className={style.row}>
            <label>Category</label>
            <input ref={mailref} list="catrgory" id="choose" />
            <datalist id="catrgory">
              <option value="House"></option>
              <option value="Electricity"></option>
              <option value="Office"></option>
              <option value="Family"></option>
              <option value="Entertainment"></option>
            </datalist>
          </div>
          <div className={style.row}>
            {!update && <button onClick={AddHandler}>Add</button>}
            {update && <button onClick={updaterequest}>Update</button>}
            {update && (
              <button
                onClick={() => {
                  setUpdate(false);
                }}>
                New Request
              </button>
            )}
          </div>
        </div>
      </div>
      {data.length > 0 && (
        <div className={style.container}>
          {data.map((e) => {
            return (
              <div key={e.id} className={style.datarow}>
                <h3>${e.amount}</h3>
                <h4 className={style.expense}>{e.description}</h4>
                <span className={style.category}>{e.category}</span>
                <button onClick={updatehandler.bind(null, e.id)}>Update</button>
                <button onClick={deletehandler.bind(null, e.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
