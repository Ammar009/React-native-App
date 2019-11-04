import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
 
export default class MyDatePicker extends Component {

    state = {
        date:"2016-05-15"
    }

  constructor(props){
    super(props)
  }

  onDateSelect = date => {
      this.setState({date: date})
      const {onDateSelect} = this.props
      onDateSelect(date)
  }
 
  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        androidMode="default"
        mode="date"
        placeholder="YYYY-MM-DD"
        format="YYYY-MM-DD"
        minDate="2019-05-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.onDateSelect({date: date})}}
      />
    )
  }
}