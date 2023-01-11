import React from "react";
import "./App.css";
import PaginationPage from "./Pagination/index";
import { Table } from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      totalUsers: 0,
    };
  }
  nextpage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
      users: [],
    });
    this.getUsers(pageNumber);
  };
  tenChange = (pageNumber, isposOrneg) => {
    var finalPage;
    if (isposOrneg > 0) finalPage = pageNumber + 10;
    else finalPage = pageNumber - 10;
    this.setState({
      currentPage: finalPage,
      users: [],
    });
    this.getUsers(finalPage);
  };

  dataRequest = (URL, methodType, params) => {
    return fetch(URL, {
      method: methodType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return err;
      });
  };
  getUsers = (currentPage) => {
    const queryParams = {};
    queryParams["page"] = currentPage; //Page Number
    queryParams["pagination"] = 8; //Number Of records on Page
    this.dataRequest("http://localhost:5000/getUsers", "POST", queryParams)
      .then((data) => {
        console.log("Data FEtched ", data);
        this.setState({
          users: data.users,
        });
      })
      .catch((err) => {
        console.log("Error In Fetching Users ", err);
      });
  };
  getUsersCount = () => {
    //Passing 1 as Argument needed to get count
    this.dataRequest("http://localhost:5000/getUsers/1", "GET").then((data) => {
      this.setState(
        {
          totalUsers: data.cnt,
        }, //call is for first page records only
        () => this.getUsers(this.state.currentPage)
      );
    });
  };
  componentDidMount() {
    this.getUsersCount();
  }
  render() {
    let numberOfPages = 0;
    if (this.state.totalUsers % 8 === 0)
      numberOfPages = Math.floor(this.state.totalUsers / 8);
    else numberOfPages = Math.floor(this.state.totalUsers / 8) + 1;
    return (
      <div
        className="container"
        style={{ marginLeft: "10%", width: "70%", marginTop: "3%" }}
      >
        <div>
          {this.state.users.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((data) => {
                  return (
                    <tr>
                      <th scope="row">{data.id}</th>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>{data.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            "No Data"
          )}
        </div>
        {this.state.totalUsers > 8 && (
          <PaginationPage
            pages={numberOfPages}
            nextPage={this.nextpage}
            currentPage={this.state.currentPage}
            tenChange={this.tenChange}
          ></PaginationPage>
        )}
      </div>
    );
  }
}

export default App;
