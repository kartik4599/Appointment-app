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
      } catch (e) {
        console.log(e);
      }
    };
    getfetch();
  }, []);

  const AddHandler = async () => {
    try {
      const sendData = {
        name: nameref.current.value,
        number: numberref.current.value,
        email: mailref.current.value,
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
    nameref.current.value = currentItem[0].name;
    numberref.current.value = currentItem[0].number;
    mailref.current.value = currentItem[0].email;
  };

  const updaterequest = async () => {
    const sendData = {
      id: updateID,
      name: nameref.current.value,
      number: numberref.current.value,
      email: mailref.current.value,
    };
    const res = await axios.patch("/update", sendData);
    const newData = data.map((item) => {
      if (item.id === res.data.id) {
        item.name = res.data.name;
        item.email = res.data.email;
        item.number = res.data.number;
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
        <h2 className={style.Title}>Booking Appointment Site</h2>
        <div>
          <div className={style.row}>
            <label>Name</label>
            <input
              ref={nameref}
              type={"text"}
              placeholder={"Enter your full name"}
            />
          </div>
          <div className={style.row}>
            <label>Phone Number</label>
            <input
              ref={numberref}
              type={"tel"}
              placeholder={"Enter your mobile number"}
            />
          </div>
          <div className={style.row}>
            <label>Phone Number</label>
            <input
              ref={mailref}
              type={"email"}
              placeholder={"Enter your email id"}
            />
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
                <h3>{e.name}</h3>
                <span>{e.email}</span>
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
