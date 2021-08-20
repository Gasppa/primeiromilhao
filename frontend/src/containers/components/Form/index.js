import React, { Component } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import './index.css'

const GreenRadio = withStyles({
  root: {
    color: '#48CCCC',
    '&$checked': {
      color: '#48CCCC'
    }
  },
  checked: {}
})((props) => <Radio color="default" {...props} />)

const CustomTextField = withStyles({
  root: {
    marginBottom: 35,
    fontFamily: 'MulishRegular',
    '& label.Mui-focused:not(.Mui-error)': {
      color: '#24B3B3'
    },
    '& .MuiInput-underline:hover:not(.Mui-error):before, .MuiInput-underline:hover:not(.Mui-error):after': {
      borderBottomColor: '#24B3B3'
    },
    '& MuiInput-underline.Mui-focused:after': {
      borderBottom: '2px solid #24B3B3'
    }
  }
})(TextField)

const initialState = {
  name: '',
  email: '',
  gender: 'feminino',
  dateOfBirth: new Date().toISOString().split('T')[0],
  initialValue: 1,
  yearsToAccomplish: 1,
  IsFormValid: true
}

export default class Form extends Component {
  constructor (props) {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleChange (e) {
    this.setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  handleDateChange (e) {
    const today = new Date().toISOString().split('T')[0]
    if (e.target.value <= today) {
      this.setState((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        }
      })
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          [e.target.name]: today
        }
      })
    }
  }

  render () {
    return (
      <>
        <div className="form_container">
          <form className="form-parmais">
            <div className="form_card">
              <div className="form_header">
                <h1 className="ff-mulish_black">Como atingir R$ 1 milhão</h1>
              </div>
              <CustomTextField
                className="input-parmais" type="text"name="name" label="Nome"
                onChange={this.handleChange}
                value={this.state.name}
                error={this.state.name === '' && !this.state.IsFormValid}
              />
              <div className="mandatory-field_container">
                <span
                  className='ff-mulish_regular mandatory-field_text'
                  hidden={this.state.name !== '' || this.state.IsFormValid}>* Obrigatório</span>
              </div>
              <CustomTextField
                className="input-parmais" type="email" name="email" label="E-mail"
                onChange={this.handleChange}
                value={this.state.email}
                error={this.state.email === '' && !this.state.IsFormValid}
              />
              <div className="mandatory-field_container">
                <span
                  className='ff-mulish_regular mandatory-field_text'
                  hidden={this.state.email !== '' || this.state.IsFormValid}>* Obrigatório</span>
              </div>
              <div className="radio_container">
                <span className="ff-mulish_regular medium-gray">Gênero</span>
                <RadioGroup
                  className="radio_group" row={true} aria-label="gender" name="gender"
                  onChange={this.handleChange}
                  value={this.state.gender}
                >
                  <FormControlLabel className="radio-button_feminino" value="feminino" control={<GreenRadio />} label="Feminino" />
                  <FormControlLabel value="masculino" control={<GreenRadio />} label="Masculino" />
                </RadioGroup>
              </div>
              <CustomTextField
                className="input-parmais" name="dateOfBirth" label="Data de nascimento"
                type="date"
                value={this.state.dateOfBirth}
                onChange={this.handleDateChange}
                error={this.state.dateOfBirth === '' && !this.state.IsFormValid}
              />
              <div className="mandatory-field_container">
                <span
                  className='ff-mulish_regular mandatory-field_text'
                  hidden={this.state.dateOfBirth !== '' || this.state.IsFormValid}>* Obrigatório</span>
              </div>
              <CustomTextField
                className="input-parmais" type="number" name="initialValue" label="Quanto você tem para investir hoje?"
                onChange={this.handleChange}
                error={this.state.initialValue < 0 && !this.state.IsFormValid}
              />
              <div className="mandatory-field_container">
                <span
                  className='ff-mulish_regular mandatory-field_text'
                  hidden={this.state.initialValue > 0 || this.state.IsFormValid}>* O valor deve ser maior ou igual a 0</span>
              </div>
              <CustomTextField
                className="input-parmais" type="number" name="yearsToAccomplish" label="Daqui quantos anos você quer atingir?"
                onChange={this.handleChange}
                error={this.state.yearsToAccomplish <= 0 && !this.state.IsFormValid}
              />
              <div className="mandatory-field_container">
                <span
                  className='ff-mulish_regular mandatory-field_text'
                  hidden={this.state.yearsToAccomplish >= 0 || this.state.IsFormValid}>* O valor deve ser maior que 0</span>
              </div>
              <span className="ff-mulish_regular medium-gray form_disclaimer">Nesta simulação aplicamos uma taxa de juros real de 4,0% ao ano e uma inflação de 4,8% ao ano.</span>

            </div>
            <button className="button-parmais button-parmais_md ff-mulish_bold" type="submit">Cadastrar</button>
          </form>
        </div>
      </>
    )
  }
}
