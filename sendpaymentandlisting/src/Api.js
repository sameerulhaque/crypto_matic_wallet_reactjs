import { useState, useEffect } from "react";
import SendTransaction from "./sendtransaction";

const APIKEY = "ckey_1792fc97c979448f83478b90c97";
const ETHADDRESS = "0xB3561B995288d1A2c77b313577035B917c1f672c"

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getInput = async (item, data) => {
    const request = { 
      jsonrpc: "2.0",
      method: "eth_getTransactionByHash",
      params: [item.tx_hash],
      id: 0
    };

    var resnew = await fetch('https://eth-mainnet.alchemyapi.io/v2/cbZXFMR344lti-H77PknXhqM6HsVgOsd', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    })
    .then((response) => response.json())
    .then((res) => {
      console.log("tx_hash: " + item.tx_hash +  ", input: " +res.result.input );
      item.input = res.result.input;
      return item;
    });
    return resnew;
  }

  const getData = async () => {
    const response = await fetch(
      "https://api.covalenthq.com/v1/1/address/" + ETHADDRESS + "/transactions_v2/?match=%7B%22successful%22%3A+true%7D&key=" + APIKEY
    );
    const data = await response.json();
    var i = 0;
    data.data.items.map(async item => 
    {
      item = await getInput(item, data);
      i++;
      if(i === data.data.items.length)
      {
      setItems(data);
      }
    });
    // setItems(data);
  };

  // getData();

  return (
    <div className="apidatas">
      <SendTransaction/>
      {items.data === undefined ? (
              <div>Loading...</div>
            ) : (
           <div>

{items.data.items &&
                      items.data.items.map((values, idx) => {
                        return (
                          <>
                <p>hash: {values.tx_hash}</p>
                <p>input: {values.input}</p>
                </>
                        );
                      })}
             </div>
    
  
                     )}
      <div className="container">
        <div className="row justify-content-center md-3">
          <div className="col-13">
            {items.data === undefined ? (
              <div>Loading...</div>
            ) : (
           <div>
                <table className="table1">
                  <thead>
                    <tr>
                      <th className="tcell1">From address</th>
                      <th className="tcell2">Date</th>
                      <th className="tcell4">#</th>
                    </tr>
                    <tr>
                      <th className="tcell3" colSpan="3">Message</th>
                    </tr>
                    <tr bgcolor="transparent">
                      <th className="tcell6" colSpan="3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.data.items &&
                      items.data.items.map((values, idx) => {
                        return (
                          <>
                          <tr>
                            <td className="tcell1">{values.from_address}</td>
                            <td className="tcell2">{values.block_signed_at}</td>
                            <td className="tcell4">{items.data.items.length - idx}</td>
                          </tr>
                          <tr>
                            <td className="tcell3" colSpan="3"> tx_hash: {values.tx_hash} </td>
                          </tr>

                          <tr bgcolor="transparent">
                            <td className="tcell6" colSpan="3" >
                            
                            </td>
                          </tr>
                          </>
                        );
                      })}
                    {/* <td>{items && items.data.items[0].tx_hash}</td> */}
                  </tbody>
                </table>
              </div>
            )}
          </div>
</div>
      </div>
    </div>
  );
}

export default App;
