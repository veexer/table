import React, {Component} from "react";

export default class ListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      full: true,
      nameClick: false,
      emailClick: false
    };
    this.onSort = this.onSort.bind(this)
    this.onSortEmail = this.onSortEmail.bind(this)
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users/').then((Response) => Response.json()).then((response) => this.setState({data: response}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.arrCallback !== this.props.arrCallback) {
      const newUser = nextProps.arrCallback;
      const isDuplicated = this.state.data.findIndex(object => object.email === newUser.email) > -1;
      if (isDuplicated) {
        this.setState({duplikat: isDuplicated});
        this.props.dupliCallback(isDuplicated);
      } else {
        const data = [
          ...this.state.data,
          newUser
        ];
        this.setState({
          data,
          empty: false,
          full: (data.length >= 10)
        });
        this.props.dupliCallback(isDuplicated);
        this.props.clickCallback(data.length >= 10);
      }
    }
  }

  deleteRow(dynamicData) {
    let index = this.state.data.indexOf(dynamicData);
    this.state.data.splice(index, 1);
    this.setState({data: this.state.data, full: false});
    this.props.clickCallback(false);
    if (this.state.data[0] === undefined)
      this.setState({empty: true});
    }

  onSort(event, sortKey) {
    const nameClick = this.state.nameClick
    const data = this.state.data
    if (nameClick !== true) {
      data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
      this.setState({data, nameClick: true})
    } else {
      data.reverse()
      this.setState({data, nameClick: false});
    }
  }
  onSortEmail(event, sortKey) {
    const emailClick = this.state.emailClick
    const data = this.state.data
    if (emailClick !== true) {
      data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
      this.setState({data, emailClick: true})
    } else {
      data.reverse()
      this.setState({data, emailClick: false});
    }
  }

  render() {
    const array = [...this.state.data]
    const placeholder = this.state.empty;
    return (<div>
      {
        placeholder
          ? (<div class="placediv"><img className="place" alt="serduszko" src={require('./placeholdur.png')}/>
          </div>)
          : (<table className="tat">
            <tbody >
              <tr className="upper">
                <th className="countind">LP</th>
                <th className="us" onClick={e => this.onSort(e, 'name')}>USER</th>
                <th className="us" onClick={e => this.onSortEmail(e, 'email')}>E-MAIL</th>
                <th></th>
              </tr>
              {
                array.map((item, index) => <tr className="columns" key={index}>
                  <td key="numer" className="count" id={index + 1}>{index + 1}</td>
                  <td key="name">{item.name}</td>
                  <td key="email">{item.email}</td>
                  <td className="xbutton" key={index} value={item.id} onClick={this.deleteRow.bind(this, item)}>&#10006;</td>
                </tr>)
              }
            </tbody>
          </table>)
      }
    </div>)
  }
}
