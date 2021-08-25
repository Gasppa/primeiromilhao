/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { differenceInYears, parse } from 'date-fns'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import * as yup from 'yup'
import Modal from '../Modal'
import { getFirstMillionProjection, getProjections } from '../../../core/api'
import loading from '../../../assets/images/loading.gif'

import './index.css'

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('* Obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('* Obrigatório'),
  dateOfBirth: yup
    .string()
    .required(),
  initialValue: yup
    .string()
    .required('* Obrigatório'),
  yearsToAccomplish: yup
    .number()
    .min(1, 'O valor deve ser maior que 0.')
    .required('* Obrigatório')
})

const defaultMaskOptions = {
  prefix: 'R$ ',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 6, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: true
}

const currencyMask = createNumberMask(defaultMaskOptions)

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={currencyMask}
    />
  )
}

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
  age: 0,
  IsModalOpen: false,
  IsLoading: false,
  parmaisPMT: 0,
  regularPMT: 0
}

const initialFormValues = {
  name: '',
  email: '',
  gender: 'feminino',
  dateOfBirth: new Date().toISOString().split('T')[0],
  initialValue: '',
  yearsToAccomplish: ''
}

const initialProjections = {
  IPCA: 0,
  ratesByRisk: {
    moderatelyAggressive: 0
  }
}

function Form () {
  const [state, setState] = useState(initialState)
  const [IsLoading, setIsLoading] = useState(false)
  const [projections, setProjections] = useState(initialProjections)

  useEffect(() => {
    getProjections()
      .then((projections) => {
        setProjections(projections)
      })
  }, [])

  const closeModal = () => {
    setState((prevState) => {
      return {
        ...prevState,
        IsModalOpen: false
      }
    })
  }

  const formik = useFormik({
    initialValues: { ...initialFormValues },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const IsFormValid = formik.isValid

      if (IsFormValid) {
        setIsLoading(true)

        const { initialValue, yearsToAccomplish, dateOfBirth } = values
        const parsedDate = parse(dateOfBirth, 'yyyy-MM-dd', new Date())
        const age = differenceInYears(new Date(), parsedDate)
        const body = {
          initialValue: parseFloat(initialValue.replace(/[^0-9.-]+/g, '')),
          yearsToAccomplish
        }
        const result = await getFirstMillionProjection({ body })

        setTimeout(() => {
          setIsLoading(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setState((prevState) => {
            return {
              ...prevState,
              age,
              parmaisPMT: result.parmaisPMT,
              regularPMT: result.regularPMT,
              IsLoading: false,
              IsModalOpen: true
            }
          })
        }, 3000)
      }
    }
  })

  return (
    <>
      <div className="form_container">
        <form className="form-parmais" onSubmit={formik.handleSubmit}>
          <div className="form_card">
            <div className="form_header">
              <h1 className="ff-mulish_black">Como atingir R$ 1 milhão</h1>
            </div>
            <CustomTextField
              className="input-parmais" type="text"name="name" label="Nome"
              id='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
            />
            <div className="mandatory-field_container">
              <span
                className='ff-mulish_regular mandatory-field_text'
                hidden={!formik.errors.name}>* Obrigatório</span>
            </div>
            <CustomTextField
              className="input-parmais" type="email" name="email" label="E-mail"
              id='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
            />
            <div className="mandatory-field_container">
              <span
                className='ff-mulish_regular mandatory-field_text'
                hidden={!formik.errors.email}>{formik.errors.email}</span>
            </div>
            <div className="radio_container">
              <span className="ff-mulish_regular medium-gray">Gênero</span>
              <RadioGroup
                className="radio_group" row={true} aria-label="gender" name="gender"
                id='gender'
                onChange={formik.handleChange}
                value={formik.values.gender}
              >
                <FormControlLabel className="radio-button_feminino" value="feminino" control={<GreenRadio />} label="Feminino" />
                <FormControlLabel value="masculino" control={<GreenRadio />} label="Masculino" />
              </RadioGroup>
            </div>
            <CustomTextField
              className="input-parmais input-parmais_datebirth" name="dateOfBirth" label="Data de nascimento"
              type="date"
              id='dateOfBirth'
              onChange={formik.handleChange}
              onKeyDown={(e) => (e.key === 'Delete' || e.key === 'Backspace') && e.preventDefault()}
              value={formik.values.dateOfBirth}
            />
            <CustomTextField
              className="input-parmais"
              id='initialValue'
              name='initialValue'
              label='Quanto você tem para investir hoje?'
              onChange={formik.handleChange}
              value={(formik.values.initialValue)}
              error={formik.touched.initialValue && formik.errors.initialValue}
              InputProps={{
                inputComponent: TextMaskCustom
              }}
            />
            <div className="mandatory-field_container">
              <span
                className='ff-mulish_regular mandatory-field_text'
                hidden={!formik.errors.initialValue}>{formik.errors.initialValue}</span>
            </div>
            <CustomTextField
              className="input-parmais"
              type="number"
              name="yearsToAccomplish"
              label="Daqui quantos anos você quer atingir?"
              id='yearsToAccomplish'
              onChange={formik.handleChange}
              value={formik.values.yearsToAccomplish}
              error={formik.touched.yearsToAccomplish && formik.errors.yearsToAccomplish}
            />
            <div className="mandatory-field_container">
              <span
                className='ff-mulish_regular mandatory-field_text'
                hidden={!formik.errors.yearsToAccomplish}>{formik.errors.yearsToAccomplish}</span>
            </div>
            <span className="ff-mulish_regular medium-gray form_disclaimer">Nesta simulação aplicamos uma taxa de juros real de {(projections.ratesByRisk.moderatelyAggressive * 100).toFixed(1)}% ao ano e uma inflação de {(projections.IPCA * 100).toFixed(2)}% ao ano.</span>

          </div>
          <button className="button-parmais button-parmais_md button-parmais_calc ff-mulish_bold" type="submit">
            {IsLoading ? <img className="loading" src={loading}/> : 'Calcular'}
          </button>
        </form>
      </div>
      <Modal
        IsOpen={state.IsModalOpen}
        closeModal={closeModal}
        parmaisPMT={state.parmaisPMT}
        regularPMT={state.regularPMT}
        age={state.age}
        yearsToAccomplish={formik.values.yearsToAccomplish}
      />
    </>
  )
}

export default Form
