import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import UseAxios from '../utils/UseAxios'
import { Link } from 'react-router-dom' 
import { jwtDecode } from 'jwt-decode'

function Dashboard() {
  const {user} = useContext(AuthContext)
  const [res, setRes] = useState('')
  const api = UseAxios()
  const token = localStorage.getItem('authToken')

  if (token){
    const decode = jwtDecode(token)   // Question: why we met token and not access_token ?
    console.log('token is:', token)
    console.log('decoded token is:', decode)
    var user_id = decode.user_id
    var username = decode.username
    var name = decode.name
    var image = decode.image
  }

  // GET Request
  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get('/test/')
  //       setRes(response.data.msg)
  //     } catch (error) {
  //       setRes("Something went wrong!!")
  //       console.log("Sorry", error)
  //     }
  //   }
  //   fetchData()
  // }, [])


  // POST Request
  useEffect(()=>{
    const fetchPostData = async () => {
      try {
        const response = await api.post('/test/')
        setRes(response.data.msg)
      } catch (error) {
        setRes("Something went wrong")
        console.log(error)
      }
    }
    fetchPostData()
  }, [])



  return (
    <>
      <div className="container-fluid" style={{ paddingTop: "60px" }}>
        <div className="row">

          {/* Left Navigation Bar */}
          <nav className="col-md-2 d-none d-md-block bg-light sidebar mt-4">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link active" to="#">
                    <span data-feather="home" />
                    Dashboard <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file" />
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="shopping-cart" />
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="users" />
                    Customers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="bar-chart-2" />
                    Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="layers" />
                    Integrations
                  </Link>
                </li>
              </ul>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <Link className="d-flex align-items-center text-muted" to="#">
                  <span data-feather="plus-circle" />
                </Link>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text" />
                    Current month
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text" />
                    Last quarter
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text" />
                    Social engagement
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    <span data-feather="file-text" />
                    Year-end sale
                  </Link>
                </li>
              </ul>
            </div>
          </nav>



          {/* Main Dashboard */}
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div className="alert alert-success">{res}</div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">My Dashboard</h1>
              <span>Hello {user.name}!</span>
              <span><img src={`http://127.0.0.1:8000${user.image}`} style={{borderRadius:'50%'}} width="50px" height="50px" /></span>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                  <button className="btn btn-sm btn-outline-secondary">
                    Share
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    Export
                  </button>
                </div>
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar" />
                  This week
                </button>
              </div>
            </div>

            <div> <canvas className="my-4" id="myChart" width={900} height={380} /> </div>

            {/* Table */}
            <h2>Section title</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,001</td>
                    <td>Lorem</td>
                    <td>ipsum</td>
                    <td>dolor</td>
                    <td>sit</td>
                  </tr>
                  <tr>
                    <td>1,002</td>
                    <td>amet</td>
                    <td>consectetur</td>
                    <td>adipiscing</td>
                    <td>elit</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>Integer</td>
                    <td>nec</td>
                    <td>odio</td>
                    <td>Praesent</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>libero</td>
                    <td>Sed</td>
                    <td>cursus</td>
                    <td>ante</td>
                  </tr>
                  <tr>
                    <td>1,004</td>
                    <td>dapibus</td>
                    <td>diam</td>
                    <td>Sed</td>
                    <td>nisi</td>
                  </tr>
                  <tr>
                    <td>1,005</td>
                    <td>Nulla</td>
                    <td>quis</td>
                    <td>sem</td>
                    <td>at</td>
                  </tr>
                  <tr>
                    <td>1,006</td>
                    <td>nibh</td>
                    <td>elementum</td>
                    <td>imperdiet</td>
                    <td>Duis</td>
                  </tr>
                  <tr>
                    <td>1,007</td>
                    <td>sagittis</td>
                    <td>ipsum</td>
                    <td>Praesent</td>
                    <td>mauris</td>
                  </tr>
                  <tr>
                    <td>1,008</td>
                    <td>Fusce</td>
                    <td>nec</td>
                    <td>tellus</td>
                    <td>sed</td>
                  </tr>
                  <tr>
                    <td>1,009</td>
                    <td>augue</td>
                    <td>semper</td>
                    <td>porta</td>
                    <td>Mauris</td>
                  </tr>
                  <tr>
                    <td>1,010</td>
                    <td>massa</td>
                    <td>Vestibulum</td>
                    <td>lacinia</td>
                    <td>arcu</td>
                  </tr>
                  <tr>
                    <td>1,011</td>
                    <td>eget</td>
                    <td>nulla</td>
                    <td>Class</td>
                    <td>aptent</td>
                  </tr>
                  <tr>
                    <td>1,012</td>
                    <td>taciti</td>
                    <td>sociosqu</td>
                    <td>ad</td>
                    <td>litora</td>
                  </tr>
                  <tr>
                    <td>1,013</td>
                    <td>torquent</td>
                    <td>per</td>
                    <td>conubia</td>
                    <td>nostra</td>
                  </tr>
                  <tr>
                    <td>1,014</td>
                    <td>per</td>
                    <td>inceptos</td>
                    <td>himenaeos</td>
                    <td>Curabitur</td>
                  </tr>
                  <tr>
                    <td>1,015</td>
                    <td>sodales</td>
                    <td>ligula</td>
                    <td>in</td>
                    <td>libero</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>

        </div>
      </div>


      {/* Bootstrap core JavaScript
        ================================================== */}
      {/* Placed at the end of the document so the pages load faster */}
      {/* Icons */}
      {/* Graphs */}


    </>
  )
}

export default Dashboard