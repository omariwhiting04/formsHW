import React from 'react';

class BasicForm extends React.Component {
  static displayName = "basic-input";
  state = {
    names: [],
    email: '',
    phone: '',
    nameError: '',
    emailError: '',
    phoneError: ''
  };

  // Real-time validation for Name
  validateName = () => {
    const nameError = this.refs.name.value ? '' : 'Name is required';
    this.setState({ nameError });
  };

  // Real-time validation for Email
  validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailError = !this.refs.email.value || !emailPattern.test(this.refs.email.value)
      ? 'Please enter a valid email'
      : '';
    this.setState({ emailError });
  };

  // Real-time validation for Phone Number
  validatePhone = () => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    const phoneError = !this.refs.phone.value || !phonePattern.test(this.refs.phone.value)
      ? 'Phone number must be in the format xxx-xxx-xxxx'
      : '';
    this.setState({ phoneError });
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();

    // Only submit if there are no errors
    if (!this.state.nameError && !this.state.emailError && !this.state.phoneError) {
      const name = this.refs.name.value;
      const email = this.refs.email.value;
      const phone = this.refs.phone.value;
      const names = [...this.state.names, { name, email, phone }];
      this.setState({ names, email: '', phone: '', nameError: '', emailError: '', phoneError: '' });
      this.refs.name.value = '';
      this.refs.email.value = '';
      this.refs.phone.value = '';
    }
  };

  // Remove an entry from the list
  removeEntry = (index) => {
    const names = this.state.names.filter((_, i) => i !== index);
    this.setState({ names });
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='Name'
            ref='name'
            onChange={this.validateName} // Trigger real-time validation
          />
          {this.state.nameError && <span style={{ color: 'red' }}>{this.state.nameError}</span>}

          <input
            type='email'
            placeholder='Email'
            ref='email'
            onChange={this.validateEmail} // Trigger real-time validation
          />
          {this.state.emailError && <span style={{ color: 'red' }}>{this.state.emailError}</span>}

          <input
            type='tel'
            placeholder='Phone Number (xxx-xxx-xxxx)'
            ref='phone'
            onChange={this.validatePhone} // Trigger real-time validation
          />
          {this.state.phoneError && <span style={{ color: 'red' }}>{this.state.phoneError}</span>}

          <input type='submit' value='Submit' />
        </form>

        <div>
          <h3>Names and Contact Information</h3>
          <ul>
            {this.state.names.map((entry, i) => (
              <li key={i}>
                {entry.name} - {entry.email} - {entry.phone}
                <button onClick={() => this.removeEntry(i)} style={{ marginLeft: '10px', color: 'red' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};

export default BasicForm;
