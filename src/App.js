import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Table, Card, Button, Input, Divider, Modal } from 'antd';
import { actions as driverActions } from './actions/driverAction';
import { selectors as driverSelector } from './reducers/driverReducer';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      isEdit: false,
      isDeletePopup: false,
      name: '',
      address: '',
      driverSelected: {},
    }
  }

  renderRow = ( item ) => {
    return (
      <div>
       <div>{ item.name }</div>
       <div>{ item.address }</div>
     </div>
    );
  }

  onClickAddDriver = () => {
    this.setState({
      isAdding: true
    });
  }

  onClickEditDriver = ( record ) => {
    this.setState(
      {
      isEdit : true,
      driverSelected: record,
    });
  }

  onClickDeleteDriver = ( record ) => {
    this.setState({
      isDeletePopup : true,
      driverSelected: record
    });
  }

  generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  addDriver = () => {
    const { name , address } = this.state;
    const id = this.generateId();
    const newDriver = {
      driverId : id,
      name,
      address
    }

    this.setState({
      isAdding : false
    })
   
    this.props.addDriver(newDriver);

  }

  getDriverName = ( e ) => {
    this.setState({ name: e.target.value })
  }


  getDriverAddress = ( e ) => {
    this.setState({ address: e.target.value })
  }

  renderAddDriverForm = () => {
    const { isAdding } = this.state;
    if( isAdding ){
      return (
        <div style={{ paddingTop : 5 }}>
        <div style={{ paddingTop : 5}}>
        <Input 
        placeholder="Driver name"
        type="text" 
        defaultValue={''} 
        onChange={this.getDriverName}
         />
        </div>
        <div style={{ paddingTop : 5 }}>
        <Input 
        placeholder="Address"
        type="text" 
        defaultValue={''} 
        onChange={this.getDriverAddress}
         />
        </div>
        <div style={{ paddingTop : 5 }}>
         <Button onClick={this.addDriver}>Add</Button>
         </div>
        </div>
      );
    }
    return null;
  }

  handleOk = () => {
    const { driverSelected, name, address } = this.state;
    const { driverList } = this.props;
    const driverUpdateIndex = driverList.findIndex((driver => driver.driverId === driverSelected.key));
    const newName = name ? name : driverSelected.name;
    const newAddress = address ? address : driverSelected.address;
    this.props.editDriver( { driverUpdateIndex, newName, newAddress} );

    this.setState({
      isEdit: false
    });
  }

  getColumn = () => {
    return [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'action',
        key: 'action',
        render: (record ) => (
          <span>
            <Button icon='edit' onClick={() => this.onClickEditDriver(record)} />
            <Divider type="vertical" />
            <Button icon ='delete' onClick={() => this.onClickDeleteDriver(record)}  />
          </span>
        ),
      }
    ]
  }

  getDataSource = () => {
    const { driverList } = this.props;
    const datasoure = driverList && driverList.map((driver) => {
      return {
        key : driver.driverId,
        name: driver.name,
        address: driver.address
      }
    });
    return datasoure
  }

  handleCancel = () => {
    this.setState({
      isEdit : false,
      driverSelected : {}
    });
  }

  handleCancelDeleteDriver = () => {
    this.setState({
      isDeletePopup : false
    });
  }

  handleOkDeleteDriver = () => {
    const { driverSelected } = this.state;
    this.props.removeDriver(driverSelected.key);
    this.setState({
      isDeletePopup : false
    });
  }


 render() {
   const columns = this.getColumn();
   const data = this.getDataSource();
   const { driverSelected, isDeletePopup, isEdit } = this.state;
   const name = driverSelected.name;
   const address = driverSelected.address;
  return (
    <div style={{ background: '#ECECEC', padding: '100px' }}>
    <Card title="Drivers List" bordered={false} style={{ margin: 'auto' }}>
    <div style={{ paddingBottom : 5, paddingTop: 5 }}>
    <Button icon='plus' onClick={this.onClickAddDriver} />
    </div>
      {this.renderAddDriverForm()}
      <Table columns={columns} dataSource={data} />
    </Card>
    <Modal
      title="Edit Driver"
      visible={isEdit}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
    <div style={{ paddingTop : 5 }}>
      <Input 
        key={`driverName:${name}`}
        type="text" 
        defaultValue={name} 
        onChange={this.getDriverName}
        />
    </div>
    <div style={{ paddingTop : 5 }}>
      <Input
      key={`driverAddress:${address}`}
      type="text" 
      defaultValue={address} 
      onChange={this.getDriverAddress}
        />
    </div>
    </Modal>
    <Modal
      title="Delete Driver"
      visible={isDeletePopup}
      onOk={this.handleOkDeleteDriver}
      onCancel={this.handleCancelDeleteDriver}
    >
    <div>Do you want to delete this driver?</div>
    </Modal>
    </div>
  );
 }
}

const mapDispatchToProps = dispatch => ({
  addDriver: (driver) => dispatch(driverActions.addDriver(driver)),
  editDriver: (payload) => dispatch(driverActions.editDriver(payload)),
  removeDriver : (id) => dispatch(driverActions.removeDriver(id))
 })

const mapStateToProps = state => ({
  driverList: driverSelector.getDriverList(state),
 })

 export default connect(mapStateToProps, mapDispatchToProps)(App);