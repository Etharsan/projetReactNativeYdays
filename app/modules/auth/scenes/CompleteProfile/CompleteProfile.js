import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { createUser } = auth;

import Form from "../../components/Form"

let RandomNumber = Math.floor(Math.random() * 7) + 1 ;
let selectColor = () => {
  switch (RandomNumber) {
    case 1: return "#e74c3c";
    case 2: return "#3498db";
    case 3: return "#2ecc71";
    case 4: return "#f1c40f";
    case 5: return "#1abc9c";
    case 6: return "#9b59b6";
    case 7: return "#34495e";
    default: return "#34495e";
  }
};

const fields = [
  {
    key: 'username',
    label: "Username",
    placeholder: "Username",
    autoFocus: false,
    secureTextEntry: false,
    value: "",
    type: "text"
  },
  {
    key: 'color',
    label: "Color",
    placeholder: "your favorite color",
    autoFocus: false,
    secureTextEntry: false,
    value: selectColor(),
    type: "text"
  }
];

const error = {
  general: "",
  username: "",
  color: ""
}

class CompleteProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      error: error
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSubmit(data) {
    this.setState({error: error}); //clear out error messages

    //attach user id
    const { user } = this.props;
    data['uid'] = user.uid;

    this.props.createUser(data, this.onSuccess, this.onError)
  }

  onSuccess() {
    Actions.Main()
  }

  onError(error) {
    let errObj = this.state.error;

    if (error.hasOwnProperty("message")) {
      errObj['general'] = error.message;
    } else {
      let keys = Object.keys(error);
      keys.map((key, index) => {
        errObj[key] = error[key];
      })
    }

    this.setState({error: errObj});
  }

  render() {
    return (
        <Form fields={fields}
              showLabel={false}
              onSubmit={this.onSubmit}
              buttonTitle={"CONTINUE"}
              error={this.state.error}/>
    );
  }
}

export default connect(null, { createUser })(CompleteProfile);